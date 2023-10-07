import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AhorcadoPalabraComponent } from './ahorcado-palabra/ahorcado-palabra.component';
import { AhorcadoVidasComponent } from './ahorcado-vidas/ahorcado-vidas.component';
import { AhorcadoTecladoComponent } from './ahorcado-teclado/ahorcado-teclado.component';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [    
    AhorcadoPalabraComponent,    
    AhorcadoVidasComponent,
    AhorcadoTecladoComponent    
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    AhorcadoPalabraComponent,    
    AhorcadoVidasComponent,
    AhorcadoTecladoComponent    
  ]
})
export class AhorcadoComponentsModule { }
