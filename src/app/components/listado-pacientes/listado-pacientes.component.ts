import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
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
  ngOnInit(): void {    
    this.isLoading = true

    this.obtenerPacientes()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['filtro']?.currentValue !== changes['filtro']?.previousValue){
      this.filtrarPacientes()
    }    
  }

  constructor(private turnosService: TurnosService, private usuariosService: UsuariosService, private auth: AuthService) { }
  ngOnDestroy(): void {
    this.pacientesSub?.unsubscribe()
    this.turnosSub?.unsubscribe()
  }

  obtenerPacientes() {
    this.turnosService.obtenerTurnosRealizadosPorEspecialista(this.auth.usuarioLogueado!.id_user).subscribe(turnos => {

      let pacientes: string[] = []
      pacientes = turnos.map(turno => turno.id_paciente!)
      pacientes = [...new Set(pacientes)];

      console.log(turnos)

      this.usuariosService.getUsuarios(pacientes).then(pacientes => {
        this.isLoading = false
        console.log(pacientes);
        this.pacientesArr = pacientes.sort((a, b) => a.nombre.localeCompare(b.nombre))});
        this.filtrarPacientes();
    })
  }

  filtrarPacientes(){
    
    let filtro = this.filtro.toLowerCase() || '';
    console.log(filtro)
    console.log(filtro.length)

    if(filtro.length > 0){
      this.pacientesShow = this.pacientesArr.filter(p => p.nombre.toLowerCase().includes(filtro))
    }else{
      console.log(this.pacientesArr);
      this.pacientesShow = this.pacientesArr    
    }

    return this.pacientesShow
  
  }

}
