import { AfterContentInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit,OnChanges {
  @ViewChild('contElement') contElement!: ElementRef;
  modo: string = "login";
  
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges){}

  ngAfterViewChecked(){            
    if((this.route.routeConfig?.path || '') !== this.modo){     
      this.modo = this.route.routeConfig?.path || ''      
      this.toggleSignupClass();  
    }    
  }

  toggleSignupClass() {     
    this.contElement.nativeElement.classList.toggle('s--signup');
  }
}
