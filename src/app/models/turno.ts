import { ICollection } from "./i-collection";

export class Turno implements ICollection {
    constructor(
        public id: string,
        public especialidad?: string | undefined,
        public id_paciente?: string | undefined,
        public id_especialista?: string | undefined,
        public estado: EstadoTurno = EstadoTurno.Pendiente,
        public fechaTurno?: Date,        
        public reseña?: string) { }
}


export enum EstadoTurno {
    Rechazado,
    Cancelado,
    Realizado,
    Libre,
    Pendiente,
    Aceptado
}


export enum TipoTurno {
    Consulta,
    Tratamiento,
}
