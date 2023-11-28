import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialidad } from 'src/app/models/especialidad';
import { Usuario } from 'src/app/models/usuario';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { FilesService } from 'src/app/services/files.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-seleccionar-especialistas',
  templateUrl: './seleccionar-especialistas.component.html',
  styleUrls: ['./seleccionar-especialistas.component.scss']
})
export class SeleccionarEspecialistasComponent implements OnInit, OnDestroy {
  @Input() especialidad: string | undefined;
  @Input() input: string = '';
  @Output() onSelectEspecialista: EventEmitter<{especialista:Usuario,especialidad:string}> = new EventEmitter();

  especialistaSeleccionado!:Usuario;
  especialidadSeleccionada!:string;
  especialistas: Usuario[] = [];
  especialistasSrch: Usuario[] = [];
  especialistasSub!: Subscription
  isLoading:boolean = true;

  especialidadesArr:Especialidad[] = [];
  ngOnInit(): void {
    
    //recibo especialidad
    if (this.especialidad) {
      this.especialistasSub = this.usuarios.getEspecialistasByEspecialidad(this.especialidad).subscribe(especialistas => {
        this.especialistas = especialistas
        this.buscar('');
        this.isLoading = false;
      });
    } else {
      this.especialistasSub = this.usuarios.getEspecialistasHabilitados().subscribe(especialistas => {
        this.especialistas = especialistas
        this.buscar('');
        this.isLoading = false;
      });
    }
  }

  constructor(private usuarios: UsuariosService, private especialidades: EspecialidadesService, private files:FilesService) { }
  ngOnDestroy(): void {
    this.especialistasSub?.unsubscribe;
  }
  buscar(input: string = '') {    
    this.isLoading= true;
    this.especialistasSrch = this.especialistas.filter(especialista =>{ 
      return (especialista.apellido.toLowerCase() + ' ' +
      especialista.nombre.toLowerCase()).includes(input.toLowerCase())
    || (especialista.nombre.toLowerCase() + ' ' +
    especialista.apellido.toLowerCase()).includes(input.toLowerCase())
    })

    setTimeout(()=>this.isLoading = false,100)
  }

  selectEspecialista(especialista:Usuario){
    this.especialistaSeleccionado = especialista;
    this.especialidades.getEspecialidades(especialista.especialidades).then(especialidades => {
      this.especialidadesArr = especialidades;    
    })
  }

  selectEspecialidad(especialidad:string){
    this.especialidadSeleccionada = especialidad;   
    this.onSelectEspecialista.emit({especialista:this.especialistaSeleccionado,especialidad:this.especialidadSeleccionada});
  }

  getImagen(especialidad:string){
    return this.especialidadesArr.find(e=>e.nombre === especialidad)?.img || '/assets/img/especialidades.png';
  }
}

