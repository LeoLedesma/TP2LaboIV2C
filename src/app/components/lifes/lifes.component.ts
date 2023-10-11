import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lifes',
  templateUrl: './lifes.component.html',
  styleUrls: ['./lifes.component.scss']
})
export class LifesComponent implements OnInit{

  @Input() maxMistakes: number = 0;
  mistakesRemaining: number = 0;

  constructor() {
   
  }
  ngOnInit(): void {
    this.mistakesRemaining = this.maxMistakes;
  }
  get mistakeArray(): any[] {
    return new Array(this.mistakesRemaining);
  }

  decreaseMistakesRemaining(decrease:boolean) {
    if(decrease)   
    this.mistakesRemaining--;
  }

  restartMistakesRemaining() {
    this.mistakesRemaining = this.maxMistakes;
  }
}
