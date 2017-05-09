import {IMain} from "../interfaces/IMain";
import {Main} from "./Main";
import * as CONSTANTS from "./constant.data";

export interface IModelStructure extends IMain {
    destination:string;
    camera:OxiCamera;
    frames:number;
    projFilesDirname:string;
    areas:Array<IModelStructure>;
}
export class OxiCamera extends Main {
    position:Vector3;
    rotation:Vector3;
    resolution:Vector3;
    fov:number;
    scale:number;

    constructor(entity:any = {}) {
        super(entity);
    }
}
export class Vector3 extends Main {
    x:number;
    y:number;
    z:number;
    constructor(entity:any ) {
        super(entity);
    }
}

export class GeneralStructure extends Main {
    name:string;
    destination:string;
    category:number;
    app:any;

    constructor(entity:any = {name: 'Child'}) {
        super(entity);
    }
    clone(){
        let noClone =['app','_app','cash'],
            acceptType=['boolean','string','number']
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
            var temp = {};
            for(var i in obj) {
                if(noClone.indexOf(i) >-1)
                    continue;
                else if(typeof(obj[i])=="object" && obj[i] != null)
                    temp[i] = cloneObject(obj[i]);
                else if(obj.hasOwnProperty(i) && acceptType.indexOf(typeof obj[i])>-1 )
                    temp[i] = obj[i];
            }
            return temp;
        }
        return cloneObject(this);

    }
}
export class PCash{
    model:any;
    images:Array<any>=[];
}

export class ModelStructure extends GeneralStructure implements IModelStructure {

    camera:OxiCamera;
    frames:number;
    projFilesDirname:string;
    images:Array<string>;
    areas:Array<IModelStructure>;
    cash:PCash;

    constructor(entity:any = {name: 'Child'}) {
        super(entity);
        this.category = CONSTANTS.Config.PROJ_DESTINATION.MODEL_OBJ;
        this.cash = new PCash();
    }
}

