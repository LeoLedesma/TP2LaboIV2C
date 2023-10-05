import { Injectable } from '@angular/core';
import { collection,collectionData,CollectionReference,doc,DocumentData,DocumentReference,Firestore,getDoc,getDocs,query,setDoc,updateDoc, where} from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { Log_type } from '../models/log';
import { Logger } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
    
  userCollection!: CollectionReference<DocumentData>;
  userList!: Observable<Usuario[]>;
  db!: Firestore;

  constructor(private _firestore: Firestore,private logger:Logger) {
   this.userCollection = collection(this._firestore, 'usuarios');   
   this.userList = collectionData(this.userCollection) as Observable<Usuario[]>;    
  }

  save(usuario:Usuario){
   const documentoNuevo = doc(this.userCollection);
   usuario.id_user = documentoNuevo.id;

   setDoc(documentoNuevo,{...usuario});
  }

  async exists(user:Usuario): Promise<boolean> {
    let users = query(collection(this._firestore, "usuarios"), where("username", "==", user.username),where("email", "==", user.email));    
    return !(await getDocs(users)).empty;
  }


  async existsUsername(username:string): Promise<boolean> {      
    let users = query(collection(this._firestore, "usuarios"), where("username", "==", username));
    return (await getDocs(users)).empty;
  }

  async existsEmail(email:string): Promise<boolean> {      
    let users = query(collection(this._firestore, "usuarios"), where("email", "==", email));
    return (await getDocs(users)).empty;
  }

  getAll(): Observable<Usuario[]> {return this.userList;}

  addOne(user: Usuario): boolean {
    
      if (this.userList) {        
        let docRef: DocumentReference<DocumentData> = doc(this.userCollection);    
        user.id_user = docRef.id;  
        setDoc(docRef, { ...user });
        this.logger.log("Usuarios",Log_type.CREATE,'Creación de usuario',user.email);
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
    let users = query(collection(this._firestore, "usuarios"), where("id_auth", "==", id));       
    user = await getDocs(users).then(res => res.docs[0].data() as Usuario)
    return user;
  }

  searchUsers(userQuery:string): Promise<Usuario[]> {

    let users = query(collection(this._firestore, "usuarios"), where("username", ">=", userQuery));
    getDocs(users);
  
    return getDocs(users).then(res => res.docs.map(doc => doc.data() as Usuario));
  }

}