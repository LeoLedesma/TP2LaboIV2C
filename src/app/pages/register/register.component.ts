import { Component, Input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from '../../services/usuarios-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registroForm!: FormGroup;
  tipo: string = '';
  @Input() formAdministrador: boolean = false;


  constructor(private formBuilder: FormBuilder, private auth: AuthService, private usuariosService: UsuariosService, private loader: LoaderService, private router: Router) { }

  ngOnInit() {

    this.registroForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(0), Validators.max(200)]],
      dni: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]],
      obraSocial: [''],
      especialidad: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      perfil: ['', Validators.required],
      perfil2: ['', ''],
    });

    this.registroForm.get('tipo')!.valueChanges.subscribe((value) => {
      this.updateValidators(value);
    });

    if (this.formAdministrador) {
      this.setAdministradorForm();

    }
  }

  get perfil2() {
    return this.registroForm.get('perfil2');
  }
  get perfil() {
    return this.registroForm.get('perfil');
  }

  setAdministradorForm() {
    this.registroForm.get('tipo')!.setValue('administrador');

  }


  updateValidators(tipo: string) {
    const obraSocialControl = this.registroForm.get('obraSocial');
    const especialidadControl = this.registroForm.get('especialidad');

    if (tipo === 'paciente') {
      obraSocialControl!.setValidators(Validators.required);
      especialidadControl!.clearValidators();
      this.perfil2!.setValidators(Validators.required);

    } else if (tipo === 'especialista') {
      obraSocialControl!.clearValidators();
      especialidadControl!.setValidators(Validators.required);
      this.perfil2!.clearValidators();
    } else if (tipo === 'administrador') {
      obraSocialControl!.clearValidators();
      especialidadControl!.clearValidators();
      this.perfil2!.clearValidators();
    }

    obraSocialControl!.updateValueAndValidity();
    especialidadControl!.updateValueAndValidity();
    this.perfil2!.updateValueAndValidity();
  }

  submitForm() {
    console.log(this.registroForm)
    if (this.registroForm.valid) {
      let usuario: Usuario;
      let contraseña = this.registroForm.get('password')!.value;
      if (this.registroForm.get('tipo')!.value === 'paciente') {
        usuario = new Usuario('', '',
          this.registroForm.get('email')!.value,
          this.registroForm.get('nombre')!.value,
          this.registroForm.get('apellido')!.value,
          this.registroForm.get('dni')!.value,
          this.registroForm.get('edad')!.value,
          [this.perfil?.value, this.perfil2?.value],
          this.registroForm.get('tipo')!.value,
          this.registroForm.get('obraSocial')!.value,
        )
      } else {
        usuario = new Usuario('', '',
          this.registroForm.get('email')!.value,
          this.registroForm.get('nombre')!.value,
          this.registroForm.get('apellido')!.value,
          this.registroForm.get('dni')!.value,
          this.registroForm.get('edad')!.value,
          [this.perfil?.value, this.perfil2?.value],
          this.registroForm.get('tipo')!.value,
          this.registroForm.get('especialidad')!.value,
        )
      }

      this.auth.RegistrarUsuario(usuario, contraseña).then(result => {
        this.loader.hide()
        if (result.result) {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso!',
            text: !this.formAdministrador ? "Redirigiendo al inicio..." : "Registro exitoso!",
            timer: 1500
          }).then(r => {
            if (!this.formAdministrador)
            {
              this.router.navigate(['/']);
            }
            else{
              this.auth.EnviarConfirmarCorreo()
            }

            this.limpiarFormulario();
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error en el registro!',
            text: result.error
          })
        }

      });
      return;
    }
  }

  handleFileInput(event: any, input: string) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64String = e.target.result;
      this.registroForm.get(input)?.setValue(base64String);
    };

    reader.readAsDataURL(file);
  }

  limpiarFormulario() {
    this.registroForm.reset();

    this.perfil?.setValue('');
    this.perfil2?.setValue('');
    this.registroForm.get('nombre')!.setValue('');
    this.registroForm.get('apellido')!.setValue('');
    this.registroForm.get('edad')!.setValue('');
    this.registroForm.get('dni')!.setValue('');
    this.registroForm.get('especialidad')!.setValue('');
    this.registroForm.get('email')!.setValue('');
    this.registroForm.get('password')!.setValue('');    
    this.registroForm.get('tipo')!.setValue('');

    if(this.formAdministrador)
    this.setAdministradorForm()

  }
}
