import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../shared/error/error.component';

const routes: Routes = [

  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),pathMatch: 'full'  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m=>m.AuthModule)},  
  { path: 'quien-soy', loadChildren:()=> import('./quien-soy/quien-soy.module').then(m=>m.QuienSoyModule)},  
  { path: 'juegos', loadChildren:()=> import('./juegos/juegos.module').then(m=>m.JuegosModule)},
  { path: 'chat', loadChildren:()=> import('./chat/chat.module').then(m=>m.ChatModule)},
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
 