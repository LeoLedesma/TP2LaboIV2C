import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HistoriaClinica, RegistroHistoria } from 'src/app/models/historiaClinica';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-historia-clinica',
  templateUrl: './generar-historia-clinica.component.html',
  styleUrls: ['./generar-historia-clinica.component.scss']
})
export class GenerarHistoriaClinicaComponent implements OnInit, OnChanges {

  form!: FormGroup;
  @Input() paciente!: Usuario;
  @Input() historiaClinica!: HistoriaClinica
  @Input() turno!:Turno
  @Output() onHistoriaGrabada = new EventEmitter<void>()
  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private historiaClinicaService: HistoriaClinicaService, private auth: AuthService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['paciente']?.currentValue !== changes['paciente']?.previousValue) {
      this.paciente = changes['paciente']?.currentValue;
    }

    if (changes['historiaClinica']?.currentValue !== changes['historiaClinica']?.previousValue) {
      this.historiaClinica = changes['historiaClinica']?.currentValue;
    }

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      peso: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)]),
      altura: new FormControl('', [Validators.required, Validators.min(0), Validators.max(3)]),
      temperatura: new FormControl('', [Validators.required, Validators.min(20), Validators.max(50)]),
      presionSistolica: new FormControl('', [Validators.required, Validators.min(0), Validators.max(30)]),
      presionDiastolica: new FormControl('', [Validators.required, Validators.min(0), Validators.max(30)]),
      claveValor: this.formBuilder.array([])
    });
  }
  agregarClaveValor(): void {

    this.getClaveValor.push(this.formBuilder.group({
      clave: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
    }));
    console.log(this.getClaveValor);
  }

  get getClaveValor() {
    return this.form.get('claveValor') as FormArray<FormGroup>;
  }

  eliminarClaveValor(indice: number): void {
    this.getClaveValor.removeAt(indice);
  }


  submit() {
    this.form.markAllAsTouched();
    this.getClaveValor.markAllAsTouched();
    console.log(this.getClaveValor.valid);
    let valuesForm = this.form.value;

    if (this.form.valid && this.claveValorValido) {

      const registro: RegistroHistoria = {
        fecha: new Date(),
        id_especialista: this.auth.usuarioLogueado?.id_user!,
        especialidad: this.turno.especialidad!,
        altura: this.altura!.value,
        peso: this.peso?.value,
        temperatura: this.temperatura?.value,
        presion: { diastolica: this.presionDiastolica!.value, sistolica: this.presionSistolica!.value },
        claveValor: valuesForm.claveValor
      }

      let respuesta: Promise<any>

      if (this.historiaClinica) {
        this.historiaClinica.registros.push(registro);
        respuesta = this.historiaClinicaService.update(this.historiaClinica);
      } else {
        let historia: HistoriaClinica = {
          id: '',
          id_paciente: this.paciente.id_user,
          registros: [registro]
        }
        respuesta = this.historiaClinicaService.add(historia);
      }

      respuesta.then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Historia Clinica',
          text: 'Historia Clinica guardada correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {          
        })
        this.limpiarFormulario()
      })
    }
  }

  get clavesValor() {
    return this.form.get('claveValor');
  }

  get altura() {
    return this.form.get('altura');
  }
  get peso() {
    return this.form.get('peso');
  }
  get temperatura() {
    return this.form.get('temperatura');
  }
  get presionSistolica() {
    return this.form.get('presionSistolica');
  }

  get presionDiastolica() {
    return this.form.get('presionDiastolica');
  }

  get claveValorValido() {
    return this.clavesValor?.valid;
  }

  limpiarFormulario(){
    this.form.reset();
    this.form.markAsUntouched();
    this.form.markAsPristine();
    this.getClaveValor.clear();    
    this.getClaveValor.markAsUntouched();
    this.getClaveValor.markAsPristine();
    this.getClaveValor.push(this.formBuilder.group({
      key: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    }));
    console.log(this.getClaveValor);
    this.historiaClinica = undefined!;
    this.paciente = undefined!;   
  }




}