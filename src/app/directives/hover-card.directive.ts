import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({  
  selector: '[appHoverCard]'
})
export class HoverCardDirective {
  constructor(private el: ElementRef) {}

  @Input() defaultColor = 'deepskyblue';

  @Input() appHighlight = '';

  @HostListener('mouseenter') onMouseEnter() {    
    console.log(this.appHighlight);
    this.highlight(this.appHighlight || this.defaultColor || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {    
    this.el.nativeElement.style.backgroundColor = color;
  }

}
