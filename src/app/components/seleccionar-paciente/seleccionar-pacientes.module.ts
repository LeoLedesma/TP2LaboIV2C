import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { BusquedaModule } from '../busqueda/busqueda.module';
import { SeleccionarPacientesComponent } from './seleccionar-pacientes.component';




@NgModule({
  declarations: [SeleccionarPacientesComponent],
  imports: [
    CommonModule,
    BusquedaModule,
    MatProgressSpinnerModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [SeleccionarPacientesComponent]
})
export class SeleccionarPacientesModule { }
