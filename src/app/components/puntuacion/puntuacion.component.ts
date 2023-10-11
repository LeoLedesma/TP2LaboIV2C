import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-puntuacion',
  templateUrl: './puntuacion.component.html',
  styleUrls: ['./puntuacion.component.scss']
})
export class PuntuacionComponent {
  @Input() puntos:number = 0;
  @Input() text_white:boolean = true;

}
