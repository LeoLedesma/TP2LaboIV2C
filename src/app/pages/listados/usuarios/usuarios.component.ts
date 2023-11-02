import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuariosService } from '../../../services/usuarios-service.service';
import { Usuario } from 'src/app/models/usuario';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
//TODO Agregar botones de acciones, columna de aceptado o no para especialistas o en jumbotron
export class UsuariosComponent implements OnInit, OnDestroy {

  usuariosSub!: Subscription
  usuariosArr: Usuario[] = []
  displayedColumns: { property: string, nameToShow: string }[] =
    [{ property: 'nombre', nameToShow: 'Nombre' },
    { property: 'apellido', nameToShow: 'Apellido' },
    { property: 'documento', nameToShow: 'DNI' },
    { property: 'edad', nameToShow: 'Edad' },
    { property: 'tipo', nameToShow: 'Tipo' },
    { property: 'obraSocial', nameToShow: 'Obra Social' },
    { property: 'especialidades', nameToShow: 'Especialidades' },
    { property: 'email', nameToShow: 'Correo electrónico' },
    ]


  repartidoresProm = this.usuarios.getAllUsers();

  constructor(private usuarios: UsuariosService) { }
  ngOnDestroy(): void {
    this.usuariosSub?.unsubscribe()
  }

  ngOnInit(): void {
    this.usuariosSub = this.usuarios.getAllUsers().subscribe(users => { this.usuariosArr = users; console.log(users) })

  }



}
