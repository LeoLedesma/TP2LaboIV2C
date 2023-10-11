import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerComponent } from 'src/app/components/timer/timer.component';
import { AhorcadoService } from 'src/app/services/ahorcado.service';
import { PuntuacionService } from '../../../services/puntuacion.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit, OnDestroy {
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  private timerSubscription!: Subscription;
  puntos: number = 0;  
  word: string = '';
  words: string[] = [];
  guesses: string[] = [];
  restartGameBtnShown = false;
  time: number = 0;

  constructor(private hangmanService: AhorcadoService,private puntuacion:PuntuacionService) { }
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.pickNewWord();
  }


  guess(obj: { keyValue: string, score: number }) {
    let letter = obj.keyValue;
    this.puntos = obj.score;

    if (this.guesses.length == 0) {
      this.timerComponent.startTimer();      
    }

    if (!letter || this.guesses.includes(letter)) {
      return;
    }

    this.guesses = [...this.guesses, letter];
  }

  reset() {
    this.timerComponent.resetTimer();
    this.words.splice(this.words.indexOf(this.word), 1);
    this.pickNewWord();
    this.restartGameBtnShown = false;
  }

  pickNewWord() {
    this.hangmanService.getWords().subscribe((response) => {
      this.words = response.map((word) => word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.puntos = 0;
      this.word = this.words[randomIndex];
      this.guesses = [];      
    });   
  }

  onGameFinished(win: boolean) {
    this.time = this.timerComponent.stopTimer();
    

    if(win)    
    {
      this.calculatePoints()
      this.puntuacion.saveScore("Ahorcado",this.puntos,this.word)    
    }else{
      this.puntos = 0;
    }
      

    this.restartGameBtnShown = true;
  }

  calculatePoints(){
    if(this.puntos>0)    
    this.puntos = parseInt((this.puntos * (this.word.length*20)/this.time).toFixed(0));
    console.log(this.puntos);
    return 0
  }
}
