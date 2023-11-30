import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BusquedaModule } from 'src/app/components/busqueda/busqueda.module';
import { GenerarHistoriaClinicaModule } from 'src/app/components/generar-historia-clinica/generar-historia-clinica.module';
import { ListadoPacientesModule } from 'src/app/components/listado-pacientes/listado-pacientes.module';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';


@NgModule({
  declarations: [
    PacientesComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    BusquedaModule,
    ListadoPacientesModule,
    GenerarHistoriaClinicaModule
  ]
})
export class PacientesModule { }
