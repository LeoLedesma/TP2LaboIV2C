import { Component, OnDestroy, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DiaSemana } from 'src/app/enums/DiaSemana.enum';
import { TipoUsuario } from 'src/app/enums/TipoUsuario.enum';
import { HoraMinutos, HorarioAtencion } from 'src/app/models/horarioAtencion';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';
import { EstadoTurno, TipoTurno, Turno } from '../../../models/turno';
import { HorariosService } from '../../../services/horarios.service';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.scss']
})
export class SolicitarComponent implements OnInit, OnDestroy {

  form!: FormGroup
  arrayDiaSemana = Object.values(DiaSemana)
  turnosPosibles: Date[] = []  
  horariosPorDia:{fecha:Date, horarios:Date[]}[] = []
  turnosSub!: Subscription

  constructor(private horariosService: HorariosService, private turnosService: TurnosService,private auth:AuthService) { }
  ngOnDestroy(): void {
    this.turnosSub?.unsubscribe()
  }

  ngOnInit() {

    this.form = new FormGroup({
      tipoBusqueda: new FormControl('', [Validators.required]),            
      especialista: new FormControl('', [Validators.required]),
      paciente: new FormControl('', [Validators.required]),      
      horario: new FormControl('', [Validators.required]),
      especialidad: new FormControl('',[Validators.required]),
    });

    this.tipoBusqueda?.setValue('Especialista');

    if(this.auth.usuarioLogueado!.tipo == TipoUsuario.Paciente){
      this.paciente.setValue(this.auth.usuarioLogueado!.id_user)
    }

  }

  submitForm() {
    let turno = new Turno('',    
    this.especialidad.value,
    this.paciente.value,
    this.especialista.value,
    this.horario.value,
    EstadoTurno.Pendiente,'')    

    this.turnosService.reservarTurno(turno).then(result => {
      if(result)
      {
        Swal.fire({
          title: "Turno reservado",
          text: "Su turno ha sido reservado",
          icon: "success",
        });
      
      }else{
        Swal.fire({
          title: "Error",
          text: "No se pudo reservar su turno, es probable que alguien haya reservado el turno un instante antes.",
          icon: "error",
        });      
      }
      
    });
  }


  get tipoBusqueda() { return this.form.get('tipoBusqueda')! };  
  get especialista() { return this.form.get('especialista')! };
  get especialidad() { return this.form.get('especialidad')! };
  get paciente() { return this.form.get('paciente')! };  
  get horario() { return this.form.get('horario')! };

  public get TipoTurno(): typeof TipoTurno {
    return TipoTurno;
  }

  async buscarTurnos(busquedaTurno:{especialista: Usuario,especialidad:string}) {
    this.especialista.setValue(busquedaTurno.especialista.id_user)
    this.especialidad.setValue(busquedaTurno.especialidad)

    let horarios = await this.horariosService.obtenerHorariosEspecialistaPromise(busquedaTurno.especialista.id_user,busquedaTurno.especialidad)
    this.turnosSub = await this.turnosService.obtenerTurnosPorEspecialista(busquedaTurno.especialista.id_user)
      .subscribe(turnos => {
        let fecha = new Date()
        this.turnosPosibles = []

        for (let i = 0; i < 15; i++) {
          if (i != 0)
            fecha.setDate(fecha.getDate() + 1)  

          for (let horarioAtencion of horarios) {
            if (this.getDiaSemana(horarioAtencion.dia) == fecha.getDay()) {
              let horariosTurno = this.getHorarios(horarioAtencion);
              for (let horarioTurno of horariosTurno) {
                let fechaTurno = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), horarioTurno.hora, horarioTurno.minutos)
                this.turnosPosibles.push(fechaTurno);
              }

            }
          }
        }
        let arrayDeFechas = turnos.map(objeto => objeto.fechaTurno);
        
        this.turnosPosibles = this.turnosPosibles.filter(turno => {
          
          return !arrayDeFechas.some(eliminar => {
            let fechaCasteada = new Date((eliminar as unknown as Timestamp).toMillis())
            
            return fechaCasteada.getDate() === turno.getDate() 
            && fechaCasteada.getMonth() === turno.getMonth() 
            && fechaCasteada.getFullYear() === turno.getFullYear()
            && fechaCasteada.getHours() === turno.getHours()
            && fechaCasteada.getMinutes() === turno.getMinutes()
          })  
        });      

        this.horariosPorDia = this.agruparPosiblesPorDia(this.turnosPosibles)
        this.horariosPorDia
      }
      );
  }


  agruparPosiblesPorDia(posibles:Date[]){
    let horarios:{fecha:Date, horarios:Date[]}[] = []
    let fecha = new Date()
    for (let i = 0; i < 15; i++) {      
      fecha.setDate(fecha.getDate() + 1);
      let horariosTurno = posibles.filter(posible => posible.getDate() == fecha.getDate() && posible.getMonth() == fecha.getMonth() && posible.getFullYear() == fecha.getFullYear())
      horarios.push({fecha:new Date(fecha), horarios:horariosTurno})
    }

    horarios = horarios.filter(horario => horario.horarios.length > 0)


    return horarios;
  }

  getDiaSemana(dia: DiaSemana) {
    return this.arrayDiaSemana.indexOf(dia);
  }

  public getHorarios(horario: HorarioAtencion) {
    let horasMinutos: HoraMinutos[] = [];

    for (let tiempo = horario.horaInicio; tiempo <= horario.horaFin; tiempo += horario.duracionTurno) {

      let hora = Math.floor(tiempo / 60);
      let minutos = tiempo % 60;

      let horaMinutos: HoraMinutos = { hora: hora, minutos: minutos }

      horasMinutos.push(horaMinutos);
    }

    return horasMinutos;
  }

  turnoSeleccionado(turno:Date){
    this.horario.setValue(turno)  
  }

}
