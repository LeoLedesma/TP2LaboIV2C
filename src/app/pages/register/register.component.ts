import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { TipoUsuario } from 'src/app/enums/TipoUsuario.enum';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { FilesService } from 'src/app/services/files.service';
import { LoaderService } from 'src/app/services/loader.service';
import { RecaptchaService } from 'src/app/services/recaptcha.service';
import { confirmarContraseñaValidator } from 'src/app/validators/contraseña.validator';
import Swal from 'sweetalert2';
import { recaptcha } from '../../../environments/environment';
import { EspecialidadesService } from '../../services/especialidades.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLoadingCaptcha = true;
  registroForm!: FormGroup;
  tipo: string = '';
  titulo: string = 'Registro'
  @Input() formAdministrador: boolean = false;
  especialidades: string[] = [];
  especialidadesSub!: Subscription
  resultOfCaptchaFromUser!: number;
  num1 = Math.floor(Math.random() * 10);
  num2 = Math.floor(Math.random() * 10);
  result = this.num1 + this.num2;
  captchaValid: boolean = false;
  captchaValidated: boolean = false;
  images: any[] = []

  public robot: boolean = true;
  public presionado: boolean = false;
  siteKey = recaptcha.recaptcha.secret
  constructor(private filesService: FilesService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private usuariosService: UsuariosService,
    private loader: LoaderService,
    private router: Router,
    private especialidadesService: EspecialidadesService,
    private recaptchaService: RecaptchaService,
    private recaptchaV3Service: ReCaptchaV3Service) { }

  ngOnInit() {

    this.registroForm = new FormGroup({
      tipo: new FormControl('', Validators.required),
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
      edad: new FormControl('', [Validators.required, Validators.min(0), Validators.max(200)]),
      dni: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]),
      obraSocial: new FormControl(''),
      especialidad: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(6)]),
      perfil: new FormControl('', [Validators.required, Validators.nullValidator]),
      perfil2: new FormControl(''),
      recaptchaReactive: new FormControl(null, Validators.required),
    }, confirmarContraseñaValidator());

    this.tipoUsuario?.valueChanges.subscribe((value) => {
      this.updateValidators(value);
    });

    if (this.formAdministrador) {
      this.setAdministradorForm();
      this.titulo += ' de Administrador'
    }

    this.especialidadesSub = this.especialidadesService.getAll().subscribe(especialidades => {
      this.especialidades = especialidades.map(especialidad => especialidad.nombre);
    })

  }



  get recaptchaReactive() {
    return this.registroForm.get('recaptchaReactive')
  }


  get perfil2() {
    return this.registroForm.get('perfil2');
  }
  get perfil() {
    return this.registroForm.get('perfil');
  }

  get password() {
    return this.registroForm.get('password');
  }
  get password2() {
    return this.registroForm.get('password2');
  }
  get email() {
    return this.registroForm.get('email');
  }
  get nombre() {
    return this.registroForm.get('nombre');
  }
  get apellido() {
    return this.registroForm.get('apellido');
  }
  get tipoUsuario() {
    return this.registroForm.get('tipo');
  }
  get edad() {
    return this.registroForm.get('edad');
  }
  get dni() {
    return this.registroForm.get('dni');
  }
  get obraSocial() {
    return this.registroForm.get('obraSocial');
  }
  get especialidad() {
    return this.registroForm.get('especialidad');
  }

  setAdministradorForm() {
    this.tipoUsuario?.setValue('Administrador');
  }

  updateValidators(tipo: string) {
    this.registroForm?.markAsUntouched();
    if (tipo === TipoUsuario.Paciente) {
      this.obraSocial?.setValidators(Validators.required);
      this.especialidad?.clearValidators();
      this.perfil2?.setValidators(Validators.required);
      this.especialidad?.setValue('');

    } else if (tipo === TipoUsuario.Especialista) {
      this.obraSocial?.clearValidators();
      this.obraSocial?.setValue('')
      this.especialidad?.setValidators(Validators.required);
      this.perfil2?.clearValidators();
    } else if (tipo === TipoUsuario.Administrador) {
      this.obraSocial?.clearValidators();
      this.especialidad?.clearValidators();
      this.obraSocial?.setValue('')
      this.especialidad?.setValue('');
      this.perfil2?.clearValidators();
    }

    this.obraSocial?.updateValueAndValidity();
    this.especialidad?.updateValueAndValidity();
    this.perfil2?.updateValueAndValidity();
  }

  submitForm() {
    this.registroForm.markAllAsTouched();
    if (this.registroForm.valid && this.validateCaptcha()) {
      this.loader.show();
      let contraseña = this.password?.value
      let usuario = this.armarUsuario();

      this.auth.RegistrarUsuario(usuario, contraseña, this.images).then(result => {
        console.log(result);
        this.registroExistoso(result);
        this.loader.hide()
      }).catch((err) => { this.loader.hide(); console.log(err) });
    }
  }

  armarUsuario() {
    let usuario: Usuario;

    if (this.tipoUsuario?.value === TipoUsuario.Paciente) {
      usuario = new Usuario('', '',
        this.email?.value,
        this.nombre?.value,
        this.apellido?.value,
        this.dni?.value,
        this.edad?.value,
        [],
        this.tipoUsuario?.value,
        this.obraSocial?.value,
      )
    } else {
      usuario = new Usuario('', '',
        this.email?.value,
        this.nombre?.value,
        this.apellido?.value,
        this.dni?.value,
        this.edad?.value,
        [],
        this.tipoUsuario?.value,
        '',
        this.especialidad?.value,
      )
    }

    return usuario;
  }

  registroExistoso(result: { result: boolean, error: string }) {
    if (result.result) {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso!',
        text: !this.formAdministrador ? "Redirigiendo al inicio..." : "Registro exitoso!",
        timer: 1500
      }).then(r => {
        this.auth.enviarConfirmarCorreo()
        if (!this.formAdministrador) {
          this.router.navigate(['/']);
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
  }

  async addEspecialidad() {
    let especialidad: string = '';
    const inputValue = especialidad;
    const { value: especialidadInput } = await Swal.fire({
      title: "Nueva especialidad",
      input: "text",
      inputLabel: "Ingrese una nueva especialidad:",
      inputValue,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Cargar",
      inputValidator: (value) => {
        if (!value)
          return "Escribe algo!";

        if (this.especialidades.indexOf(value) !== -1)
          return 'La especialidad ya existe!'

        return ''
      }
    });
    if (especialidadInput) {
      this.especialidadesService.addOne(especialidadInput).then(() => {
        Swal.fire(`Nueva especialidad agregada: ${especialidadInput}`);
        this.especialidad?.setValue(especialidadInput);
      })
    }
  }

  limpiarFormulario() {
    this.registroForm.reset();

    this.perfil?.setValue('');
    this.perfil2?.setValue('');
    this.nombre?.setValue('');
    this.apellido?.setValue('');
    this.edad?.setValue('');
    this.dni?.setValue('');
    this.especialidad?.setValue('');
    this.email?.setValue('');
    this.password?.setValue('');
    this.tipoUsuario?.setValue('');
    this.obraSocial?.setValue('');

    if (this.formAdministrador)
      this.setAdministradorForm()
  }

  public get TipoUsuario(): typeof TipoUsuario {
    return TipoUsuario;
  }

  validateCaptcha() {
    const expectedCaptchaResult = this.result;
    this.captchaValidated = true
    if (Number(this.resultOfCaptchaFromUser) === expectedCaptchaResult) {
      this.captchaValid = true;
    } else {
      this.captchaValid = false;
    }
    return this.captchaValid;
  }

  handleFileInput($event: any, input: string) {
    const files = Array.from($event.target.files);
    this.images.push(...files);
    this.registroForm.get(input)?.setValue(files);
    // this.filesService.saveImage(Array.from($event.target.files),',123')
    console.log(this.images)
  }

  resolved(captchaResponse: string) {
    this.recaptchaReactive?.setValue('boo');
  }
}

