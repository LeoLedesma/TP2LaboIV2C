import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ListadoGenericoModule } from 'src/app/components/listado-generico/listado-generico.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { RegisterModule } from '../../register/register.module';


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ListadoGenericoModule,
    RegisterModule
  ]
})
export class UsuariosModule { }
