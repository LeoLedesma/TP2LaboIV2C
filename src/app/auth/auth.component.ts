import { AfterContentInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario';


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
  registrarUsuarioForm!:FormGroup;
  mostrarSpinner:boolean = false;
  mostrarSpinnerSub!:Subscription;

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router, private fb:FormBuilder,private loader: LoaderService) { }
  ngOnInit() {
    this.mostrarSpinnerSub = this.loader.loaderState$.subscribe(state => this.mostrarSpinner = state)
   }
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
    this.loader.show()
   let usuario!:Usuario;
    this.auth.RegistrarUsuario(usuario,'').then(result => {
      this.loader.hide()
      if (result.result) {
        Swal.fire({
          icon:'success',
          title:'Registro exitoso!',        
          text: "Redirigiendo al inicio...",
          timer:1500  
        }).then(r=>{          
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
    this.loader.show()
    this.auth.IniciarSesion(this.email, this.password).then(result => {      
      this.loader.hide()
      if (result.result) {
        if(!registro)
        {
          Swal.fire({
            icon:'success',
            title:'Inicio de sesion exitoso!',                  
            text: "Redirigiendo al inicio...",
            timer:1500,
            didDestroy: () => { 
              this.limpiarFormulario();
              this.router.navigate(["home"]);}
            });
          
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
        this.limpiarFormulario();
      }      
    }
    );
  }

  limpiarFormulario() {
    this.email = "";
    this.password = "";
    this.username = "";
  }

  loginAdministrador(){
    this.email = "admin@admin.com"
    this.password = "administrador"
  }

  loginJuan(){
    this.email = "juan@juan.com"
    this.password = "juan1234"
  }
}
