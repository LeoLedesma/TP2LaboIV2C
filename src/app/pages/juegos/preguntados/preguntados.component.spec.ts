import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntadosComponent } from './preguntados.component';

describe('PreguntadosComponent', () => {
  let component: PreguntadosComponent;
  let fixture: ComponentFixture<PreguntadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreguntadosComponent]
    });
    fixture = TestBed.createComponent(PreguntadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
