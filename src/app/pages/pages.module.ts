import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [     
  
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,      
  ]
})
export class PagesModule { }
