import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from '../shared/error/error.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m=>m.AuthModule)},  
  { path: 'quien-soy', loadChildren:()=> import('./quien-soy/quien-soy.module').then(m=>m.QuienSoyModule)},  
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
