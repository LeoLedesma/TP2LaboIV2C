import { Pipe, PipeTransform } from '@angular/core';
import { DiaSemana } from '../enums/DiaSemana.enum';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: Date, full: boolean = true): string {

    if (!full) {
      let horaStr = value.getHours() < 10 ? '0' + value.getHours() : value.getHours().toString();
      let minutosStr = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes().toString();

      return horaStr + ":" + minutosStr;
    } else {
      let dia = value.getDate();
      let mes = value.getMonth() + 1;
      let ano = value.getFullYear();
      let diaSemana = this.arrayDiaSemana[value.getDay()]

      let diaStr = dia < 10 ? '0' + dia : dia.toString();
      let mesStr = mes < 10 ? '0' + mes : mes.toString();
      let anoStr = ano.toString();

      return diaSemana + ' ' + diaStr + "/" + mesStr + "/" + anoStr;
    }

  }

  arrayDiaSemana = Object.values(DiaSemana)

}
