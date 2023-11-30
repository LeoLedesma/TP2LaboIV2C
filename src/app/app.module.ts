import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaSettings, RecaptchaV3Module } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { StorageModule, getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { CaptchaValidatorDirective } from './directives/captcha-validator.directive';
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';



@NgModule({
  declarations: [
    AppComponent,    
    CaptchaValidatorDirective
  ],
  imports: [ 
    RecaptchaV3Module,       
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth(getApp())), 
    provideFirestore(() => getFirestore(getApp())),    
    provideStorage(() => getStorage(getApp())),
    StorageModule,
    BrowserModule,    
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: "6LdAQx0pAAAAACkpKdO258REcnasitegLb7PhyYU",
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: "6LfzXB0pAAAAADz_ML2ITHk1P49WfcoO4g6YC06M"
      } as RecaptchaSettings
    },
    provideAnimations(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
