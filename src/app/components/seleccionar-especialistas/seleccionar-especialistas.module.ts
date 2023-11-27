import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HoverCardDirective } from 'src/app/directives/hover-card.directive';
import { BusquedaModule } from '../busqueda/busqueda.module';
import { SeleccionarEspecialistasComponent } from './seleccionar-especialistas.component';



@NgModule({
  declarations: [SeleccionarEspecialistasComponent,HoverCardDirective],
  imports: [
    CommonModule,
    BusquedaModule,
    MatProgressSpinnerModule
  ],
  exports: [SeleccionarEspecialistasComponent]
})
export class SeleccionarEspecialistasModule { }
