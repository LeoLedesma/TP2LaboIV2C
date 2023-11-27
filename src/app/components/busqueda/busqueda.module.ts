import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusquedaComponent } from './busqueda.component';




@NgModule({
  declarations: [BusquedaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [BusquedaComponent]
})
export class BusquedaModule { }
