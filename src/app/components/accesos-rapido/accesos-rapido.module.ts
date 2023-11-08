import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { AccesosRapidoComponent } from './accesos-rapido.component';




@NgModule({
  declarations: [
    AccesosRapidoComponent
  ],
  imports: [
    CommonModule,
    MatListModule
  ],
  exports: [
    AccesosRapidoComponent]
})
export class AccesosRapidoModule { }
