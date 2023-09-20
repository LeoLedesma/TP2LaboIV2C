import { AfterContentInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnChanges {
  @ViewChild('contElement') contElement!: ElementRef;
  modo: string = "login";
  email: string = "";
  username:string = "";
  password: string = "";

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) { }
  ngOnInit() { }
  ngOnChanges(changes: SimpleChanges) { }

  ngAfterViewChecked() {
    let modoTemp = this.route.routeConfig?.path || '';
    modoTemp = modoTemp === '**' ? this.modo : modoTemp;
    if (modoTemp !== this.modo) {
      this.modo = modoTemp;
      this.toggleSignupClass();
    }
  }

  toggleSignupClass() {
    this.contElement.nativeElement.classList.toggle('s--signup');
  }

  registrarUsuario() {
   
    this.auth.RegistrarUsuario(this.email,this.username, this.password).then(result => {
      if (result.result) {
        Swal.fire({
          icon:'success',
          title:'Registro exitoso!',        
          text: "Redirigiendo al inicio...",
          timer:1500  
        }).then(result=>{          
          this.iniciarSesion(true);          
          this.limpiarFormulario();
        })        
      } else {
        Swal.fire({
          icon:'error',
          title:'Error en el registro!',        
          text:result.error
        })     
        this.limpiarFormulario();          
      }
     
    });
  }

  iniciarSesion(registro:boolean = false) {
    this.auth.IniciarSesion(this.email, this.password).then(result => {      
      if (result.result) {
        if(!registro)
        {
          Swal.fire({
            icon:'success',
            title:'Inicio de sesion exitoso!',                  
            text: "Redirigiendo al inicio...",
            timer:1500
          }).then(result=>{
            this.limpiarFormulario();
            
          })
        }else{
          this.router.navigate(["home"]);
        }
      }else
      {
        Swal.fire({
          icon:'error',
          title:'Error en el inicio de sesion!',        
          text:result.error
        })
      }      
    }
    );
  }

  limpiarFormulario() {
    this.email = "";
    this.password = "";
    this.username = "";
  }
}
