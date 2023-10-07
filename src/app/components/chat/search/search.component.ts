import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  @Input() placeholder: string = "";
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  
  debouncer: Subject<string> = new Subject();  
  termino:string="";

  //Se dispara una unica vez cuando el componente es inicializado
  ngOnInit(): void {
   this.debouncer
   .pipe(debounceTime(300))//ms a esperar para generar el siguiente evento
      .subscribe(valor=>{
    this.onDebounce.emit(valor);
   })
  }

  buscar(){    
    this.onEnter.emit(this.termino);    
  }

  teclaPresionada(){    
    this.debouncer.next(this.termino);
  }

}
