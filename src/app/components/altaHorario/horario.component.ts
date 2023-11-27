import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DiaSemana } from 'src/app/enums/DiaSemana.enum';
import { HorarioAtencion } from 'src/app/models/horarioAtencion';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit, OnChanges {

  diaSeleccionado: DiaSemana | null = null;
  duracionTurno: number = 0;
  horaInicio: number = 480;
  horaFin: number = 1080;
  horaInicioSeleccionada!: number;
  horaFinSeleccionada!: number;
  @Input() horarios!: HorarioAtencion[]
  @Input() horario!: HorarioAtencion | undefined
  @Output() onAddHorario: EventEmitter<HorarioAtencion> = new EventEmitter();
  @Output() onEditHorario: EventEmitter<HorarioAtencion> = new EventEmitter();
  
  ngOnInit() {
    if (this.horario) {
      this.diaSeleccionado = this.horario.dia;
      this.duracionTurno = this.horario.duracionTurno;
      this.horaInicioSeleccionada = this.horario.horaInicio;
      this.horaFinSeleccionada = this.horario.horaFin;

    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['horario'].currentValue !== changes['horario'].previousValue) {
      
        this.diaSeleccionado = this.horario?.dia!;
        this.duracionTurno = this.horario?.duracionTurno!;
        this.horaInicioSeleccionada = this.horario?.horaInicio!;
        this.horaFinSeleccionada = this.horario?.horaFin!;
      
    }

  }



  get DiaSemana(): typeof DiaSemana {
    return DiaSemana;
  }

  enviarHorario() {
    let newHorario: HorarioAtencion = new HorarioAtencion('', '',
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

  getPosiblesHorasInicio() {
    let horas = [];
    for (let i = this.horaInicio; i <= this.horaFin; i += this.duracionTurno) {
      horas.push(i);
    }
    return horas;
  }

  getPosiblesHorasFin() {
    let horas = [];
    for (let i = this.horaInicioSeleccionada + this.duracionTurno; i <= this.horaFin; i += this.duracionTurno) {
      horas.push(i);
    }
    return horas;
  }

  seleccionarDia(dia: DiaSemana) {
    if (this.diaSeleccionado != dia) {
      this.diaSeleccionado = dia;
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


}
