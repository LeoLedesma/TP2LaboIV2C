import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoPalabraComponent } from './ahorcado-palabra/ahorcado-palabra.component';
import { AhorcadoVidasComponent } from './ahorcado-vidas/ahorcado-vidas.component';
import { AhorcadoTecladoComponent } from './ahorcado-teclado/ahorcado-teclado.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LifesModule } from '../lifes/lifes.module';



@NgModule({
  declarations: [    
    AhorcadoPalabraComponent,    
    AhorcadoVidasComponent,
    AhorcadoTecladoComponent    
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    LifesModule
  ],
  exports:[
    AhorcadoPalabraComponent,    
    AhorcadoVidasComponent,
    AhorcadoTecladoComponent    
  ]
})
export class AhorcadoComponentsModule { }
