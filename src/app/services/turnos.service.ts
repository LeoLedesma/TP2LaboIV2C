import { Injectable } from '@angular/core';
import { and, where } from '@angular/fire/firestore';
import { Turno } from '../models/turno';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private collecionName="turnos"

  constructor(private collection:CollectionsService) { }

  obtenerTurnosPorEspecialista(id_especialista:string){
    let querys = [where('id_especialista','==',id_especialista)];
    
    return this.collection.getAllWhereSnapshot<Turno>(this.collecionName,and(...querys))
  }

  async reservarTurno(turno:Turno){
    let querys = [where('id_especialista','==',turno.id_especialista),where('fechaTurno','==',turno.fechaTurno)];

    let result = await !this.collection.existsQuery(this.collecionName,and(...querys))

    console.log(result)
    if(!result)
    {      
      return this.collection.addOne(this.collecionName,turno)
    }else{
      return false  
    }
  }
}
