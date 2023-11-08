import { EventEmitter, Injectable } from '@angular/core';
import { Auth, User, applyActionCode, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EstadoUsuario } from '../enums/EstadoUsuario.enum';
import { TipoUsuario } from '../enums/TipoUsuario.enum';
import { Usuario } from '../models/usuario';
import { UsuariosService } from './usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogueado!: Usuario | undefined;
  onUserLogged: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  onUserLogout: EventEmitter<void> = new EventEmitter<void>();
  private userCredential!:User

  constructor(private usuariosService: UsuariosService, private auth: Auth,private router:Router) {
    this.getUserFromStorage()
  }

  async RegistrarUsuario(usuario: Usuario, password: string): Promise<{ result: boolean, error: string }> {
    usuario.fec_registro = Timestamp.now();
    if(usuario.tipo === TipoUsuario.Administrador)
      usuario.email_confirmado = true;
    return this.usuariosService.exists(usuario).then(exists => {
      if (exists)
        return { result: false, error: "La persona ya existe" };
      else
        return createUserWithEmailAndPassword(this.auth, usuario.email, password)
          .then((userCredential) => {
            this.userCredential = userCredential.user
            usuario.id_auth = userCredential.user.uid;
            this.usuariosService.addOne(usuario)                        
            return { result: true, error: "" };
          })
          .catch((error: any) => {
            console.log(error);
            switch (error.code) {
              case "auth/invalid-email":
                return { result: false, error: "Correo electrónico invalido" };
              case "auth/email-already-in-use":
                return { result: false, error: "Correo electrónico ya registrado" };
              case "auth/invalid-password":
                return { result: false, error: "Contraseña debil" };
              default:
                return { result: false, error: "Error al registrarse" }
            }
          }
          );
    })

  }

  enviarConfirmarCorreo(){
    console.log('email enviado');
    sendEmailVerification(this.userCredential);
  }

  confirmarCorreo(oobCode:string){
    return applyActionCode(this.auth,oobCode).then((resp) =>{
      Swal.fire({
        icon: 'success',
        title: 'Verificación exitosa!',
        text: 'Redirigiendo al inicio de sesion!',
        timer: 1500
      }).then(r => {               
          this.router.navigate(['/login']);          
      })

      this.usuariosService.getOne(this.auth.currentUser!.uid).then(user => {
        user.email_confirmado = true;
        user.fec_confirmacion = Timestamp.now();

        if(user.tipo !== 'Especialista')
          user.estado = EstadoUsuario.Habilitado;

        this.usuariosService.update(user);
      })   
    
    });
  }

  async IniciarSesion(email: string, password: string) {
    console.log('antes',this.auth.currentUser);
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return this.usuariosService.getOne(userCredential.user.uid).then(user => {
        if(user.email_confirmado)
        {
          if((user.tipo !== TipoUsuario.Especialista || (user.tipo === TipoUsuario.Especialista && user.estado === EstadoUsuario.Habilitado)))
          {
            this.usuarioLogueado = user;
            this.setUserToStorage();
  
            return { result: true, error: "" };
          }else{
            return { result: false, error: "El usuario no esta habilitado" };
          }          
        }
        else{
          return { result: false, error: "Primero debe confirmar su correo electrónico" };
        }
      })

    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-email":
          return { result: false, error: "Correo electrónico o contraseña incorrecta" };
        default:
          return { result: false, error: "Error al iniciar sesion" };
      }
    }
  }

  async CerrarSesion() {
    try {
      await signOut(this.auth)
      this.usuarioLogueado = undefined
      this.deleteUserFromStorage();
      return { result: true, error: "" };
    } catch (error) {
      return { result: false, error: "Error al cerrar sesion" };
    }
  }

  getUserFromStorage() {
    if (this.usuarioLogueado === undefined) {
      try {
        const user = JSON.parse(localStorage.getItem('currentUser') || undefined!);
        if (user) {
          this.usuarioLogueado = <Usuario>user;
          this.onUserLogged.emit(this.usuarioLogueado);
        }
      }
      catch (e) {
        localStorage.removeItem('currentUser');
      }

    } else {
      this.onUserLogged.emit(this.usuarioLogueado);
    }
  }

  setUserToStorage() {
    localStorage.setItem('currentUser', JSON.stringify(this.usuarioLogueado));
    this.onUserLogged.emit(this.usuarioLogueado);
  }

  deleteUserFromStorage() {
    localStorage.removeItem('currentUser');
    this.onUserLogout.emit();
  }

}
