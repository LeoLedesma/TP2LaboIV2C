import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SeleccionarEspecialistasModule } from 'src/app/components/seleccionar-especialistas/seleccionar-especialistas.module';
import { SeleccionarTurnoModule } from 'src/app/components/seleccionar-turno/seleccionar-turno.module';
import { SolicitarRoutingModule } from './solicitar-routing.module';
import { SolicitarComponent } from './solicitar.component';

@NgModule({
  declarations: [
    SolicitarComponent,    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitarRoutingModule,    
    SeleccionarEspecialistasModule,
    SeleccionarTurnoModule
  ]
})
export class SolicitarModule { }
