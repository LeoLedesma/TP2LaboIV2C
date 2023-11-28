import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DiaSemana } from 'src/app/enums/DiaSemana.enum';
import { HorarioAtencion } from 'src/app/models/horarioAtencion';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-horarios',
  templateUrl: './listado-horarios.component.html',
  styleUrls: ['./listado-horarios.component.scss']
})
export class ListadoHorariosComponent implements OnInit{
 
  actions!: {class:string,icon:string,action:string}[];
  @Input() horarios:HorarioAtencion[] = [];

  @Output() onEditHorario:EventEmitter<HorarioAtencion> = new EventEmitter();
  @Output() onDeleteHorario:EventEmitter<HorarioAtencion> = new EventEmitter();
  ngOnInit(): void {
    
  }

  arrayDiaSemana = Object.values(DiaSemana).filter(d => d !== 'Domingo');
  editar(event:any){
    console.log(event as HorarioAtencion)
    this.onEditHorario.emit(event as HorarioAtencion);
  }

  eliminar(event:any){  
    console.log(event as HorarioAtencion)  

    Swal.fire({
      title: 'Esta seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
        this.onDeleteHorario.emit(event as HorarioAtencion);
        Swal.fire(
          'Eliminado!',
          'El horario ha sido eliminado.',
          'success'
        )
      }})
    }

    listadoOrdenado(){
      if(this.horarios){
        return this.horarios.sort((a,b) => this.arrayDiaSemana.indexOf(a.dia)-this.arrayDiaSemana.indexOf(b.dia) )
      }    else{
        return []
      }  
    }
}
