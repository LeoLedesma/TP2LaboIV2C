import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TipoUsuario } from '../../enums/TipoUsuario.enum';


@Component({
  selector: 'app-accesos-rapido',
  templateUrl: './accesos-rapido.component.html',
  styleUrls: ['./accesos-rapido.component.scss']
})
export class AccesosRapidoComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<AccesosRapidoComponent>) {}

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
    tipo: TipoUsuario.Especialista,
    email: 'alt.jq-cobdpdqf@yopmail.com',
    nombreCompleto: 'Ernesto Martinez',
    contraseña: '12345678',    
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

  openLink(event: any): void {
    this._bottomSheetRef.dismiss(event);
    this._bottomSheetRef.backdropClick();
  }
}
