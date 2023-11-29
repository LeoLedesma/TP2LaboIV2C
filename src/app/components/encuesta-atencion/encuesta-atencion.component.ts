import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { Encuesta } from 'src/app/models/encuesta';
import { Turno } from 'src/app/models/turno';
import { EncuestasService } from 'src/app/services/encuestas.service';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta-atencion',
  templateUrl: './encuesta-atencion.component.html',
  styleUrls: ['./encuesta-atencion.component.scss'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
}]
})
export class EncuestaAtencionComponent implements OnInit {

  encuestaForm!: FormGroup;
  @Input() turno!:Turno 

  constructor(private fb: FormBuilder,private encuestasService:EncuestasService,private turnosService:TurnosService) {}

  ngOnInit(): void {
    this.encuestaForm = this.fb.group({
      comentario: [''],
      calificacion: [1, Validators.required],
      satisfaccion: ['',Validators.required],
      problemaResuelto: [false,Validators.required],
      recomendacion: ['',Validators.required],      
    });
  }

  enviarEncuesta() {    
    console.log(this.encuestaForm.value)
    if(this.encuestaForm.valid){
      let encuesta:Encuesta = new Encuesta('',this.turno.id,
                                          this.calificacionValue,
                                          this.encuestaForm.get('satisfaccion')?.value!,
                                          this.encuestaForm.get('problemaResuelto')?.value!,
                                          this.encuestaForm.get('recomendacion')?.value!,
                                          this.encuestaForm.get('comentario')?.value!)
      this.encuestasService.addOne(encuesta).then(()=>{

        this.turno.encuestaComplete = true;
        this.turnosService.update(this.turno).then(()=>{
          this.turno = undefined!
        Swal.fire('¡Gracias!', 'Encuesta enviada correctamente', 'success');
        })
      })
    }
  }

  get calificacionValue(){
    return this.calificacion!.value;  
  }

  get calificacion(){
    return this.encuestaForm.get('calificacion');  
  }

  setCalificacion(value:number){
    this.calificacion!.setValue(value);
  }

}
