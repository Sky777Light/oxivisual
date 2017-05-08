export class Main{
    constructor(instance:any = null){
        this.adapt(instance);
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