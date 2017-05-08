import {IMain} from "../interfaces/IMain";
import {Main} from "./Main";

export interface IModelStructure extends IMain{
    destination:string;
    camera:OxiCamera;
    frames:number;
    projFilesDirname:string;
    areas:Array<IModelStructure>;
}
class OxiCamera{
    position:any;
    fov:any;
}
export class ModelStructure extends Main implements IModelStructure{

   name:string;
   destination:string;
   camera:OxiCamera;
   frames:number;
    projFilesDirname:string;
   images:Array<string>;
   areas:Array<IModelStructure>;
    app:any;

    constructor(entity:any={}){
        super(entity);
    }
}

