import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  usuarioLogueado!: Usuario | undefined;
  constructor(private auth: AuthService,private router: Router){}
  
  ngOnInit(): void {
    this.auth.onUserLogged.subscribe(user=> {     
      this.usuarioLogueado=user;
    });
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
