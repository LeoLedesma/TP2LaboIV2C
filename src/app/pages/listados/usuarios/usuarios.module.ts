import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListadoGenericoModule } from 'src/app/components/listado-generico/listado-generico.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { RegisterModule } from '../../register/register.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ListadoGenericoModule,
    RegisterModule,
    MatButtonModule
  ]
})
export class UsuariosModule { }
