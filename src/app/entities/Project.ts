import {IMain} from "../interfaces/IMain";
import {IModelStructure} from "./ModelStructure";
import {Main} from "./Main";

export class ProjectModel extends Main{
    public id_model_structure:string;
    public data:Array<IModelStructure>;
    public link:string;
    public name:string;
    constructor(entity:any = null){
        super(entity);
    }
    stringFy(){
        let res = [];
    }
}
export interface IProject extends IMain{
    title: string;
    link?: string;
    image?: string;
    owner?: string;
    published?: boolean;
    newProject?: boolean;
    model?: ProjectModel;
}
export class Project  extends Main implements IProject{
    public title: string;
    public link: string;
    public image: string;
    public owner: string;
    public published: boolean;
    public newProject: boolean;
    public model: ProjectModel;

    constructor(entity:any = null){
        super(entity);
    }

}