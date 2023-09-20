import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html', 
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  usuarioLogueado!: Usuario | undefined;
  constructor(private auth: AuthService,private router: Router){}
  
  ngOnInit(): void {
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
