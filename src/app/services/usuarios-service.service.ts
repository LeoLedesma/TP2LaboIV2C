import { Injectable } from '@angular/core';
import { collection,collectionData,CollectionReference,doc,DocumentData,DocumentReference,Firestore,getDoc,getDocs,query,setDoc,updateDoc, where} from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { CollectionsService } from './collections.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  collection:string = 'usuarios';    
  userCollection!: CollectionReference<DocumentData>;
  userList!: Observable<Usuario[]>;
  db!: Firestore;

  constructor(private _firestore: Firestore,private collections:CollectionsService) {
   this.userCollection = collection(this._firestore, 'usuarios');   
   this.userList = collectionData(this.userCollection) as Observable<Usuario[]>;    
  }

  save(usuario:Usuario){
   const documentoNuevo = doc(this.userCollection);
   usuario.id_user = documentoNuevo.id;

   setDoc(documentoNuevo,{...usuario});
  }

  async exists(user:Usuario): Promise<boolean> {
    let users = query(collection(this._firestore, this.collection), where("documento", "==", user.documento),where("tipo", "==", user.tipo));    
    return !(await getDocs(users)).empty;
  }

  async existsEmail(email:string): Promise<boolean> {      
    let users = query(collection(this._firestore, this.collection), where("email", "==", email));
    return (await getDocs(users)).empty;
  }

  getAll(): Observable<Usuario[]> {return this.userList;}

  addOne(user: Usuario): boolean {
      console.log(user);    
      if (this.userList) {        
        let docRef: DocumentReference<DocumentData> = doc(this.userCollection);    
        user.id_user = docRef.id;  
        setDoc(docRef, { ...user });
        return true;
      }
      return false;
  }
  update(item: Usuario) {
    const usuario = doc(this.userCollection, item.id_user);
    return updateDoc(usuario, { ...item });
  }

  async getOne(id: string): Promise<Usuario> {
    let user!: Usuario;
    let users = query(collection(this._firestore, this.collection), where("id_auth", "==", id));       
    user = await getDocs(users).then(res => res.docs[0].data() as Usuario)
    return user;
  }

  getAllUsers(): Observable<Usuario[]> {
    return this.collections.getAllSnapshot(this.collection,'fec_registro');
  }

}