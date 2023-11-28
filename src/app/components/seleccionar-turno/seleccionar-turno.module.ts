import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BusquedaModule } from '../busqueda/busqueda.module';

import { PipesModule } from 'src/app/pipes/pipes.module';

import { DirectivesModule } from 'src/app/directives/directives.module';
import SeleccionarTurnoComponent from './seleccionar-turno.component';




@NgModule({
  declarations: [SeleccionarTurnoComponent],
  imports: [
    CommonModule,
    BusquedaModule,
    MatProgressSpinnerModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [SeleccionarTurnoComponent]
})
export class SeleccionarTurnoModule { }
