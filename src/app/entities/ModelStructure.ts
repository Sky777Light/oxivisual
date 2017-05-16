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
        let noClone = ['app', '_app', 'cash', 'canEdit'],
            acceptType = ['boolean', 'string', 'number']
        //,clone:any = new this.constructor(this)
            ;
        //for(let field in this){
        //    if(this.hasOwnProperty(field) && acceptType.indexOf(typeof this[field])>-1 )clone[field]=this[field];
        //}
        //delete clone['app'];
        //delete clone['_app'];
        //delete clone['cash'];
        //clone.areas=[];

        /*function cloneS(obj) {
         if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
         return obj;

         if (obj instanceof Date)
         var temp = new obj.constructor(); //or new Date(obj);
         else
         var temp = obj.constructor();

         for (var key in obj) {
         if (Object.prototype.hasOwnProperty.call(obj, key)) {
         obj['isActiveClone'] = null;
         temp[key] = cloneS(obj[key]);
         delete obj['isActiveClone'];
         }
         }

         return temp;
         }*/
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
        let _self = this;

        function cloneObject(obj) {
            var temp = obj instanceof Array ? [] : _self || entity;

            for (var i in obj) {
                if (typeof(obj[i]) == "object" && obj[i] != null)
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
export class OxiCamera extends ProjMain {
    position:Vector3;
    target:Vector3;
    rotation:Vector3;
    resolution:Vector3;
    fov:number;
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

    camera:OxiCamera;
    currentItem:number;
    currentItem0:number;
    projFilesDirname:string;
    images:Array<any>;
    areas:Array<IModelStructure>;
    cash:PCash;

    constructor(entity:any = {}) {
        super(entity);
        this.cash = new PCash();
        if (!this.images)this.images = [];
        if (!this.camera)this.camera = new OxiCamera();
        if (!this.currentItem)this.currentItem = 0;
        this.currentItem = +this.currentItem;
        this.currentItem0 = this.currentItem;
    }
}

