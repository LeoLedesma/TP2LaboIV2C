import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MayoromenorComponent } from './mayoromenor.component';


const routes: Routes = [
  { path: '', component: MayoromenorComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MayoromenorRoutingModule { }
