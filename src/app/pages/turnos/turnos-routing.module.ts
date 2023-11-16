import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoUsuario } from 'src/app/enums/TipoUsuario.enum';
import { RolesGuard } from 'src/app/guards/roles.guard';

const routes: Routes = [
  { path: 'misturnos', loadChildren: () => import('./mis-turnos/mis-turnos.module').then(m => m.MisTurnosModule),canActivate:[RolesGuard], data: { role: [TipoUsuario.Paciente,TipoUsuario.Especialista], redirect: '/'  }},
  { path: 'solicitar', loadChildren: () => import('./solicitar/solicitar.module').then(m => m.SolicitarModule),canActivate:[RolesGuard], data: { role: [TipoUsuario.Paciente,TipoUsuario.Administrador], redirect: '/'  }},
  { path: '**', redirectTo: 'misTurnos' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
