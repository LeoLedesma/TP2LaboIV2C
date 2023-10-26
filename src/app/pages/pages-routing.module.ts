import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../shared/error/error.component';

const routes: Routes = [

  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),pathMatch: 'full'  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('../auth/auth.module').then(m=>m.AuthModule)},    
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
 