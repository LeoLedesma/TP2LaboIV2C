import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'usuarios',loadChildren: ()=> import('./usuarios/usuarios.module').then(m=>m.UsuariosModule)},  //TODO Agregar guard de rol
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListadosRoutingModule { }
