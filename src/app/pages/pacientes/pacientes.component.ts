import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { HistoriaClinica } from 'src/app/models/historiaClinica';
import { Usuario } from 'src/app/models/usuario';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  animations: [
    trigger('slideInFromBottom', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('500ms ease-out', style({ transform: 'translateY(0%)' })),
      ]),
    ]),,
  ],
})
export class PacientesComponent {
  constructor(private historiasService:HistoriaClinicaService){}

  filtro:string = ""
  pacienteSeleccionado!:Usuario
  historiaSeleccionada!:HistoriaClinica

  animacionActiva:boolean = false
  
  buscar(input: string) {
    this.filtro = input;
  }

  onHistoriaClinica(paciente:Usuario){
    this.historiasService.getByPaciente(paciente.id_user).then(historia => {

      this.historiaSeleccionada = historia;
      this.pacienteSeleccionado = paciente;
    })    
  }

  toggleAnimation() {
    this.animacionActiva = !this.animacionActiva;
  }
}
