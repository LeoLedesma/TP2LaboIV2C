import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatHorarioAtencion'
})
export class FormatHorarioAtencionPipe implements PipeTransform {

  transform(value: number):string {
    
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
