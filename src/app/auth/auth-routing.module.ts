import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AuthComponent } from './auth.component';

const routes: Routes = [  
  { path: '**', component: AuthComponent,canActivate:[AuthGuard]},    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
