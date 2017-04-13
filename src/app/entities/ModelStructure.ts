import {IMain} from "../interfaces/IMain";
import {Main} from "./Main";

export interface IModelStructure extends IMain{
    destination:string;
    camera_distance:number;
    camera_high_position:number;
    camera_focalLength:number;
    frames:number;
    filename:string;
    areas:Array<IModelStructure>;
}
export class ModelStructure extends Main implements IModelStructure{

   name:string;
   destination:string;
   camera_distance:number;
   camera_high_position:number;
   camera_focalLength:number;
   frames:number;
   filename:string;
   areas:Array<IModelStructure>;

    constructor(entity:any){
        super(entity);
    }
}

