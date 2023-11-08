import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ListadoGenericoComponent } from './listado-generico.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [
    ListadoGenericoComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    ListadoGenericoComponent
  ]
})
export class ListadoGenericoModule { }
