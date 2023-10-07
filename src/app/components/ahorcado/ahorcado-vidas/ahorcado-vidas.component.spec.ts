import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoVidasComponent } from './ahorcado-vidas.component';

describe('AhorcadoVidasComponent', () => {
  let component: AhorcadoVidasComponent;
  let fixture: ComponentFixture<AhorcadoVidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AhorcadoVidasComponent]
    });
    fixture = TestBed.createComponent(AhorcadoVidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
