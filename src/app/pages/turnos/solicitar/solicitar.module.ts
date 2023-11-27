import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SeleccionarEspecialistasModule } from 'src/app/components/seleccionar-especialistas/seleccionar-especialistas.module';
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
        
  ]
})
export class SolicitarModule { }
