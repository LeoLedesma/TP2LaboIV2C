import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { paginas } from 'src/app/consts/enlaces.const';
import { TipoUsuario } from 'src/app/enums/TipoUsuario.enum';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuarioLogueado!: Usuario | undefined;
  mostrarLoader: boolean = false;
  mostrarLoaderSub!: Subscription;
  paginas: { nombre: string, path: string }[] = [{ nombre: "", path: "" }]

  constructor(private auth: AuthService, private router: Router, private loader: LoaderService) { }

  ngOnInit(): void {
    this.mostrarLoaderSub = this.loader.loaderState$.subscribe(state => this.mostrarLoader = state)


    this.auth.onUserLogged.subscribe(user => {
      this.usuarioLogueado = user;

      switch (user.tipo) {
        case TipoUsuario.Administrador:
          this.paginas = paginas.Administrador
          break;
        case TipoUsuario.Especialista:
          this.paginas = paginas.Especialista
          break;
        case TipoUsuario.Paciente:
          this.paginas = paginas.Paciente
          break;
      }
    });

    this.auth.onUserLogout.subscribe(e => {
      this.usuarioLogueado = undefined;
      this.paginas = [{ nombre: "", path: "" }]
    })

    this.auth.getUserFromStorage();
  }

  logout() {
    this.auth.CerrarSesion();
    this.usuarioLogueado = undefined;

    Swal.fire({
      icon: 'success',
      title: 'Cierre de sesion exitoso!',
      text: "Te esperamos pronto!",
    }).then(r => {
      this.router.navigate([""]);
    })
  }


}

