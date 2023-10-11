import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { AhorcadoComponent } from './ahorcado.component';
import { AhorcadoComponentsModule } from 'src/app/components/ahorcado/ahorcado.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { PuntuacionModule } from 'src/app/components/puntuacion/puntuacion.module';
import { TimerModule } from 'src/app/components/timer/timer.module';



@NgModule({
  declarations: [
    AhorcadoComponent
  ],
  imports: [
    CommonModule,
    AhorcadoRoutingModule,
    AhorcadoComponentsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    PuntuacionModule,
    TimerModule
  ]
})
export class AhorcadoModule { }
