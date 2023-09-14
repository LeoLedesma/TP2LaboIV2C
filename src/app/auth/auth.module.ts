import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    AuthComponent,    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule
  ],
  exports:[    
  ]
})
export class AuthModule { }
