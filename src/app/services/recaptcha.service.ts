import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
 
@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  frontKey:string = "6LdAQx0pAAAAACkpKdO258REcnasitegLb7PhyYU"
  constructor(private http: HttpClient) {
  }
  /*
  Modo de comunicación con el servidor asíncrono
  parametro token: string
  return Observable<any>
   */
  getTokenClientModule(token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    let values = {
      Secret: this.frontKey,
      response: token
    }

      return this.http.post<any>("https://www.google.com/recaptcha/api/siteverify",values,httpOptions)
        .pipe(
          map((response) => response),
          catchError((err) => {
            console.log('error caught in service')
            console.error(err);
            return throwError(err);
          })
        );
  }
}