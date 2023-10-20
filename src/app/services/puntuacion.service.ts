import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CollectionsService } from './collections.service';
import { Puntuacion } from '../models/puntuacion.interface';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  constructor(private authService: AuthService, private collectionService: CollectionsService){}

  saveScore(juego:string, puntaje:number, resultado:string):boolean{

    // const currentUser = this.authService.usuarioLogueado!.username;

    // let puntuacion: Puntuacion = {id:"",game:juego, score:puntaje, result:resultado, date:Timestamp.now(), username: currentUser}

    // try{
    //   this.collectionService.addOne("puntuaciones",puntuacion);
    //   return true;
    // }
    // catch{
    //   return false;
    // }

    return true
  }
}
