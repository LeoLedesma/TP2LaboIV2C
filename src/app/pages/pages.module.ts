import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { Router, RouterModule } from '@angular/router';


@NgModule({
  declarations: [QuienSoyComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule
  ]
})
export class PagesModule { }
