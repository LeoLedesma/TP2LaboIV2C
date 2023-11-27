import { Component } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'recaptcha-demo',
  template: `
    <button (click)="executeImportantAction()">Important action</button>
  `,
})
export class RecaptchaV3DemoComponent {
  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
  }

  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => this.handleToken(token));
  }

  handleToken(token: string): void {

  }
}