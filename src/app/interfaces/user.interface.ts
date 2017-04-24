export interface IUser{
    _id: string,
    firstName: string,
    secondName: string,
    email: string,
    role: string,
    created: number,
    avatar: string,
    active: boolean,
    password?: string,
    passwordRepeat?: string,
    projects: any,
    users: any,
    newUser?: boolean
}

export class User  implements IUser{
    public _id:string;
    public firstName: string;
    public secondName: string;
    public email: string;
    public role: string;
    public created:number;
    public avatar: string;
    public active: boolean;
    public password: string;
    public passwordRepeat: string;
    public projects: any;
    public users: any;
    public newUser: boolean;

    constructor(
        id:string = null,
        firstName:string='',
        secondName:string='',
        email:string='',
        role:string='',
        created:number=Date.now(),
        avatar:string='',
        active:boolean = true,
        password:string = '',
        passwordRepeat:string = '',
        projects:any = [],
        users:any = [],
        newUser:boolean = false
    ){
        this._id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.role = role;
        this.created = created;
        this.avatar = avatar;
        this.active = active;
        this.password = password;
        this.passwordRepeat = passwordRepeat;
        this.projects = projects;
        this.users = users;
        this.newUser = newUser;
    }

}