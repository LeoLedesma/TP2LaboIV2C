import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos.component';



@NgModule({
  declarations: [
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule
  ]
})
export class MisTurnosModule { }
