import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntadosRoutingModule } from './preguntados-routing.module';
import { PreguntadosComponent } from './preguntados.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { PuntuacionModule } from 'src/app/components/puntuacion/puntuacion.module';
import { LifesModule } from 'src/app/components/lifes/lifes.module';


@NgModule({
  declarations: [
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    PreguntadosRoutingModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    PuntuacionModule,
    LifesModule
  ]
})
export class PreguntadosModule { }
