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
class OxiCamera {
    position:any;
    fov:any;
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
        entity.category = CONSTANTS.Config.PROJ_DESTINATION.MODEL_OBJ;
        entity.cash = new PCash();
        super(entity);
    }
}

