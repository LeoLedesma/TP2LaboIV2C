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
        public diagnostico:string = '',
        public calificacion:number = -1,
        public encuestaComplete:boolean = false) { }
}


export enum EstadoTurno {
    Pendiente = 'Pendiente',
    Aceptado = 'Aceptado',
    Rechazado = 'Rechazado',
    Cancelado = 'Cancelado',
    Realizado = 'Realizado',    
}


export enum TipoTurno {
    Consulta,
    Tratamiento,
}
