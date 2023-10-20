import { Component, OnInit, ViewChild } from '@angular/core';
import { TimerComponent } from 'src/app/components/timer/timer.component';

@Component({
  selector: 'app-reaccion',
  templateUrl: './reaccion.component.html',
  styleUrls: ['./reaccion.component.scss']
})
export class ReaccionComponent implements OnInit {
  @ViewChild(TimerComponent) timerComponent!: TimerComponent;
  score = 0;
  buttonTop = 0;
  buttonLeft = 0;
  alertMessage = '';
  restartGameBtnShown: boolean = false;
  showStartGame: boolean = true;


  ngOnInit() {

  }

  startGame() {
    this.timerComponent.resetTimer();
    this.timerComponent.startTimer();
    this.score = 0;
    this.alertMessage = '';
    this.restartGameBtnShown = true;
    this.generateRandomPosition();
    this.showStartGame = false;
  }

  generateRandomPosition() {
    const container = document.querySelector('.game-container') as HTMLElement;
    const maxTop = container.clientHeight - 50;
    const maxLeft = container.clientWidth - 50;

    this.buttonTop = Math.floor(Math.random() * maxTop);
    this.buttonLeft = Math.floor(Math.random() * maxLeft);
  }

  onButtonClick(event: MouseEvent) {
    console.log(event!.target!)
    if (!this.showStartGame && event.target instanceof HTMLElement && !(event.target.classList.contains("mat-mdc-button-touch-target") || event.target.classList.contains("mdc-button__label"))) {
      if (event.target.classList.contains('click-button'))
        this.onCorrectClick();
      else
        this.onMissedClick();

      this.generateRandomPosition();
    }
  }

  onCorrectClick() {
    this.score += 5;
    this.alertMessage = '+5';
  }

  onMissedClick() {
    this.score -= 5;
    this.alertMessage = '-5';
  }

  onTimerEnd() {
    this.restartGameBtnShown = true;
    this.reset();
  }

  reset() {
    this.showStartGame = true;
    this.timerComponent.stopTimer();
  }


}