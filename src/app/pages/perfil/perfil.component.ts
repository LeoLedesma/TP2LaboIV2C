import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TipoUsuario } from 'src/app/enums/TipoUsuario.enum';
import { HorarioAtencion } from 'src/app/models/horarioAtencion';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { HorariosService } from '../../services/horarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit, OnDestroy {

  horarioEdit: HorarioAtencion | undefined;
  usuario!: Usuario
  showAdd: boolean = false;
  horariosEspecialista!: HorarioAtencion[]
  horariosSub!: Subscription
  constructor(private auth: AuthService, private horariosService: HorariosService) {

  }
  ngOnDestroy(): void {

  }
  ngOnInit(): void {
    this.usuario = this.auth.usuarioLogueado!;


    if (this.usuario.tipo === TipoUsuario.Especialista) {
      console.log("especialista");
      this.horariosSub = this.horariosService.obtenerHorariosEspecialista(this.usuario.id_user).subscribe(horarios => this.horariosEspecialista = horarios)
    }
  }

  get TipoUsuario(): typeof TipoUsuario {
    return TipoUsuario;
  }

  agregarHorario(horario: HorarioAtencion) {
    horario.id_especialista = this.auth.usuarioLogueado?.id_user!;
    this.horariosService.agregarHorario(horario).then((value) => {
      Swal.fire({
        icon: 'success',
        title: 'Horario agregado',
        showConfirmButton: false,
        timer: 1500
      })
      
      this.showAdd = false;
    });
  }

  borrarHorario(horario: HorarioAtencion) {
    this.horariosService.borrarHorario(horario)
  }
  onEditarHorario(horario: HorarioAtencion) {
    this.horarioEdit = horario;
    this.showAdd = true;
  }

  editarHorario(horario: HorarioAtencion) {
    
    this.horariosService.editarHorario(horario).then((value) => {
      this.horariosService.agregarHorario(horario).then((value) => {
        Swal.fire({
          icon: 'success',
          title: 'Horario editado',
          showConfirmButton: false,
          timer: 1500
        })
        
        this.showAdd = false;
      });
    });
  }

  clickAgregar(){
    this.showAdd = true;
    this.horarioEdit = undefined;
  }

}
