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
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit, OnDestroy {

  misTurnosSubs!: Subscription
  misTurnosArr: Turno[] = []
  misTurnosFiltered: Turno[] = []

  filtro: string = ''

  constructor(public auth: AuthService, private turnosService: TurnosService) {

  }

  ngOnInit(): void {

    if (this.auth.usuarioLogueado?.tipo === TipoUsuario.Paciente) {
      this.misTurnosSubs = this.turnosService.obtenerTurnosPorPaciente(this.auth.usuarioLogueado!.id_user).subscribe(turnos => {
        turnos.forEach(turno => turno.fechaTurno = new Date((turno.fechaTurno as unknown as Timestamp).toMillis()))

        this.misTurnosArr = turnos;
      })
    }
    else if (this.auth.usuarioLogueado?.tipo === TipoUsuario.Especialista) {
      this.misTurnosSubs = this.turnosService.obtenerAllTurnosPorEspecialista(this.auth.usuarioLogueado!.id_user).subscribe(turnos => {
        turnos.forEach(turno => turno.fechaTurno = new Date((turno.fechaTurno as unknown as Timestamp).toMillis()))

        this.misTurnosArr = turnos;
      })
    }
    else {
      this.misTurnosSubs = this.turnosService.obtenerTurnos().subscribe(turnos => {
        turnos.forEach(turno => turno.fechaTurno = new Date((turno.fechaTurno as unknown as Timestamp).toMillis()))

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

}
