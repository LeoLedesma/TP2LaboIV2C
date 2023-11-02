import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { UsuariosService } from './usuarios-service.service';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,sendEmailVerification, User } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioLogueado!: Usuario | undefined;
  onUserLogged: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  onUserLogout: EventEmitter<void> = new EventEmitter<void>();
  private userCredential!:User

  constructor(private usuariosService: UsuariosService, private auth: Auth) {
    this.getUserFromStorage()
  }

  async RegistrarUsuario(usuario: Usuario, password: string): Promise<{ result: boolean, error: string }> {
    usuario.fec_registro = Timestamp.now();
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
                return { result: false, error: "Email invalido" };
              case "auth/email-already-in-use":
                return { result: false, error: "Email ya registrado" };
              case "auth/invalid-password":
                return { result: false, error: "Contraseña debil" };
              default:
                return { result: false, error: "Error al registrarse" }
            }
          }
          );
    })

  }

  EnviarConfirmarCorreo(){
    sendEmailVerification(this.userCredential);
  }

  async IniciarSesion(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return this.usuariosService.getOne(userCredential.user.uid).then(user => {
        this.usuarioLogueado = user;
        this.setUserToStorage();
        return { result: true, error: "" };
      })

    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-email":
          return { result: false, error: "Email o contraseña incorrecta" };
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
