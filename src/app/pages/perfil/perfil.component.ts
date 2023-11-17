import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{

  usuario!:Usuario
  constructor(private auth:AuthService){}
  ngOnInit(): void {
    this.usuario = this.auth.usuarioLogueado!;
    console.log(this.usuario.fotos);
  }

}
