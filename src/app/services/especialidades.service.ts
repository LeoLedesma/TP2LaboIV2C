import { Injectable } from '@angular/core';
import { Especialidad } from '../models/especialidad';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  collectionName:string = 'especialidades';

  constructor(private colletion:CollectionsService) { }

  getAll(){
    return this.colletion.getAllSnapshot<Especialidad>(this.collectionName,'nombre')
  }

  addOne(nombre:string){
    return this.colletion.addOne(this.collectionName,new Especialidad('',nombre))
  }

}
