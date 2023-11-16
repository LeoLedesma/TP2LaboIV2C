import { Injectable } from '@angular/core';
import { and, collection, collectionData, CollectionReference, doc, DocumentData, DocumentReference, Firestore, getDocs, query, QueryFieldFilterConstraint, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EstadoUsuario } from '../enums/EstadoUsuario.enum';
import { TipoUsuario } from '../enums/TipoUsuario.enum';
import { Usuario } from '../models/usuario';
import { CollectionsService } from './collections.service';
import { FilesService } from './files.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  collection:string = 'usuarios';    
  userCollection!: CollectionReference<DocumentData>;
  userList!: Observable<Usuario[]>;
  db!: Firestore;

  constructor(private _firestore: Firestore,private collections:CollectionsService,private filesService:FilesService) {
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

  

  async addOne(user: Usuario,images?:File[]): Promise<boolean> {
      console.log(user);    
      if (this.userList) {        
        let docRef: DocumentReference<DocumentData> = doc(this.userCollection);    

        let getImagesUrl: any = [];
      // guardo las imagenes
        this.filesService.saveImages(images!, docRef.id);
        getImagesUrl = await this.filesService.getImagesById(docRef.id)

        if(user.tipo == TipoUsuario.Especialista){
          user.fotos.push(getImagesUrl[0]);        
        }else{
          user.fotos.push(getImagesUrl[0]); 
          user.fotos.push(getImagesUrl[1]); 
        }

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

  getEspecialistasHabilitados(query:QueryFieldFilterConstraint[]){
    let querys = [where('tipo','==','Especialista')]
    return this.collections.getAllWhere
  }

  getEspecialistasByEspecialidad(especialidad:string){
    let querys = [where('tipo','==','Especialista'),
                  where('especialidad','==',especialidad),
                  where('estado','==',EstadoUsuario.Habilitado),
                  where('email_confirmado','==',true)]
    return this.collections.getAllWhereSnapshot(this.collection,and(...querys),'apellido');   

  }

}