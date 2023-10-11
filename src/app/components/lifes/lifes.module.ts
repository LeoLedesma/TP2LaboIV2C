import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifesComponent } from './lifes.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    LifesComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports:[
    LifesComponent  
  ]
})
export class LifesModule { }
