import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'chatDate'
})
export class ChatDatePipe implements PipeTransform {
  transform(value: Timestamp): any {

    if (value.toDate().getDate() == (new Date).getDate() && value.toDate().getMonth() == (new Date).getMonth() && value.toDate().getFullYear() == (new Date).getFullYear()) {
      return this.getHour(value.toDate())
    } else {
      return this.getHour(value.toDate())
    }
  }

  getHour(value: Date) {

    let hora = value.getHours() < 10 ? '0' + value.getHours() : value.getHours();
    let minutos = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes();

    return hora + ':' + minutos;
  }

  getDate(value: Date) {
    return value.getDate() + '/' + (value.getMonth() + 1) + '/' + value.getFullYear();
  }
}


@Pipe({
  name: 'chatMessageList'
})
export class ChatMessageList implements PipeTransform {
  transform(value: string): any {
    if (value.length > 40) {
      return value.slice(0, 40) + '...'
    }
    else{
      return value
    
    }
  }
  }
