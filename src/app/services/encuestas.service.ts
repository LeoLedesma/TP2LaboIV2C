import { Injectable } from '@angular/core';
import { Encuesta } from '../models/encuesta';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  private collecionName:string = 'encuestas'
  constructor(private collections:CollectionsService) { }

  public addOne(encuesta:Encuesta){
    return this.collections.addOne(this.collecionName,encuesta)
  }
}
