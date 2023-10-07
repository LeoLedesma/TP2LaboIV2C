import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { AhorcadoService } from 'src/app/services/ahorcado.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit,OnDestroy {

  private timerSubscription!: Subscription;
  public totalSeconds: number = 0;
  word: string = '';
  words: string[] = [];
  guesses: string[] = [];
  restartGameBtnShown = false;
  
  constructor(private hangmanService: AhorcadoService) { }
  ngOnDestroy(): void {
    if(this.timerSubscription)
    {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.hangmanService.getWords().subscribe((response) => {            
      this.words = response.map((word) => word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());            
      this.pickNewWord();
    });
  }

  guess(letter: string) {    
    
    if(this.guesses.length==0)
    {
      this.startTimer();          
    }

    if (!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [...this.guesses, letter];
  }

  reset() {    
    this.resetTimer();
    this.words.splice(this.words.indexOf(this.word), 1);
    this.pickNewWord();
    this.restartGameBtnShown = false;
  }

  pickNewWord() {        
    const randomIndex = Math.floor(Math.random() * this.words.length);    
    this.word = this.words[randomIndex];   
    this.guesses = [];
  }

  onGameFinished() {
    if(this.timerSubscription)    
      this.timerSubscription.unsubscribe();
    
    this.restartGameBtnShown = true;
  }

  startTimer(){    
    this.timerSubscription = interval(1000).subscribe(() => {
      this.totalSeconds++;
    });
  }

  resetTimer(){
    if(this.timerSubscription)    
    this.timerSubscription.unsubscribe();

    this.totalSeconds = 0;    
  }

  getMinutes(): string {
    let value = Math.floor(this.totalSeconds / 60);
    return value < 10 ? '0' + value : value.toString();
  }

  getSeconds(): string {
    let value = this.totalSeconds % 60
    return value < 10 ? '0' + value : value.toString();
  }

}
