import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HorarioModule } from 'src/app/components/altaHorario/horario.module';
import { ListadoHorariosModule } from 'src/app/components/listado-horarios/listado-horarios.module';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    HorarioModule,
    ListadoHorariosModule,
    MatIconModule,
    MatButtonModule

  ]
})
export class PerfilModule { }
