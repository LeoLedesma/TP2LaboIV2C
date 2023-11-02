import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGenericoComponent } from './listado-generico.component';

describe('ListadoGenericoComponent', () => {
  let component: ListadoGenericoComponent;
  let fixture: ComponentFixture<ListadoGenericoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoGenericoComponent]
    });
    fixture = TestBed.createComponent(ListadoGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
