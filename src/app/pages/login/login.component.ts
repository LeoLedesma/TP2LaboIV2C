import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UsuariosService } from 'src/app/services/usuarios-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private auth:AuthService,private loader: LoaderService,private router:Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],      
    });
  }

  submitForm() {
    this.loader.show()
    this.auth.IniciarSesion( this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(result => {      
      this.loader.hide()
      if (result.result) {
        
          Swal.fire({
            icon:'success',
            title:'Inicio de sesion exitoso!',                  
            text: "Redirigiendo al inicio...",
            timer:1500,
            didDestroy: () => { 
              this.limpiarFormulario();
              this.router.navigate(["home"]);}
            });       
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
    this.loginForm.get('email')?.setValue('');
    this.loginForm.get('password')?.setValue('');
  }

  loginAdministrador(){
    this.loginForm.get('email')?.setValue('admin@admin.com');    
    this.loginForm.get('password')?.setValue('123456');    
  }

  loginJuan(){
    this.loginForm.get('email')?.setValue('juan@juan.com');
    this.loginForm.get('password')?.setValue("juan1234");
  }
}
