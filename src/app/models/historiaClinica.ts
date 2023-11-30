import { ICollection } from "./i-collection";

export class HistoriaClinica implements ICollection{
    constructor(public id: string,
        public id_paciente: string,
        public registros: RegistroHistoria[] = []
        ){}
}

export interface RegistroHistoria{
    fecha:Date,
    id_especialista: string,
    especialidad:string,    
    altura: number,
    peso: number
    temperatura: number
    presion: {sistolica:number,diastolica:number}
    claveValor: {clave:string,valor:string}[]
}