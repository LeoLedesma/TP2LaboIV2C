import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SolicitarRoutingModule } from './solicitar-routing.module';
import { SolicitarComponent } from './solicitar.component';


@NgModule({
  declarations: [
    SolicitarComponent
  ],
  imports: [
    CommonModule,
    SolicitarRoutingModule,
    ReactiveFormsModule
  ]
})
export class SolicitarModule { }
