import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoTurno } from '../../../models/turno';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.scss']
})
export class SolicitarComponent implements OnInit{

  form!:FormGroup
  
  constructor(){}

  ngOnInit() {

    this.form = new FormGroup({
      tipoBusqueda: new FormControl('', Validators.required),
      tipoTurno: new FormControl('', Validators.required),
      especialista: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
      paciente: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]+$')]),
      dia: new FormControl('', [Validators.required, Validators.min(0), Validators.max(200)]),
      horario: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]),      
      especialidad: new FormControl(''),      
    });

    this.tipoBusqueda?.valueChanges.subscribe((value) => {
      
    });
  }

  submitForm()
  {}


  get tipoBusqueda () { return this.form.get('tipoBusqueda')!}; 
  get tipoTurno () { return this.form.get('tipoTurno')!};
  get especialista () { return this.form.get('especialista')!};
  get paciente () { return this.form.get('paciente')!};
  get dia () { return this.form.get('dia')!};
  get horario () { return this.form.get('horario')!};
  get especialidad () { return this.form.get('especialidad')!};
  

  onTipoBusquedaClick(tipo:string){
    this.tipoBusqueda?.setValue(tipo);
  }

  onTipoTurnoClick(tipo:TipoTurno){

  }

  public get TipoTurno(): typeof TipoTurno {
    return TipoTurno;
  }

  


  

}
