import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ICollection } from '../models/i-collection';
import { Log_type } from '../models/log';
import { Logger } from './logger.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private _firestore: Firestore, private logger: Logger, private auth: AuthService) {
  }

  addOne(collectionName: string, document: ICollection) {
    return new Promise<DocumentReference<DocumentData>>((resolve) => {
      let collectionRef = collection(this._firestore, collectionName);

      let docRef: DocumentReference<DocumentData> = doc(collectionRef);
      document.id = docRef.id;
      this.logger.log(collectionName, Log_type.CREATE, 'Creación de ' + collectionName, this.auth.usuarioLogueado!.email);
      setDoc(docRef, { ...document });
      resolve(docRef);
    });
  }

  update(collectionName: string, document: ICollection) {
    let collectionRef = collection(this._firestore, collectionName);
    const usuario = doc(collectionRef, document.id);
    return updateDoc(usuario, { ...document });
  }

  getOne(collectionName: string, id: string) {
    let collectionRef = collection(this._firestore, collectionName);
    const document = query(collectionRef, where("id", "==", id));

    return getDocs(document)
  }
}
