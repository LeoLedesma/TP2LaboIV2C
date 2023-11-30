import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ListadoUsuariosComponent } from './listado-usuarios.component';



@NgModule({
  declarations: [
    ListadoUsuariosComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule    
  ],
  exports:[
    ListadoUsuariosComponent,
  ]
})
export class ListadoUsuariosModule { }
