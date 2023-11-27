import { DiaSemana } from "../enums/DiaSemana.enum";
import { ICollection } from "./i-collection";

export class HorarioAtencion implements ICollection {
    constructor(public id: string,
        public id_especialista: string,
        public dia: DiaSemana,
        public horaInicio: number,
        public horaFin: number,
        public duracionTurno: number) { }

    public getHoraInicio(): string {
        return this.formatLabel(this.horaInicio);        
    }

    public getHoraFin(): string {
        return this.formatLabel(this.horaInicio);        
    }    

    private formatLabel(value: number): string {
    
        let horaStr = ''
        let minutosStr = ''
    
        let hora = Math.floor(value / 60);
        let minutos = value % 60;
      
        horaStr =  hora < 10 ? '0' + hora : hora.toString();
        
        minutosStr = minutos < 10? '0' + minutos : minutos.toString();   
    
        let retorno: string = horaStr + ":" + minutosStr;
    
        return `${retorno}`;
      }
}




