import { Component, EventEmitter, Output } from '@angular/core';
import { TipoUsuario } from '../../enums/TipoUsuario.enum';


@Component({
  selector: 'app-accesos-rapido',
  templateUrl: './accesos-rapido.component.html',
  styleUrls: ['./accesos-rapido.component.scss']
})
export class AccesosRapidoComponent {
@Output() onClick = new EventEmitter<{tipo:TipoUsuario,email:string,nombreCompleto:string,contraseña:string}>()
  constructor() {}

  usuarios:{tipo:TipoUsuario,email:string,nombreCompleto:string,contraseña:string}[] = 
  [{
    tipo: TipoUsuario.Administrador,
    email: 'admin@admin.com',
    nombreCompleto: 'Juan Perez',
    contraseña: '123456',    
  },
  {
    tipo: TipoUsuario.Paciente,
    email: 'leofledesma@gmail.com',
    nombreCompleto: 'Leonel Franco Ledesma',
    contraseña: '123456',    
  },
  {
    tipo: TipoUsuario.Paciente,
    email: 'gouleitreddaullu-5451@yopmail.com',
    nombreCompleto: 'Hernan Caceres',
    contraseña: '123456',    
  },
  {
    tipo: TipoUsuario.Paciente,
    email: 'gouleitreddaullu-5456@upc.infos.st',
    nombreCompleto: 'Micaela Sch',
    contraseña: '123456',    
  },  
  {
    tipo: TipoUsuario.Especialista,
    email: 'alt.jq-cobdpdqf@yopmail.com',
    nombreCompleto: 'Ernesto Martinez',
    contraseña: '12345678',    
  },
  {
    tipo: TipoUsuario.Especialista,
    email: 'alt.fu-5ol85thk@yopmail.com',
    nombreCompleto: 'Mario Perez',
    contraseña: '123456',    
  }]

  getImagen(tipo:TipoUsuario){

    switch(tipo){
      case TipoUsuario.Administrador:
        return 'assets/img/administrador.png';
      case TipoUsuario.Especialista:
        return 'assets/img/especialista.png';
      case TipoUsuario.Paciente:
        return 'assets/img/paciente.png';
      default:
        return 'assets/images/admin.png';    
    }
  }

  openLink(event: {tipo:TipoUsuario,email:string,nombreCompleto:string,contraseña:string}): void {
    this.onClick.emit(event)
  }
}
