import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-seleccionar-especialistas',
  templateUrl: './seleccionar-especialistas.component.html',
  styleUrls: ['./seleccionar-especialistas.component.scss']
})
export class SeleccionarEspecialistasComponent implements OnInit{
  especialistas:Usuario[] = [];
ngOnInit(): void {
  //recibo especialidad
  if(this.especialidad){
    this.usuarios.getEspecialistasByEspecialidad(this.especialidad);
  }else{
    //traigo especialistas
  }
}

constructor(private usuarios:UsuariosService){}

@Input() especialidad: string | undefined;

}
