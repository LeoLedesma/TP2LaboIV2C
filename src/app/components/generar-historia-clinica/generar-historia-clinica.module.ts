import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GenerarHistoriaClinicaComponent } from './generar-historia-clinica.component';



@NgModule({
  declarations: [GenerarHistoriaClinicaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  exports:[GenerarHistoriaClinicaComponent]
})
export class GenerarHistoriaClinicaModule { }
