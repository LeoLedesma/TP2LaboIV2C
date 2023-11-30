import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { MatButtonModule } from '@angular/material/button';
import { BusquedaModule } from 'src/app/components/busqueda/busqueda.module';
import { ListadoGenericoModule } from 'src/app/components/listado-generico/listado-generico.module';
import { ListadoUsuariosModule } from 'src/app/components/listado-usuarios/listado-usuarios.module';
import { RegisterModule } from '../../register/register.module';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ListadoGenericoModule,
    RegisterModule,
    MatButtonModule,
    BusquedaModule,
    ListadoUsuariosModule
  ]
})
export class UsuariosModule { }
