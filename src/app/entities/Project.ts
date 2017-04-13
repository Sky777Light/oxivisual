import {IMain} from "../interfaces/IMain";

export interface IProject extends IMain{
    title: string;
    link?: string;
    image?: string;
    owner?: string;
    published?: boolean;
    newProject?: boolean;
}

export class Project  implements IProject{
    public _id:string;
    public created:string;
    public title: string;
    public link: string;
    public image: string;
    public owner: string;
    public published: boolean;
    public newProject: boolean;

    constructor(title:string='',id:string = null,link:string = null,owner:any = null,published:boolean = false,newProject:boolean=false,_created:any=Date.now(), image:string = ''){
        this.title = title;
        this.image = image;
        this._id = id;
        this.link = link;
        this.owner = owner;
        this.published = published;
        this.newProject = newProject;
    }

}