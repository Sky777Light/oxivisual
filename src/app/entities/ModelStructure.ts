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

