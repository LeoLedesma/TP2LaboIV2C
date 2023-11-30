import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ListadoHistoriaComponent } from './listado-historia.component';






@NgModule({
  declarations: [
    ListadoHistoriaComponent
  ],
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
    ListadoHistoriaComponent
  ]
})
export class ListadoHistoriaModule { }
