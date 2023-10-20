import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReaccionComponent } from './reaccion.component';

const routes: Routes = [
  { path: '', component: ReaccionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReaccionRoutingModule { }
