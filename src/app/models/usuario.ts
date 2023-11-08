import { Timestamp } from "@angular/fire/firestore";
import { EstadoUsuario } from "../enums/EstadoUsuario.enum";
import { TipoUsuario } from "../enums/TipoUsuario.enum";

export class Usuario {

    constructor(public id_auth:string,
        public id_user:string,
        public email:string,    
        public nombre:string,
        public apellido:string,
        public documento:string,
        public edad: number,    
        public fotos:string[],    
        public tipo:TipoUsuario,
        public obraSocial: string = '',        
        public especialidades:string[] = [],
        public fec_registro:Timestamp = Timestamp.now(),
        public estado:EstadoUsuario = EstadoUsuario.Inhabilitado,
        public email_confirmado:boolean = false,
        public fec_confirmacion:Timestamp = Timestamp.now(),
        ){                    
    }
    
}
