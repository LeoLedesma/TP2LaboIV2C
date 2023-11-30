import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ListadoHistoriaModule } from '../listado-historia/listado-historia.module';
import { HistoriaClinicaComponent } from './historia-clinica.component';



@NgModule({
  declarations: [HistoriaClinicaComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,  
    MatDividerModule,  
    PipesModule,
    ListadoHistoriaModule
  ],
  exports:[HistoriaClinicaComponent]
})
export class HistoriaClinicaModule { }
