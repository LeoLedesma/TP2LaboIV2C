import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const apiPath = 'https://clientes.api.greenborn.com.ar/public-random-word?c=5&l=';

@Injectable({
  providedIn: 'root'
})
export class AhorcadoService { 

  constructor(private http: HttpClient) {}
  getWords() {        
    let large = Math.floor(Math.random() * (15 - 6 + 1) + 6);
    
    return this.http.get<string[]>(apiPath+large);
  }

}
