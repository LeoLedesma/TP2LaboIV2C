import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    RecaptchaModule,
    MatProgressSpinnerModule
  ],
  exports: [RegisterComponent]
})
export class RegisterModule { }
