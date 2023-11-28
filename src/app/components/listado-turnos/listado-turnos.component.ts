import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TipoUsuario } from 'src/app/enums/TipoUsuario.enum';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { EstadoTurno } from '../../models/turno';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.scss']
})
export class ListadoTurnosComponent implements OnInit, OnChanges {
  constructor(private auth: AuthService, private usuariosService: UsuariosService, private turnosService: TurnosService) { }

  userLogged!: Usuario
  ngOnInit(): void {
    if (this.turnos) {
      this.getEspecialistas();
      this.getPacientes();
    }

    this.userLogged = this.auth.usuarioLogueado!
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['turnos']?.currentValue !== changes['turnos']?.previousValue) {
      this.getEspecialistas();
      this.getPacientes();
      this.filtrar(changes['filtro']?.currentValue || this.filtro)
    }

    if (changes['filtro']?.currentValue !== changes['filtro']?.previousValue) {
      this.filtrar(changes['filtro']?.currentValue || this.filtro)
    }

  }

  @Input() turnos: Turno[] = [];
  turnosShow: Turno[] = []
  @Input() filtro: string = '';

  especialistas: Usuario[] = [];
  pacientes: Usuario[] = []
  idEspecialistas: string[] = []
  idPacientes: string[] = []


  listadoOrdenado() {
    if (this.turnosShow) {
      return this.turnosShow.sort((a, b) => a.fechaTurno!.getMilliseconds() - b.fechaTurno!.getMilliseconds())

    } else {
      return []
    }

  }

  getEspecialistas() {
    if (this.auth.usuarioLogueado?.tipo == TipoUsuario.Paciente || this.auth.usuarioLogueado?.tipo == TipoUsuario.Administrador) {
      this.idEspecialistas = this.turnos.map(t => t.id_especialista!)
      // let id = this.idEspecialistas.filter(id => !this.especialistas.map(e => e.id_user).includes(id))
      if (this.idEspecialistas.length != 0) {
        this.usuariosService.getUsuarios(this.idEspecialistas).then(usuarios => this.especialistas = usuarios);
      }
    } else {
      this.especialistas.push(this.auth.usuarioLogueado!)
    }

  }

  getPacientes() {
    if (this.auth.usuarioLogueado?.tipo == TipoUsuario.Especialista || this.auth.usuarioLogueado?.tipo == TipoUsuario.Administrador) {
      this.idPacientes = this.turnos.map(t => t.id_paciente!)
      let id = this.idPacientes.filter(id => this.pacientes.map(e => e.id_user).includes(id))
      if (id.length != 0) {
        this.usuariosService.getUsuarios(id).then(usuarios => this.pacientes = usuarios);
      }
    } else {
      this.pacientes.push(this.auth.usuarioLogueado!)
    }
  }

  getEspecialista(id: string) {
    let especialista = this.especialistas.find(e => e.id_user === id)
    if (especialista) {
      return especialista.nombre + " " + especialista.apellido
    }
    return 'S/D'
  }

  getPaciente(id: string) {
    let paciente = this.pacientes.find(e => e.id_user === id)
    if (paciente) {
      return paciente.nombre + " " + paciente.apellido
    }

    return 'S/D'
  }

  getEspecialistasNombre() {
    return this.especialistas.filter(e => e.nombre + " " + e.apellido)
  }

  filtrar(filtro: string) {
    filtro = filtro.toLowerCase()
    if(this.auth.usuarioLogueado?.tipo === TipoUsuario.Paciente){
      this.turnosShow = this.turnos.filter(turno => turno.especialidad?.toLowerCase().includes(filtro) || this.getEspecialista(turno.id_especialista!).toLowerCase().includes(filtro))
    }
    if(this.auth.usuarioLogueado?.tipo === TipoUsuario.Especialista){
      this.turnosShow = this.turnos.filter(turno => turno.especialidad?.toLowerCase().includes(filtro) || this.getPaciente(turno.id_especialista!).toLowerCase().includes(filtro))
    }
    if(this.auth.usuarioLogueado?.tipo === TipoUsuario.Administrador){
      this.turnosShow = this.turnos.filter(turno => turno.especialidad?.toLowerCase().includes(filtro) || this.getEspecialista(turno.id_especialista!).toLowerCase().includes(filtro))
    }
  }

  public get EstadoTurno(): typeof EstadoTurno {
    return EstadoTurno;
  }

  public get TipoUsuario(): typeof TipoUsuario {
    return TipoUsuario;
  }

  cancelarTurno(turno: Turno) {
    Swal.fire({
      title: 'Cancelar turno',
      icon: 'question',
      text: "Ingrese motivo de su cancelación",
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Volver',
      confirmButtonText: 'Cancelar turno',
      confirmButtonColor: 'red',
      inputAttributes: {
        autocapitalize: 'off',
        minlength: "10",
        autocorrect: 'off',
        placeholder: 'Motivo',

      }
    }).then(result => {
      if (result.isConfirmed) {
        turno.estado = EstadoTurno.Cancelado
        turno.comentario = result.value
        this.turnosService.update(turno).then(res => {
          Swal.fire({
            title: 'Turno cancelado',
            icon: 'success',
            text: 'Se ha cancelado el turno correctamente',
            confirmButtonText: 'Ok'
          })
        })
      }
    })

  }

  rechazarTurno(turno:Turno){
    Swal.fire({
      title: 'Rechazar turno',
      icon: 'question',
      text: "Ingrese motivo de su rechazo",
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Volver',
      confirmButtonText: 'Rechazar turno',
      confirmButtonColor: 'red',
      inputAttributes: {
        autocapitalize: 'off',
        minlength: "10",
        autocorrect: 'off',
        placeholder: 'Motivo',

      }
    }).then(result => {
      if (result.isConfirmed) {
        turno.estado = EstadoTurno.Rechazado
        turno.comentario = result.value
        this.turnosService.update(turno).then(res => {
          Swal.fire({
            title: 'Turno rechazado',
            icon: 'success',
            text: 'Se ha rechazado el turno correctamente',
            confirmButtonText: 'Ok'
          })
        })
      }
    })
  }

  aceptarTurno(turno:Turno){
    turno.estado = EstadoTurno.Aceptado        
    this.turnosService.update(turno).then(res => {
      Swal.fire({
        title: 'Turno aceptado',
        icon: 'success',
        text: 'Se ha aceptado el turno correctamente',
        confirmButtonText: 'Ok'
      })
    })
  }

  finalizarTurno(turno:Turno){
    Swal.fire({
      title: 'Finalizar turno',
      icon: 'success',
      text: "Ingrese algun comentario y el diagnostico",
      showCancelButton: true,
      cancelButtonText: 'Volver',      
      html: `
      <label>Comentario:</label>
      <input id="swal-input1" class="swal2-input">
      <label>Diagnostico:</label>
      <input id="swal-input2" class="swal2-input">
    `,
    focusConfirm: false,
    preConfirm: () => {
    return [
      (document.getElementById('swal-input1') as HTMLInputElement).value,
      (document.getElementById('swal-input2') as HTMLInputElement).value,
    ];
  }
    }).then(result => {
      
      if (result.isConfirmed) {
        turno.estado = EstadoTurno.Realizado
        turno.comentario = result.value[0]
        turno.diagnostico = result.value[1];
        this.turnosService.update(turno).then(res => {
          Swal.fire({
            title: 'Turno finalizado',
            icon: 'success',
            text: 'Se ha finalizado el turno correctamente',
            confirmButtonText: 'Ok'
          })
        })
      }
    })
  }

  verComentario(turno:Turno){
    Swal.fire({
      title: 'Comentario',
      icon: 'info',
      text: turno.comentario,
      confirmButtonText: 'Ok'
    })  
  }

  calificarAtencion(turno:Turno){

  }

}
