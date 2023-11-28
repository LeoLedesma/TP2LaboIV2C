import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-seleccionar-turno',
  templateUrl: './seleccionar-turno.component.html',
  styleUrls: ['./seleccionar-turno.component.scss']
})
export default class SeleccionarTurnoComponent implements OnInit,OnChanges {
  
  
  @Input() horariosPorDia:{fecha:Date, horarios:Date[]}[] = []

  diaSeleccionado:Date | undefined
  horarioSeleccionado:Date | undefined
  horariosPosibles:Date[] = [] 
  @Output() onTurnoSeleccionado:EventEmitter<Date> = new EventEmitter();

  ngOnInit(): void {  
  }

  ngOnChanges(changes: SimpleChanges) {
   if(changes['horariosPorDia'].currentValue !== changes['horariosPorDia'].previousValue){
    this.horariosPorDia = changes['horariosPorDia'].currentValue;
    this.horariosPorDia.forEach(horario=> horario.horarios.pop())
    this.horarioSeleccionado = undefined;
    this.diaSeleccionado = undefined;
   }    
  }


  seleccionarDia(horario:{fecha:Date, horarios:Date[]})
  {
    this.diaSeleccionado = horario.fecha;    
    this.horariosPosibles = horario.horarios

    console.log(horario)
  }

  seleccionarHorario(horario:Date){
    this.horarioSeleccionado = horario;
    this.onTurnoSeleccionado.emit(horario);
  }

}
