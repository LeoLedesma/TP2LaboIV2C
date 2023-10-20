import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { LifesComponent } from '../../lifes/lifes.component';

@Component({
  selector: 'app-ahorcado-vidas',
  templateUrl: './ahorcado-vidas.component.html',
  styleUrls: ['./ahorcado-vidas.component.scss']
})
export class AhorcadoVidasComponent implements OnInit, OnChanges {
  @Input() guesses: string[] = [];
  @Input() word: string = '';
  @Output() gameFinished = new EventEmitter<boolean>();
  @ViewChild(LifesComponent) lifes!: LifesComponent;
  MAX_MISTAKES = 7;
  mistakesRemaining;
  success: boolean = false;

  constructor() {
    this.mistakesRemaining = this.MAX_MISTAKES;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.['word']?.currentValue &&
      changes?.['word'].currentValue !== changes?.['word'].previousValue
    ) {
      this.lifes.restartMistakesRemaining();
      this.success = false;
    }
    const guessesCurrentValue = changes?.['guesses']?.currentValue;
    if (
      guessesCurrentValue &&
      guessesCurrentValue.length &&
      guessesCurrentValue !== changes['guesses'].previousValue
    ) {
      const char = [...guessesCurrentValue].pop();
      this.checkGuess(char);
    }
  }

  checkGuess(letter: string) {
    let didWin = true;
    
    this.lifes.decreaseMistakesRemaining(this.wasGuessAMistake(letter));
    this.mistakesRemaining = this.lifes.mistakesRemaining;
    
    for (let i = 0; i < this.word.length; i++) {
      if (
        !this.guesses.find(
          (guess) => guess.toLowerCase() === this.word[i].toLowerCase()
        )
      ) {
        didWin = false;
        break;
      }
    }
    this.success = didWin;
    if (this.success || this.mistakesRemaining === 0) {
      this.gameFinished.emit(this.success);
    }
  }

  wasGuessAMistake(letter: string) {
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i].toLowerCase() === letter.toLowerCase()) {
        return false;
      }
    }
    return true
  }

 

  ngOnInit(): void {}
}