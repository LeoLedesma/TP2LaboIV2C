import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReaccionRoutingModule } from './reaccion-routing.module';
import { PuntuacionModule } from 'src/app/components/puntuacion/puntuacion.module';
import { TimerModule } from 'src/app/components/timer/timer.module';
import { ReaccionComponent } from './reaccion.component';

import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ReaccionComponent
  ],
  imports: [
    CommonModule,
    ReaccionRoutingModule,
    PuntuacionModule,
    TimerModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class ReaccionModule { }
