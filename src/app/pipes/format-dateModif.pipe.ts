import { Pipe, PipeTransform } from '@angular/core';
import { DiaSemana } from '../enums/DiaSemana.enum';

@Pipe({
  name: 'formatDateModif'
})
export class FormatDateModifPipe implements PipeTransform {

  transform(value: Date, full:boolean=true):string {
    
    if(!full){
       //formato am-pm
        let hora = value.getHours();
        let minutos = value.getMinutes();
        let ampm = hora >= 12 ? 'pm' : 'am';
        hora = hora % 12;
        hora = hora ? hora : 12;
        let minutosStr = minutos < 10 ? '0'+minutos : minutos;
        let horaStr = hora < 10 ? '0'+hora : hora;
        return horaStr + ':' + minutosStr + ' ' + ampm;

        // let horaStr = value.getHours() < 10 ? '0' + value.getHours() : value.getHours().toString();
        // let minutosStr = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes().toString();
        
        // return horaStr + ":" + minutosStr;
    }else{
        let dia = value.getDate();
        let mes = value.getMonth() + 1;
        let ano = value.getFullYear();    
        let diaSemana = this.arrayDiaSemana[value.getDay()]    
      
        let diaStr = dia < 10 ? '0' + dia : dia.toString();
        let mesStr = mes < 10 ? '0' + mes : mes.toString();
        let anoStr = ano.toString();

        return diaStr + "-" + mesStr + "-" + anoStr;
    }
      
    }

    arrayDiaSemana = Object.values(DiaSemana)

}
