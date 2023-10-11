import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() maxSeconds: number = 0;
  @Output() onTimerEnd: EventEmitter<any> = new EventEmitter();

  @Output() totalSeconds:number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  private timerSubscription!: Subscription;
  
  startTimer(){    
    console.log("Start timer")
    this.timerSubscription = interval(1000).subscribe(() => {
      if(this.maxSeconds === 0 || (this.maxSeconds !== 0 && this.totalSeconds<this.maxSeconds))
      {
        this.totalSeconds++;
      }else{
        this.onTimerEnd.emit();
      }
    });
  }

  stopTimer(){
    this.timerSubscription.unsubscribe();

    return this.totalSeconds;
  }
  
  resetTimer(){
    console.log("resetTimer")
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
