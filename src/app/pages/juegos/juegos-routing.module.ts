import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./mayoromenor/mayoromenor.module').then(m => m.MayoromenorModule) },
  { path: 'mayormenor', loadChildren: () => import('./mayoromenor/mayoromenor.module').then(m => m.MayoromenorModule) },
  { path: 'ahorcado', loadChildren: () => import('./ahorcado/ahorcado.module').then(m => m.AhorcadoModule) },
  { path: 'preguntados', loadChildren: () => import('./preguntados/preguntados.module').then(m => m.PreguntadosModule) }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
