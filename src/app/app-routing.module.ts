import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },   
  { path: '**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
