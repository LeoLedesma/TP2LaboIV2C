import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { BusquedaModule } from '../busqueda/busqueda.module';
import { SeleccionarEspecialistasComponent } from './seleccionar-especialistas.component';



@NgModule({
  declarations: [SeleccionarEspecialistasComponent],
  imports: [
    CommonModule,
    BusquedaModule,
    MatProgressSpinnerModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [SeleccionarEspecialistasComponent]
})
export class SeleccionarEspecialistasModule { }
