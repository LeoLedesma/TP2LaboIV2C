import { ICollection } from "./i-collection";

export class Especialidad implements ICollection{
    constructor(public id:string,
                public nombre:string,
                public img?:string){                    
                }
}