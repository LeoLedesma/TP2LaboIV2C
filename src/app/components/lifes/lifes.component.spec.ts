import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifesComponent } from './lifes.component';

describe('LifesComponent', () => {
  let component: LifesComponent;
  let fixture: ComponentFixture<LifesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LifesComponent]
    });
    fixture = TestBed.createComponent(LifesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
