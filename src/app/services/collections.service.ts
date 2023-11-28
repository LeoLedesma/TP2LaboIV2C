import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDocs, onSnapshot, orderBy, Query, query, QueryCompositeFilterConstraint, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICollection } from '../models/i-collection';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private _firestore: Firestore,) {
  }

  addOne(collectionName: string, document: ICollection) {
    return new Promise<DocumentReference<DocumentData>>((resolve) => {
      let collectionRef = collection(this._firestore, collectionName);
      let docRef: DocumentReference<DocumentData>;

      if (document.id == "" || document.id == undefined || document.id == null) {
        docRef = doc(collectionRef);
        document.id = docRef.id;
      }
      else {
        docRef = doc(collectionRef, document.id);
      }
      setDoc(docRef, { ...document });
      resolve(docRef);

    });
  }

  update(collectionName: string, document: ICollection) {
    let collectionRef = collection(this._firestore, collectionName);
    const newDoc = doc(collectionRef, document.id);
    return updateDoc(newDoc, { ...document });
  }

  getOne(collectionName: string, id: string) {
    let collectionRef = collection(this._firestore, collectionName);
    const document = query(collectionRef, where("id", "==", id));

    return getDocs(document)
  }

  removeOne(collectionName: string, id: string) {
    let collectionRef = collection(this._firestore, collectionName);
    const document = doc(collectionRef, id);
    return deleteDoc(document);
  }

  getFirstQuery<T = ICollection>(collectionName: string, querys: QueryCompositeFilterConstraint) {
    let docs = query(collection(this._firestore, collectionName), querys)

    return getDocs(docs).then(res => res.docs.map(doc => doc.data() as T)![0])
  }

  getAll(collectionName: string) {
    let collectionRef = collection(this._firestore, collectionName);
    return getDocs(collectionRef).then(res => res.docs.map(doc => doc.data() as ICollection));
  }

  getAllWhere(collectionName: string, column: string, value: any) {
    let docs = query(collection(this._firestore, collectionName), where(column, '==', value))
    return getDocs(docs).then(res => res.docs.map(doc => doc.data() as ICollection));
  }

  getAllWhereQuery<T = ICollection>(collectionName: string, querys: QueryCompositeFilterConstraint) {
    let docs = query(collection(this._firestore, collectionName), querys)
    return getDocs(docs).then(res => res.docs.map(doc => doc.data() as T));
  }

  async exists(collectionName: string, column: string, value: any) {
    let docs = query(collection(this._firestore, collectionName), where(column, '==', value))

    return !(await getDocs(docs)).empty;
  }

  async existsQuery(collectionName: string, querys: QueryCompositeFilterConstraint) {
    let docs = query(collection(this._firestore, collectionName), querys)
    let hola = await getDocs(docs)

    console.log(hola.docs.map(doc => doc.data() as Turno))
    return !(await getDocs(docs)).empty;
  }

  getAllSnapshot<T = ICollection>(collectionName: string,order:string): Observable<T[]> {    
    let queryNew!: Query<DocumentData>;

    
    if(order == '')
    {
      queryNew = query(collection(this._firestore, collectionName))
    }else{
      queryNew = query(collection(this._firestore, collectionName), orderBy(order))
    }
    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(queryNew, querySnapshot => {
        const collection: T[] = [];

        querySnapshot.forEach(doc => {
          const simpleDoc = { ...doc.data() as T };
          collection.push(simpleDoc);
        });

        subscriber.next(collection);
      });

      // Cleanup the listener when unsubscribed
      return () => unsubscribe();
    });
  }

  getAllWhereSnapshot<T = ICollection>(collectionName: string, querys: QueryCompositeFilterConstraint,order:string =''): Observable<T[]> {

    let queryNew!: Query<DocumentData>;

    
    if(order == '')
    {
      queryNew = query(collection(this._firestore, collectionName), querys)
    }else{
      queryNew = query(collection(this._firestore, collectionName), querys, orderBy(order))
    }
    

    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(queryNew, querySnapshot => {
        const collection: T[] = [];

        querySnapshot.forEach(doc => {
          const simpleDoc = { ...doc.data() as T };
          collection.push(simpleDoc);
        });

        subscriber.next(collection);
      });

      // Cleanup the listener when unsubscribed
      return () => unsubscribe();
    });
  }


} 