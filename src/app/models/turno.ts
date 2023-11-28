import { ICollection } from "./i-collection";

export class Turno implements ICollection {
    constructor(
        public id: string,
        public especialidad?: string | undefined,
        public id_paciente?: string | undefined,
        public id_especialista?: string | undefined,
        public fechaTurno?: Date,        
        public estado: EstadoTurno = EstadoTurno.Pendiente,
        public resenia: string = '',
        public comentario:string = '',
        public diagnostico:string = '') { }
}


export enum EstadoTurno {
    Rechazado = 'Rechazado',
    Cancelado = 'Cancelado',
    Realizado = 'Realizado',
    Libre = 'Libre',
    Pendiente = 'Pendiente',
    Aceptado = 'Aceptado'
}


export enum TipoTurno {
    Consulta,
    Tratamiento,
}
