import { Timestamp } from "@angular/fire/firestore";

export class Usuario {

    constructor(public id_auth:string,
        public id_user:string,
        public email:string,    
        public nombre:string,
        public apellido:string,
        public documento:string,
        public edad: number,    
        public fotos:string[],    
        public tipo:string,
        public obraSocial: string = '',        
        public especialidades:string[] = [],
        public fec_registro:Timestamp = Timestamp.now()){                    
    }
    
}
