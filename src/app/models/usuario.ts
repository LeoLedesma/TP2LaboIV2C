import { Timestamp } from "@angular/fire/firestore";

export interface Usuario {

    id_auth:string,
    id_user:string,
    username:string,
    email:string,
    fec_registro:Timestamp

}
