import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuariosService } from './usuarios-service.service';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Logger } from './logger.service';
import { Log_type } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogueado!: Usuario | undefined;
  onUserLogged: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  onUserLogout: EventEmitter<void> = new EventEmitter<void>();

  constructor(private usuariosService: UsuariosService, private auth: Auth, private logger:Logger) {
    this.getUserFromStorage()    
   }

  async RegistrarUsuario(email: string, username: string, password: string):Promise<{result:boolean,error:string}>{    
    const nuevoUsuario = <Usuario>{ email: email, id_auth: '', username: username, fec_registro: new Date };
    return this.usuariosService.exists(nuevoUsuario).then(exists => {
      if (exists)      
        return {result: false, error: "El usuario ya existe"};
      else
        return createUserWithEmailAndPassword(this.auth, email, password)
          .then((userCredential) => {
            nuevoUsuario.id_auth = userCredential.user.uid;
            this.usuariosService.addOne(nuevoUsuario)
            return {result: true, error: ""};
          })
          .catch((error: any) => {   
            this.logger.log("Usuarios",Log_type.CREATE,"Intento de logueo"+error.code,email)         
            switch(error.code){              
              case "auth/invalid-email":
                return {result: false, error: "Email invalido"};
              case "auth/email-already-exists":
                return {result: false, error: "Email ya registrado"};
              case "auth/invalid-password":
                  return {result: false, error: "Contraseña debil"};
              default:
                return {result:false,error: "Error al registrar usuario"}
            }}
          );
    })

  }

  async IniciarSesion(email: string, password: string) {
    
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password); 
      return this.usuariosService.getOne(userCredential.user.uid).then(user => {       
        this.usuarioLogueado = user; 
        this.setUserToStorage();
        return {result: true, error: ""};
      })
      
    } catch (error: any) {
      this.logger.log("Usuarios",Log_type.LOGIN,"Intento de logueo"+error.code,email)

      switch(error.code){
        case "auth/user-not-found":          
        case "auth/wrong-password":
        case "auth/invalid-email":
          return {result: false, error: "Usuario o contraseña incorrecta"};
        default:
          return {result: false, error: "Error al iniciar sesion"};
      }            
    }
  }

  async CerrarSesion() {    
    try {
      await signOut(this.auth)

      this.logger.log("Usuarios",Log_type.LOGOUT,"Cierre de sesion",this.usuarioLogueado?.email)
      this.usuarioLogueado = undefined      
      this.deleteUserFromStorage();
      return {result: true, error: ""};
    } catch (error) {
      return {result: false, error: "Error al cerrar sesion"};
    }
  }

  getUserFromStorage() {
    if(this.usuarioLogueado === undefined)
    {
      try{
        const user = JSON.parse(localStorage.getItem('currentUser') || undefined!);
        if (user) {        
        this.usuarioLogueado = <Usuario>user;            
        this.logger.log("Usuarios",Log_type.LOGIN,"Logueo desde LocalStorage",this.usuarioLogueado?.email)
        this.onUserLogged.emit(this.usuarioLogueado);  
        }
      }
      catch(e){
        localStorage.removeItem('currentUser');
      }      
    
    }else{
      this.onUserLogged.emit(this.usuarioLogueado);  
    }
  }

  setUserToStorage() {
    localStorage.setItem('currentUser', JSON.stringify(this.usuarioLogueado));
    this.logger.log("Usuarios",Log_type.LOGIN,"Logueado exitoso",this.usuarioLogueado?.email)
    this.onUserLogged.emit(this.usuarioLogueado);
  }

  deleteUserFromStorage() {
    localStorage.removeItem('currentUser');
    this.logger.log("Usuarios",Log_type.LOGOUT,"Logout exitoso",this.usuarioLogueado?.email)
    this.onUserLogout.emit();      
  }

}
