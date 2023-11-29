import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BusquedaModule } from 'src/app/components/busqueda/busqueda.module';
import { EncuestaAtencionModule } from 'src/app/components/encuesta-atencion/encuesta-atencion.module';
import { ListadoTurnosModule } from 'src/app/components/listado-turnos/listado-turnos.module';
import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos.component';



@NgModule({
  declarations: [
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule,
    ListadoTurnosModule,
    BusquedaModule,
    EncuestaAtencionModule
  ]
})
export class MisTurnosModule { }
