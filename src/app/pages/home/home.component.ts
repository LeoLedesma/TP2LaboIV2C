import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  juegos =
  [
    {
      path: '/juegos/mayormenor',
      name: 'Mayor o menor',
      image: 'assets/img/MayorMenor.png',
      description: 'El objetivo del juego es adivinar si la siguiente carta que se sacará será mayor o menor a la anteriormente sacada.'    
    },
    {
      path: '/juegos/ahorcado',
      name: 'Ahorcado',
      image: 'assets/img/ahorcado.png',
      description: 'El objetivo del juego es adivinar la palabra incognita antes de perder todas las vidas.'    
    },
    {
      path: '/juegos/preguntados',
      name: 'Preguntados',
      image: 'assets/img/preguntados.png',
      description: 'El objetivo del juego es responder correctamente la máxima cantidad de preguntas con la cantidad de vidas establecidas.'    
    },
    {
      path: '/juegos/reaccion',
      name: 'Reaccion',
      image: 'assets/img/reaccion.png',
      description: 'El objetivo del juego es hacer click en el lugar correcto la mayor cantidad de veces en el lapso de 30 segundos.'    
    }
  ]

}
