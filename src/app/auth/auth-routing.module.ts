import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [  
  { path: 'login', component: AuthComponent,canActivate:[AuthGuard]},  
  { path: 'register', component: AuthComponent,canActivate:[AuthGuard]},  
  { path: '**', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
