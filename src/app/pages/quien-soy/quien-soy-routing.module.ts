import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuienSoyComponent } from './quien-soy.component';

const routes: Routes = [
  { path: '', component: QuienSoyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuienSoyRoutingModule { }
