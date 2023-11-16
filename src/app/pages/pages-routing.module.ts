import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoUsuario } from '../enums/TipoUsuario.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { ErrorComponent } from '../shared/error/error.component';

const routes: Routes = [

  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [AuthGuard] },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule), canActivate: [AuthGuard] },
  { path: 'listados', loadChildren: () => import('./listados/listados.module').then(m => m.ListadosModule),canActivate:[RolesGuard], data: { role: [TipoUsuario.Administrador], redirect: '/' } },
  { path: 'turnos', loadChildren: () => import('./turnos/turnos.module').then(m => m.TurnosModule),canActivate:[RolesGuard], data: { role: [TipoUsuario.Paciente,TipoUsuario.Administrador,TipoUsuario.Especialista], redirect: '/' } },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule),canActivate:[RolesGuard], data: { role: [TipoUsuario.Paciente,TipoUsuario.Administrador,TipoUsuario.Especialista], redirect: '/' } },
  { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
