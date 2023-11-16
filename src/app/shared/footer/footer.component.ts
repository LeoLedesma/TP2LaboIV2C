import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { paginas } from 'src/app/consts/enlaces.const';
import { TipoUsuario } from 'src/app/enums/TipoUsuario.enum';
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
  paginas: {nombre:string,path:string}[] = [{nombre:"",path:""}]
  constructor(private auth: AuthService,private router: Router){}
  
  ngOnInit(): void {
    this.auth.onUserLogged.subscribe(user=> {     
      this.usuarioLogueado=user;

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

    this.auth.onUserLogout.subscribe(e =>{
      this.usuarioLogueado=undefined;
      this.paginas = [{nombre:"",path:""}]
    })

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
