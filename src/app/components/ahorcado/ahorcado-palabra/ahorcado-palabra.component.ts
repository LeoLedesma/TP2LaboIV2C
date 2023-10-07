import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ahorcado-palabra',
  templateUrl: './ahorcado-palabra.component.html',
  styleUrls: ['./ahorcado-palabra.component.scss']
})
export class AhorcadoPalabraComponent implements OnInit, OnChanges {
  @Input() word: string = '';
  @Input() guesses: string[] = [];
  characters: { value: string; guessed: boolean }[] = [];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {       
    if (
      changes?.['word']?.currentValue &&
      changes?.['word'].currentValue !== changes?.['word'].previousValue
    ) {
      this.characters = this.word
        .split('')
        .map((char) => ({ value: char, guessed: false }));
    }

    const current = changes?.['guesses']?.currentValue;
    if (
      current &&
      current.length &&
      current !== changes['guesses'].previousValue
    ) {
      const guessedChar = [...changes['guesses'].currentValue].pop();
      this.characters = this.characters.map((char) => {
        if (char.value.toLowerCase() === guessedChar.toLowerCase()) {
          return { ...char, guessed: true };
        }
        return char;
      });
    }
  }
}