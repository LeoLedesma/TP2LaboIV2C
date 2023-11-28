import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'especialidadesPipe'
})
export class EspecialidadesPipe implements PipeTransform {

  transform(value: string[]):string {
    
    if(value.length>1){
      return 'Especialidades: ' + value.join(', ');
    }
    else{
      return 'Especialidad: ' + value[0];    
    }
  }
}
