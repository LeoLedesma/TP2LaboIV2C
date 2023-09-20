import { Injectable } from '@angular/core';
import { addDoc,collection,collectionData,CollectionReference,doc,DocumentData,DocumentReference,Firestore,getDoc,getDocs,query,setDoc,updateDoc, where} from '@angular/fire/firestore';
import { Log, Log_type } from '../models/log';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class Logger {

  loggerCollection!: CollectionReference<DocumentData>;
  logList: Observable<Log[]> = new Observable<Log[]>();
  
  constructor(private _firestore: Firestore) {
    this.loggerCollection = collection(this._firestore, 'logs');   
   }
 
   log(collection: string,log_type:Log_type,log_result_detail:string,email?:string){    
    const documentoNuevo = doc(this.loggerCollection);    
    let log = <Log>{ id_log: documentoNuevo.id, collection: collection, fec_log: new Date(), email: email || this.getEmailFromStorage(), log_type: log_type, log_result_detail: log_result_detail};
      
    setDoc(documentoNuevo,{...log});
   }
 
   getAll(): Observable<Log[]> {return this.logList}

   getEmailFromStorage() {
    const user = JSON.parse(localStorage.getItem('currentUser') || undefined!);
    if (user) {
      return (<Usuario>user).email;        
    }

    return undefined;
  }
 
}
