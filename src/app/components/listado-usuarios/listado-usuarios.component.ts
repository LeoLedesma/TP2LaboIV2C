import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { ExportsService } from 'src/app/services/exports.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  turnosSub!: Subscription
  turnosArr: Turno[] = []
  pacientesSub!: Subscription
  @Input() personasArr: Usuario[] = []
  personasShow: Usuario[] = []
  isLoading: boolean = false


  @Input() filtro: string = ""
  @Output() onHistoriaClinica = new EventEmitter<Usuario>()
  ngOnInit(): void {
    this.isLoading = true

    // this.obtenerPacientes()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filtro']?.currentValue !== changes['filtro']?.previousValue) {
      this.filtrarPersonas()
    }

    if (changes['personasArr']?.currentValue !== changes['personasArr']?.previousValue) {
      this.personasArr = changes['personasArr']?.currentValue || []
    }
  }

  constructor(private exports:ExportsService){}

  filtrarPersonas() {

    let filtro = this.filtro.toLowerCase() || '';
    this.personasShow = this.personasArr;

    if (filtro.length > 0) {
      this.personasShow = this.personasArr.filter(p => p.nombre.toLowerCase().includes(filtro))
    } else {
      this.personasShow = this.personasArr
    }

    return this.personasShow
  }

  exportarDatos(persona: Usuario) {
    let datos = [{ email: persona.email, nombre: persona.nombre, apellido: persona.apellido, documento: persona.documento, edad: persona.edad, tipo: persona.tipo}]
    
    this.exports.generarExcel(datos, 'datos_personales.xlsx')
  }
}
