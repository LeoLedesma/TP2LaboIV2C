import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html', 
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  usuarioLogueado!: Usuario | undefined;
  mostrarLoader: boolean = false;
  mostrarLoaderSub!: Subscription;

  constructor(private auth: AuthService,private router: Router, private loader: LoaderService){}
  
  ngOnInit(): void {
    this. mostrarLoaderSub = this.loader.loaderState$.subscribe(state => this.mostrarLoader = state)
        
    this.auth.onUserLogged.subscribe(user=> {     
      this.usuarioLogueado=user;
    });

    this.auth.getUserFromStorage();    
  }

  logout(){
    this.auth.CerrarSesion();  
    this.usuarioLogueado=undefined;

    Swal.fire({
      icon:'success',
      title:'Cierre de sesion exitoso!',                  
      text: "Te esperamos pronto!",      
    }).then(r=>{     
      this.router.navigate([""]);
    })
  }
}
