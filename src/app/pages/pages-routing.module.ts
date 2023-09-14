import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuienSoyComponent } from './quien-soy/quien-soy.component';
import { ErrorComponent } from '../shared/error/error.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [   
      //{ path: '', component: HomeComponent},
      { path: 'quien-soy', component: QuienSoyComponent },      
      { path: '**', component: ErrorComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
