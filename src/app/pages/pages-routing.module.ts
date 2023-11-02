import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../shared/error/error.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [

  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate:[AuthGuard]},
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule), canActivate:[AuthGuard] },
  {path: 'listados', loadChildren: () => import('./listados/listados.module').then(m => m.ListadosModule)},
  { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
