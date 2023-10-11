import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { QuestionsResponse } from '../models/questionsResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private API:string = "https://the-trivia-api.com/v2/questions";

  constructor(private http: HttpClient) { }

  getRandomQuestions(): Observable<QuestionsResponse[]>  {    
    return this.http.get<QuestionsResponse[]>(this.API)
  }
}
