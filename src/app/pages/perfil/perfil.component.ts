import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TipoUsuario } from 'src/app/enums/TipoUsuario.enum';
import { HorarioAtencion } from 'src/app/models/horarioAtencion';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
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
  especialidadesSub!: Subscription
  especialidades!: string[]
  constructor(private auth: AuthService, private horariosService: HorariosService, private especialidadesService: EspecialidadesService,private usuariosService:UsuariosService) {

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

  clickAgregar() {
    this.showAdd = true;
    this.horarioEdit = undefined;
  }

  agregarEspecialidad() {
    this.especialidadesSub = this.especialidadesService.getAll().subscribe(especialidades => {
      this.especialidades = especialidades.map(e => e.nombre)
      let especialidadesStr = especialidades.filter(e => !this.usuario.especialidades.includes(e.nombre)).map(e => e.nombre).sort((a, b) => a.localeCompare(b))
      let especialidad: string = '';
      const inputValue = especialidad;
      Swal.fire({
        title: "Seleccion de especialidad",
        input: "select",
        inputLabel: "Selecciona una especialidad:",
        inputValue,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Agregar",
        showDenyButton:true,
        denyButtonText: 'Crear nueva especialidad',
        denyButtonColor:'green',
        inputOptions: {
          ...especialidadesStr
        },
        inputPlaceholder: "Seleccione una especialidad",               
      }).then(result => {
        if (result.isConfirmed) {
          console.log(result.value)
        }
        if(result.isDenied){
          this.addEspecialidad()
        }
      })

    })

  }

  async addEspecialidad() {
    let especialidad: string = '';
    const inputValue = especialidad;
    const { value: especialidadInput } = await Swal.fire({
      title: "Nueva especialidad",
      input: "text",
      inputLabel: "Ingrese una nueva especialidad:",
      inputValue,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Cargar",
      inputValidator: (value) => {
        if (!value)
          return "Escribe algo!";

        if (this.especialidades.indexOf(value) !== -1)
          return 'La especialidad ya existe!'

        return ''
      }
    });
    if (especialidadInput) {
      this.especialidadesService.addOne(especialidadInput).then(() => {
        this.usuario.especialidades.push(especialidadInput)
        this.usuariosService.update(this.usuario).then(value =>{
          Swal.fire(`Nueva especialidad agregada: ${especialidadInput}`)
          this.auth.usuarioLogueado = this.usuario;
          this.auth.setUserToStorage()
        })
      })
    }
  }

}
