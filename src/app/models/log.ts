import { Timestamp } from "@angular/fire/firestore";

export interface Log {
    id_log:string,
    collection: string,
    fec_log:Timestamp,
    email:string,
    log_type:Log_type,
    log_result_detail:string,
}

export enum Log_type{
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    ERROR = "ERROR",
}
