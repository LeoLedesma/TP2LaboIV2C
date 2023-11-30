import { Injectable } from '@angular/core';
import { and, where } from '@angular/fire/firestore';
import { HistoriaClinica } from '../models/historiaClinica';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  collectionName = 'historiaClinicas'
  constructor(private collections:CollectionsService) { }

  add(historiaClinica:HistoriaClinica){
    return this.collections.addOne(this.collectionName,historiaClinica)  
  }

  update(historiaClinica:HistoriaClinica){
    return this.collections.update(this.collectionName,historiaClinica)    
  }

  getByPaciente(id_paciente:string){
    let querys = [where("id_paciente","==",id_paciente)]
    return this.collections.getFirstQuery<HistoriaClinica>(this.collectionName,and(...querys));
  }
}
