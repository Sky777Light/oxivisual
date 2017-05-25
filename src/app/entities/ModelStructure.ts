import {IMain} from "../interfaces/IMain";
import {Main} from "./Main";
import * as CONSTANTS from "./constant.data";

export interface IModelStructure extends IMain {
    destination:string;
    camera:OxiCamera;
    projFilesDirname:string;
    areas:Array<IModelStructure>;
}
export class ProjMain extends Main {
    constructor(entity:any = {name: 'Child'}) {
        super(entity);
        this.copyS(entity);
        this._category = CONSTANTS.Config.PROJ_DESTINATION[this.constructor.name];
    }

    clone() {
        let noClone = ['glApp','sourcesApp', 'cash', 'canEdit','_selected','hasChanges','hasRecalcChanges'],
            acceptType = ['boolean', 'string', 'number'];

        function cloneObject(obj) {
            var temp = obj instanceof Array ? [] : {};
            for (var i in obj) {
                if (noClone.indexOf(i) > -1)
                    continue;
                else if (typeof(obj[i]) == "object" && obj[i] != null)
                    temp[i] = cloneObject(obj[i]);
                else if (obj.hasOwnProperty(i) && acceptType.indexOf(typeof obj[i]) > -1)
                    temp[i] = obj[i];
            }
            return temp;
        }

        return cloneObject(this);

    }

    private copyS(entity:any = {}) {
        let _self = this,
            noClone = ['File'];

        function cloneObject(obj) {
            var temp = obj instanceof Array ? [] : _self || entity;

            for (var i in obj) {
                if ( typeof(obj[i]) == "object" && obj[i] != null && noClone.indexOf(obj[i].constructor.name) < 0)
                    temp[i] = (obj[i] instanceof Array ? cloneObject(obj[i]) : ( ProjMain.inject(obj[i])));
                else
                    temp[i] = obj[i];
            }
            return temp;
        }

        return cloneObject(entity);
    }

    static inject(obj):any {
        switch (obj._category) {
            case CONSTANTS.Config.PROJ_DESTINATION.LinkGeneralStructure:
                return new LinkGeneralStructure(obj);
            case CONSTANTS.Config.PROJ_DESTINATION.ModelStructure:
                return new ModelStructure(obj);
            case CONSTANTS.Config.PROJ_DESTINATION.OxiCamera:
                return new OxiCamera(obj);
            case CONSTANTS.Config.PROJ_DESTINATION.Vector3:
                return new Vector3(obj);
            default:
                return new GeneralStructure(obj);
        }
    }
}
export class ProjFile extends ProjMain {

    data:string;
    file:File;
    name:string;

    constructor(entity:any) {
        super(entity);
    }
}
export class OxiCamera extends ProjMain {
    position:Vector3;
    target:Vector3;
    rotation:Vector3;
    resolution:Vector3;
    frameState:any;
    fov:number;
    kompass:Kompass;
    opacity:number;
    scale:number;
    zoom:number;
    lens:number;
    size:number;
    aspect:number;

    constructor(entity:any = {}) {
        super(entity);
        if (!this.fov)this.fov = 30;
        if (!this.scale)this.scale = 1;
        if (!this.resolution)this.resolution = new Vector3();
        if (!this.size)this.size = 36;
        if (!this.lens)this.lens = 19;
        if (!this.frameState)this.frameState = {};
        if (!this.opacity)this.opacity = 0.7;
        if (!this.kompass)this.kompass = new Kompass();
    }
}
export class Kompass extends ProjMain{
    enabled:boolean;
    angle:number;
    constructor(a:any={}){
        super(a);
        if(!this.angle)this.angle=0;
        if(!this.enabled !== false)this.enabled = true;
    }
}
export class Vector3 extends ProjMain {
    x:number;
    y:number;
    z:number;
    _x:number;
    _y:number;
    _z:number;

    constructor(entity:any = {}) {
        super(entity);
    }
}
export class GeneralStructure extends ProjMain {
    name:string;
    destination:string;
    app:any;
    hasChanges:boolean;
    hasRecalcChanges:boolean;

    constructor(entity:any) {
        super(entity);
    }
}
export class LinkGeneralStructure extends GeneralStructure {
    constructor(entity:any) {
        super(entity);
    }
}
export class PCash {
    model:any;
    images:Array<any> = [];
}
export class ModelStructure extends GeneralStructure implements IModelStructure {

    _selected:boolean=false;
    canEdit:boolean=false;
    camera:OxiCamera;
    glApp:any;
    sourcesApp:any;
    currentItem:number;
    currentItem0:number;
    projFilesDirname:string;
    images:Array<any>;
    alignImages:Array<any>;
    areas:Array<IModelStructure>;
    cash:PCash;
    preview:string;
    templates:Array<string>;

    constructor(entity:any = {}) {
        super(entity);
        this.cash = new PCash();
        if (!this.images)this.images = [];
        if (!this.alignImages)this.alignImages = [];
        if (!this.camera)this.camera = new OxiCamera();
        if (!this.currentItem)this.currentItem = 0;
        if (!this.templates)this.templates = [];
        this.currentItem = +this.currentItem;
        this.currentItem0 = this.currentItem;
    }
}

