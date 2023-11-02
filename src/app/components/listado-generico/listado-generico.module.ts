import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ListadoGenericoComponent } from './listado-generico.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
  declarations: [
    ListadoGenericoComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule        
  ],
  exports:[
    ListadoGenericoComponent
  ]
})
export class ListadoGenericoModule { }
