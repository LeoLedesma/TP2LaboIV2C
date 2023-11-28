import { Injectable } from '@angular/core';
import { and, where } from '@angular/fire/firestore';
import { EstadoTurno, Turno } from '../models/turno';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private collecionName="turnos"

  constructor(private collection:CollectionsService) { }

  obtenerTurnos(){
    return this.collection.getAllSnapshot<Turno>(this.collecionName,'')  
  }

  obtenerTurnosByDate(date:Date){   
    console.log(date);
    let querys = [where('fechaTurno','==',date),where('estado','not-in',[EstadoTurno.Cancelado,EstadoTurno.Rechazado])];
    
    return this.collection.getAllWhereSnapshot<Turno>(this.collecionName,and(...querys))
  }
    

  obtenerAllTurnosPorEspecialista(id_especialista:string){
    let querys = [where('id_especialista','==',id_especialista)];
    
    return this.collection.getAllWhereSnapshot<Turno>(this.collecionName,and(...querys))
  }

  obtenerTurnosOcupadosPorEspecialista(id_especialista:string){
    let querys = [where('id_especialista','==',id_especialista),where('estado','not-in',[EstadoTurno.Cancelado,EstadoTurno.Rechazado])];
    
    return this.collection.getAllWhereSnapshot<Turno>(this.collecionName,and(...querys))
  }


  obtenerTurnosPorPaciente(id_paciente:string){
    let querys = [where('id_paciente','==',id_paciente)];
    
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

  update(turno:Turno){
    return this.collection.update(this.collecionName,turno)  
  }
}
