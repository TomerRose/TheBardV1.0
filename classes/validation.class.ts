export class Validation{
    constraints: string[] = [];
    valid:boolean;
    constructor(obj, reqParams:string[]){  
        this.validate(obj, reqParams)
    }
    private validate(obj, reqParams:string[])  {
        
        reqParams.forEach(param => {
            if (!obj[`${param}`]){
                this.constraints.push(param)
            }
        });  
        this.valid = !(this.constraints.length > 0);        
    }    

}