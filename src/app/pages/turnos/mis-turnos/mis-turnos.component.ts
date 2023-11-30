import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { TipoUsuario } from 'src/app/enums/TipoUsuario.enum';
import { Turno } from 'src/app/models/turno';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
  animations: [trigger('flip2HorTop1', [
    transition('void => *', [
      style({
        transform: 'translateY(0) rotateX(0)',
        transformOrigin: '50% 0%',
      }),
      animate('500ms ease-out', style({
        transform: 'translateY(-100%) rotateX(-180deg)',
        transformOrigin: '50% 100%',
      })),
    ]),
  ]),]
})
export class MisTurnosComponent implements OnInit, OnDestroy {

  misTurnosSubs!: Subscription
  misTurnosArr: Turno[] = []
  misTurnosFiltered: Turno[] = []
  turnoSeleccionado: Turno | undefined

  filtro: string = ''
  animacionActiva:boolean = false;

  constructor(public auth: AuthService, private turnosService: TurnosService) {

  }

  toggleAnimation(){

    this.animacionActiva = !this.animacionActiva;
  }

  ngOnInit(): void {
    
    if (this.auth.usuarioLogueado?.tipo === TipoUsuario.Paciente) {
      this.misTurnosSubs = this.turnosService.obtenerTurnosPorPaciente(this.auth.usuarioLogueado!.id_user).subscribe(turnos => {
        turnos.forEach(turno => turno.fechaTurno = new Date((turno.fechaTurno as unknown as Timestamp).toMillis()))
        this.toggleAnimation();
        this.misTurnosArr = turnos;
      })
    }
    else if (this.auth.usuarioLogueado?.tipo === TipoUsuario.Especialista) {
      this.misTurnosSubs = this.turnosService.obtenerAllTurnosPorEspecialista(this.auth.usuarioLogueado!.id_user).subscribe(turnos => {
        turnos.forEach(turno => turno.fechaTurno = new Date((turno.fechaTurno as unknown as Timestamp).toMillis()))
        this.toggleAnimation();
        this.misTurnosArr = turnos;
      })
    }
    else {
      this.misTurnosSubs = this.turnosService.obtenerTurnos().subscribe(turnos => {
        turnos.forEach(turno => turno.fechaTurno = new Date((turno.fechaTurno as unknown as Timestamp).toMillis()))
        this.toggleAnimation();
        this.misTurnosArr = turnos;
      });
    }
  }

  ngOnDestroy(): void {
    this.misTurnosSubs?.unsubscribe();
  }

  buscar(input: string) {
    this.filtro = input;
  }

  onCompletarEncuesta(turno: Turno) {
    this.turnoSeleccionado = turno;
  }

}
