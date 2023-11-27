import { Injectable } from '@angular/core';
import { QueryFilterConstraint, and, where } from '@angular/fire/firestore';
import { HorarioAtencion } from '../models/horarioAtencion';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  collectionName: string = 'horarios';
  constructor(private collection: CollectionsService) { }

  obtenerHorariosEspecialista(id_especialista: string) {
    let query: QueryFilterConstraint[] = [];

    query.push(where('id_especialista', '==', id_especialista))
    return this.collection.getAllWhereSnapshot<HorarioAtencion>(this.collectionName, and(...query),'');
  }

  obtenerTurnosDisponibles() {

  }

  agregarHorario(horario: HorarioAtencion) {
    return this.collection.addOne(this.collectionName, horario)
  }

  borrarHorario(horario:HorarioAtencion){
    return this.collection.removeOne(this.collectionName, horario.id);  
  }

  editarHorario(horario:HorarioAtencion){
    return this.collection.update(this.collectionName, horario);
  }

}
