import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DiaSemana } from 'src/app/enums/DiaSemana.enum';
import { HorarioAtencion } from 'src/app/models/horarioAtencion';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit, OnChanges {

  horariosDisponibles: { dia: DiaSemana, horarios: number[] }[] = []
  diaSeleccionado: DiaSemana | null = null;
  duraciones = [30, 35, 40, 45, 50, 55, 60]
  duracionTurno: number = 0;
  horaInicio: number = 480;
  horaFin: number = 1080;
  especialidadSeleccionada!: string
  horaInicioSeleccionada!: number;
  horaFinSeleccionada!: number;
  especialista!: Usuario
  @Input() horarios!: HorarioAtencion[]
  @Input() horario!: HorarioAtencion | undefined
  @Output() onAddHorario: EventEmitter<HorarioAtencion> = new EventEmitter();
  @Output() onEditHorario: EventEmitter<HorarioAtencion> = new EventEmitter();

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if (this.horario) {
      this.diaSeleccionado = this.horario.dia;
      this.duracionTurno = this.horario.duracionTurno;
      this.horaInicioSeleccionada = this.horario.horaInicio;
      this.horaFinSeleccionada = this.horario.horaFin;
      this.especialidadSeleccionada = this.horario.especialidad;
    }

    this.especialista = this.auth.usuarioLogueado!
    this.setDiasDisponibles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['horario']?.currentValue !== changes['horario']?.previousValue) {

      this.diaSeleccionado = this.horario?.dia!;
      this.duracionTurno = this.horario?.duracionTurno!;
      this.horaInicioSeleccionada = this.horario?.horaInicio!;
      this.horaFinSeleccionada = this.horario?.horaFin!;
      this.especialidadSeleccionada = this.horario?.especialidad!;
    }

  }

  get DiaSemana(): typeof DiaSemana {
    return DiaSemana;
  }

  setDiasDisponibles() {

    let horariosOcupados = this.horarios
    let horariosDisponibles: { dia: DiaSemana, horarios: number[] }[] = []

    let dias: { dia: DiaSemana, horarios: HorarioAtencion[] }[] = []
    for (let dia of this.arrayDiaSemana) {
      let horarios = horariosOcupados.filter(h => h.dia == dia)
      dias.push({ dia, horarios })
    }

    for (let dia of dias) {
      let minutos = this.horariosNumerico(dia.dia)

      for (let horario of dia.horarios) {

        minutos = minutos.filter(valor => valor <= horario.horaInicio || valor >= horario.horaFin)
      }

      horariosDisponibles.push({ dia: dia.dia, horarios: minutos })
    }

    this.horariosDisponibles = horariosDisponibles
  }

  getHorariosDisponibles(dia: DiaSemana) {
    return this.horariosDisponibles.filter(h => h.dia == dia)
  }

  getDisabledButton(dia: DiaSemana) {
    let horarios = this.getHorariosDisponibles(dia)[0]

    return horarios.horarios.some(h => {

      for (let duracion of this.duraciones) {
        return horarios.horarios.includes(h + duracion)
      }
      return false;
    })
  }

  enviarHorario() {
    let newHorario: HorarioAtencion = new HorarioAtencion('', '',
      this.especialidadSeleccionada,
      this.diaSeleccionado!,
      this.horaInicioSeleccionada,
      this.horaFinSeleccionada,
      this.duracionTurno)

    this.onAddHorario.emit(newHorario);
    this.duracionTurno = 0;
    this.diaSeleccionado = null;
    this.duracionTurno = 0;
    this.horaInicioSeleccionada = 0;
    this.horaFinSeleccionada = 0;

    this.limpiarFormulario()
  }

  editarHorario() {

    this.horario!.dia = this.diaSeleccionado!;
    this.horario!.horaInicio = this.horaInicioSeleccionada;
    this.horario!.horaFin = this.horaFinSeleccionada;
    this.horario!.duracionTurno = this.duracionTurno;

    this.onEditHorario.emit(this.horario);

    this.limpiarFormulario()

  }

  limpiarFormulario() {
    this.duracionTurno = 0;
    this.diaSeleccionado = null;
    this.duracionTurno = 0;
    this.horaInicioSeleccionada = 0;
    this.horaFinSeleccionada = 0;
    this.horario = undefined;
  }

  formatLabel(value: number): string {

    let horaStr = ''
    let minutosStr = ''

    let hora = Math.floor(value / 60);
    let minutos = value % 60;

    horaStr = hora < 10 ? '0' + hora : hora.toString();

    minutosStr = minutos < 10 ? '0' + minutos : minutos.toString();

    let retorno: string = horaStr + ":" + minutosStr;

    return `${retorno}`;
  }

  getPosiblesHorasInicio(dia?: DiaSemana) {
    let horas = [];
    let diaBusqueda = dia ? dia : this.diaSeleccionado!;
    let disponibles = this.getHorariosDisponibles(diaBusqueda!)[0].horarios

    for (let i = this.horaInicio; i <= this.horaFin; i += this.duracionTurno) {
      if (disponibles.includes(i) && disponibles.includes(i + this.duracionTurno)) {
        horas.push(i);
      }
    }
    return horas;
  }

  getPosiblesHorasFin() {
    let horas = [];
    let disponibles = this.getHorariosDisponibles(this.diaSeleccionado!)[0].horarios
    for (let i = this.horaInicioSeleccionada + this.duracionTurno; i <= this.horaFin; i += this.duracionTurno) {
      if (disponibles.includes(i)) {
        horas.push(i);
      } else {
        return horas;
      }

    }
    return horas;
  }

  seleccionarEspecialidad(especialidad: string) {
    if (especialidad != this.especialidadSeleccionada) {
      this.especialidadSeleccionada = especialidad;
      this.diaSeleccionado = null;
      this.horaFin = this.diaSeleccionado == DiaSemana.Sabado ? 840 : 1080;
      this.duracionTurno = 0;
      this.horaInicioSeleccionada = 0;
      this.horaFinSeleccionada = 0;
    }

  }

  seleccionarDia(dia: DiaSemana) {
    if (this.diaSeleccionado != dia) {
      this.diaSeleccionado = dia;
      this.horaFin = this.diaSeleccionado == DiaSemana.Sabado ? 840 : 1080;
      this.duracionTurno = 0;
      this.horaInicioSeleccionada = 0;
      this.horaFinSeleccionada = 0;
    }
  }

  seleccionarDuracion(duracion: number) {
    if (this.duracionTurno != duracion) {
      this.duracionTurno = duracion;
      this.horaInicioSeleccionada = 0;
      this.horaFinSeleccionada = 0;
    }
  }



  seleccionarHoraInicio(hora: number) {
    if (hora >= this.horaFinSeleccionada) {
      this.horaFinSeleccionada = 0;
    }
    this.horaInicioSeleccionada = hora;
  }

  seleccionarHoraFin(hora: number) {
    this.horaFinSeleccionada = hora;
  }

  arrayDiaSemana = Object.values(DiaSemana).filter(d => d !== 'Domingo');



  horariosNumerico(dia: DiaSemana) {
    let fin = dia == DiaSemana.Sabado ? 840 : 1080;

    return this.generarArrayEntreNumeros(480, fin)
  }

  generarArrayEntreNumeros(inicio: number, fin: number) {
    let arrayNumeros = [];

    for (let i = inicio; i <= fin; i++) {
      arrayNumeros.push(i);
    }

    return arrayNumeros;
  }
}
