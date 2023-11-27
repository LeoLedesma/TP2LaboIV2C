import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { HorarioComponent } from './horario.component';



@NgModule({
  declarations: [
    HorarioComponent
  ],
  imports: [
    CommonModule,        
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
    MatFormFieldModule,   
    MatButtonModule 
  ],
  exports: [HorarioComponent]
})
export class HorarioModule { }
