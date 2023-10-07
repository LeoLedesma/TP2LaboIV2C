import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AhorcadoRoutingModule } from './ahorcado-routing.module';
import { AhorcadoComponent } from './ahorcado.component';
import { AhorcadoComponentsModule } from 'src/app/components/ahorcado/ahorcado.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';



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
  ]
})
export class AhorcadoModule { }
