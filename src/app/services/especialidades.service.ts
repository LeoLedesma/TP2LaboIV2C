import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, collection, doc, or, setDoc, where } from '@angular/fire/firestore';
import { Especialidad } from '../models/especialidad';
import { CollectionsService } from './collections.service';
import { FilesService } from './files.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  collectionName: string = 'especialidades';

  constructor(private colletion: CollectionsService, private filesService: FilesService, private firestore: Firestore) { }

  getAll() {
    return this.colletion.getAllSnapshot<Especialidad>(this.collectionName, 'nombre')
  }

  async addOne(nombre: string, image?: File): Promise<boolean> {
    console.log(nombre);
    let especialidad = new Especialidad('', nombre)

    let docRef: DocumentReference<DocumentData> = doc(collection(this.firestore, this.collectionName));

    let getImagesUrl: string[] = [];
    if (image) {
      let images: File[] = [image!];

      getImagesUrl = await this.filesService.saveImages(images!, docRef.id);
      especialidad.img = getImagesUrl[0];
    }else{
      especialidad.img = ''
    }

    especialidad.id = docRef.id;

    setDoc(docRef, { ...especialidad });
    return true;
  }

  getEspecialidades(especialidades:string[]){
    let querys = especialidades.map(e=>where('nombre', '==', e));
    
    return this.colletion.getAllWhereQuery<Especialidad>(this.collectionName, or(...querys));
  }

}
