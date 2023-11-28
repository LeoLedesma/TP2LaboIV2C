import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-seleccionar-pacientes',
  templateUrl: './seleccionar-pacientes.component.html',
  styleUrls: ['./seleccionar-pacientes.component.scss']
})
export class SeleccionarPacientesComponent implements OnInit,OnChanges,OnDestroy{

  @Output() onPacienteSeleccionado:EventEmitter<Usuario> = new EventEmitter<Usuario>()
  @Input() horarioSeleccionado!:Date

  pacientesArr:Usuario[] = []
  pacientesShow:Usuario[] = []
  pacienteSeleccionado:Usuario | undefined
  turnosSub!:Subscription

  constructor(private usuariosService:UsuariosService,private turnosService:TurnosService){
  }
  ngOnDestroy(): void {
    this.turnosSub?.unsubscribe();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['horarioSeleccionado']?.currentValue !== changes['horarioSeleccionado']?.previousValue){
      this.buscar('')
    }    
  }

  async ngOnInit() {

    this.pacientesArr = await this.usuariosService.getPacientes()
    
    this.turnosSub = this.turnosService.obtenerTurnosByDate(this.horarioSeleccionado).subscribe(async turnos =>{
      this.pacientesArr = await this.usuariosService.getPacientes()
      this.pacientesArr = this.pacientesArr.filter(paciente => !turnos.some(turno => turno.id_paciente === paciente.id_user))
      this.pacienteSeleccionado = undefined;
      this.buscar('')      
      this.turnosSub.unsubscribe();      
    })
        
  }

  buscar(input:string){
    this.pacientesShow = this.pacientesArr.filter(paciente =>{
      return (paciente.apellido.toLowerCase() + ' ' +
      paciente.nombre.toLowerCase()).includes(input.toLowerCase())
    || (paciente.nombre.toLowerCase() + ' ' +
    paciente.apellido.toLowerCase()).includes(input.toLowerCase())    
    })
  }

  selectPaciente(paciente:Usuario){
    this.pacienteSeleccionado = paciente;
    this.onPacienteSeleccionado.emit(paciente)  
  }


}
