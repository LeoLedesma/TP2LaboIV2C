import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { TipoUsuario } from 'src/app/enums/TipoUsuario.enum';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent implements OnInit, OnChanges,OnDestroy {
  
  turnosSub!: Subscription
  turnosArr: Turno[] = []
  pacientesSub!: Subscription
  pacientesArr: Usuario[] = []
  pacientesShow: Usuario[] = [] 
  isLoading:boolean = false
  
  @Input() filtro:string = ""
  @Output() onHistoriaClinica = new EventEmitter<Usuario>()
  ngOnInit(): void {    
    this.isLoading = true

    this.obtenerPacientes()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['filtro']?.currentValue !== changes['filtro']?.previousValue){
      this.filtrarPacientes()
    }    
  }

  constructor(private turnosService: TurnosService, private usuariosService: UsuariosService, public auth: AuthService) { }
  ngOnDestroy(): void {
    this.pacientesSub?.unsubscribe()
    this.turnosSub?.unsubscribe()
  }

  obtenerPacientes() {
    this.turnosService.obtenerTurnosRealizadosPorEspecialista(this.auth.usuarioLogueado!.id_user).subscribe(turnos => {

      let pacientes: string[] = []
      this.turnosArr = turnos;
      this.turnosArr.forEach(t => t.fechaTurno = new Date((t.fechaTurno as unknown as Timestamp).toMillis()))
      pacientes = turnos.map(turno => turno.id_paciente!)
      pacientes = [...new Set(pacientes)];


      this.usuariosService.getUsuarios(pacientes).then(pacientes => {
        this.isLoading = false

        this.pacientesArr = pacientes.sort((a, b) => a.nombre.localeCompare(b.nombre))});
        this.filtrarPacientes();
    })
  }

  filtrarPacientes(){
    
    let filtro = this.filtro.toLowerCase() || '';


    if(filtro.length > 0){
      this.pacientesShow = this.pacientesArr.filter(p => p.nombre.toLowerCase().includes(filtro))
    }else{
      this.pacientesShow = this.pacientesArr    
    }

    return this.pacientesShow  
  }

  public get TipoUsuario(): typeof TipoUsuario {
    return TipoUsuario;
  }

  agregarHistoriaClinica(paciente:Usuario){
    this.onHistoriaClinica.emit(paciente)
  }

  getUltimosTurnosPaciente(id_paciente:string){

    return this.turnosArr.filter(turno => turno.id_paciente === id_paciente).slice(-3)

  }

   

}
