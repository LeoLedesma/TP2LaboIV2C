import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, onSnapshot, orderBy, query, QueryCompositeFilterConstraint, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ICollection } from '../models/i-collection';
import { Observable } from 'rxjs';

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

  async exists(collectionName: string, column: string, value: any) {
    let docs = query(collection(this._firestore, collectionName), where(column, '==', value))

    return !(await getDocs(docs)).empty;
  }

  async existsQuery(collectionName: string, querys: QueryCompositeFilterConstraint) {
    let docs = query(collection(this._firestore, collectionName), querys)

    return !(await getDocs(docs)).empty;
  }

  getAllSnapshot<T = ICollection>(collectionName: string,order:string): Observable<T[]> {


    let docs = query(collection(this._firestore, collectionName), orderBy(order))
    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(docs, querySnapshot => {
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

  getAllWhereSnapshot<T = ICollection>(collectionName: string, querys: QueryCompositeFilterConstraint,order:string): Observable<T[]> {


    let docs = query(collection(this._firestore, collectionName), querys, orderBy(order))
    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(docs, querySnapshot => {
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