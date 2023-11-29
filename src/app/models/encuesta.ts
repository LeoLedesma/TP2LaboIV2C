import { ICollection } from "./i-collection";

export class Encuesta implements ICollection{
    constructor(public id: string,
        public id_turno:string,
        public calificacion: number,
        public satisfaccion: string,
        public problemaResuelto: boolean,
        public recomendacion: boolean,
        public comentario: string = ''){}

}