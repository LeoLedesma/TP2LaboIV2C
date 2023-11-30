import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstadoUsuario } from 'src/app/enums/EstadoUsuario.enum';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import { TipoUsuario } from '../../../enums/TipoUsuario.enum';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
//TODO Agregar botones de acciones, columna de aceptado o no para especialistas o en jumbotron
export class UsuariosComponent implements OnInit, OnDestroy {

  filtro:string = '';
  usuariosSub!: Subscription
  usuariosArr: Usuario[] = []
  usuario!: Usuario;
  displayedColumns: { property: string, nameToShow: string }[] =
    [{ property: 'nombre', nameToShow: 'Nombre' },
    { property: 'apellido', nameToShow: 'Apellido' },
    { property: 'documento', nameToShow: 'DNI' },
    { property: 'edad', nameToShow: 'Edad' },
    { property: 'tipo', nameToShow: 'Tipo' },
    { property: 'obraSocial', nameToShow: 'Obra Social' },
    { property: 'especialidad', nameToShow: 'Especialidad' },
    { property: 'email', nameToShow: 'Correo electrónico' },
    { property: 'estado', nameToShow: 'Estado' },
    { property: 'email_confirmado', nameToShow:'Email Confirmado'}
      //{ property: 'actions', nameToShow: 'Acciones' },    
    ]

  // actions: { class: string, icon: string, action: string }[] =
  //   [{
  //     class: 'primary',
  //     icon: 'check',
  //     action: 'Aceptar'
  //   },
  //   {
  //     class: 'warn',
  //     icon: 'close',
  //     action: 'Rechazar'
  //   }]

  repartidoresProm = this.usuarios.getAllUsers();

  constructor(private usuarios: UsuariosService) { }
  ngOnDestroy(): void {
    this.usuariosSub?.unsubscribe()
  }

  ngOnInit(): void {
    this.usuariosSub = this.usuarios.getAllUsers().subscribe(users => { this.usuariosArr = users; console.log(users) })
  }

  onListClick(usuario: Usuario) {    
      this.usuario = usuario;    
  }

  //todo revisar onActionClick
  onActionClick(estado: EstadoUsuario) {
    this.usuario.estado = estado;
    Swal.fire({
      icon: 'success',
      title: 'Cambio de estado',
      html: this.getMesaggeOnAction(estado),
      confirmButtonText: `<i class="fa fa-thumbs-up"></i> Aceptar!`,      
    }).then(r => {
      this.usuarios.update(this.usuario);
    })
  }

  getMesaggeOnAction(estado: EstadoUsuario) {
    let mensaje: HTMLElement = document.createElement("p");

    let accion: string

    switch (estado) {
      case EstadoUsuario.Habilitado:
        accion = this.usuario.tipo + " habilitado";
        break;
      case EstadoUsuario.Rechazado:
        accion = this.usuario.tipo + " rechazado";
        break;
      case EstadoUsuario.Inhabilitado:
        accion = this.usuario.tipo + " inhabilitado";
    }

    mensaje.appendChild(document.createTextNode(accion));
    return mensaje;
  }

  public get EstadoUsuario(): typeof EstadoUsuario {

    return EstadoUsuario;
  }

  public get TipoUsuario(): typeof TipoUsuario {

    return TipoUsuario;
  }

  buscar(input: string) {
    this.filtro = input;
  }

}
