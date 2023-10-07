import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IKey } from 'src/app/models/key.interface';

import KEY_CHARS from 'src/app/constants/keyCharacters.const';

@Component({
  selector: 'app-ahorcado-teclado',
  templateUrl: './ahorcado-teclado.component.html',
  styleUrls: ['./ahorcado-teclado.component.scss'],    
})
export class AhorcadoTecladoComponent implements OnInit, OnChanges {
  @Input() word = '';
  @Output() keyPressed = new EventEmitter<string>();
  keys: IKey[] = [];
  constructor() {
    this.setKeys();
  }

  ngOnInit(): void {
    this.setKeys();
  }

  ngOnChanges(changes: SimpleChanges): void {    
    if (
      changes?.['word']?.currentValue &&
      changes?.['word'].currentValue !== changes?.['word'].previousValue
    ) {
      this.addMissingKeys();
      this.setKeys();
    }
  }

  addMissingKeys(): void {
    for (let i = 0; i < this.word.length; i++) {
      const keyExists = this.keys.find((key) => {
        return key.value.toLowerCase() === this.word[i].toLowerCase();
      });
      if (keyExists) {
        continue;
      }
      const randomIndex = Math.floor(Math.random() * 11);
      this.keys.splice(randomIndex, 0, {
        value: this.word[i],
        guessed: false,
        error: true,
      });
    }
  }

  onKeyClick(key: IKey): void {
    
    if (key.guessed) {
      return;
    }
    key.guessed = true;
    key.error = this.word.toLowerCase().indexOf(key.value.toLowerCase()) === -1;

    this.keyPressed.emit(key.value);
  }

  setKeys()
  {
    this.keys = KEY_CHARS.split('').map((key) => {
      return {
        value: key,
        guessed: false,
        error: false,
      };
    });
  }
}