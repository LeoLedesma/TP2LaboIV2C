import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ahorcado-vidas',
  templateUrl: './ahorcado-vidas.component.html',
  styleUrls: ['./ahorcado-vidas.component.scss']
})
export class AhorcadoVidasComponent implements OnInit, OnChanges {
  @Input() guesses: string[] = [];
  @Input() word: string = '';
  @Output() gameFinished = new EventEmitter<boolean>();
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
      this.mistakesRemaining = this.MAX_MISTAKES;
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
    this.mistakesRemaining -= this.wasGuessAMistake(letter);
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
        return 0;
      }
    }
    return 1;
  }

  get mistakeArray(): any[] {
    return new Array(this.mistakesRemaining);
  }

  ngOnInit(): void {}
}