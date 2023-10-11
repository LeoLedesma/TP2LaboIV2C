import { Timestamp } from "@angular/fire/firestore";

export interface Puntuacion {
    id:string,
    game: string,
    score: number,
    result: string,
    date: Timestamp,    
    username:string
}
