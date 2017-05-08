export class Main{
    public _id:string;
    public created:number;

    constructor(instance:any = null){
        this.adapt(instance);
        if(!this.created)this.created= Date.now();
    }
    toString(){
        //let result='';
        //for(let f in this){
        //   if(typeof this[f]) result +=f+":"+this[f]+",";
        //}
        return /*result.substr(0,result.length-1);//*/JSON.stringify(this);
    }
    adapt(entity:any={}){
        for(let field in entity){
             this[field]= entity[field];
        }
        return this;
    }
}