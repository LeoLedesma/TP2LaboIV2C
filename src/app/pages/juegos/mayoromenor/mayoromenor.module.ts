import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
import { MayoromenorRoutingModule } from './mayoromenor-routing.module';
import { MayoromenorComponent } from './mayoromenor.component';


@NgModule({
  declarations: [    
    MayoromenorComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MayoromenorRoutingModule
  ]
})
export class MayoromenorModule { }
