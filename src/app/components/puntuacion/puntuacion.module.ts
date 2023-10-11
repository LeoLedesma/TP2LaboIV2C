import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuntuacionComponent } from './puntuacion.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    PuntuacionComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule   
  ],
  exports:[
    PuntuacionComponent
  ]
})
export class PuntuacionModule { }
