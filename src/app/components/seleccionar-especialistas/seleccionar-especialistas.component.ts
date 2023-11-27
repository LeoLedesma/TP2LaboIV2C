import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-seleccionar-especialistas',
  templateUrl: './seleccionar-especialistas.component.html',
  styleUrls: ['./seleccionar-especialistas.component.scss']
})
export class SeleccionarEspecialistasComponent implements OnInit, OnDestroy {
  @Input() especialidad: string | undefined;
  @Input() input: string = '';
  @Output() onSelectEspecialista: EventEmitter<Usuario> = new EventEmitter();

  especialistaSeleccionado!:Usuario;
  especialistas: Usuario[] = [];
  especialistasSrch: Usuario[] = [];
  especialistasSub!: Subscription
  isLoading:boolean = true;
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

  constructor(private usuarios: UsuariosService, private especialidades: EspecialidadesService) { }
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
    this.onSelectEspecialista.emit(especialista);
  }
}

