import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ListadoPacientesComponent } from './listado-pacientes.component';



@NgModule({
  declarations: [ListadoPacientesComponent],
  imports: [
    CommonModule,   
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    PipesModule
  ],
  exports:[
    ListadoPacientesComponent
  ]
})
export class ListadoPacientesModule { }
