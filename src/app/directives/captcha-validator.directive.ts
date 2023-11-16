import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCaptchaValidator]'
})
export class CaptchaValidatorDirective {
  @Input('resultOfOperation') resultOfOperation!: boolean;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    if (this.resultOfOperation) {
      this.elementRef.nativeElement.disabled = false;
    } else {
      this.elementRef.nativeElement.disabled = true;
    }
  }
}
