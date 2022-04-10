import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UesRestantesComponent } from './ues-restantes.component';

describe('UesRestantesComponent', () => {
  let component: UesRestantesComponent;
  let fixture: ComponentFixture<UesRestantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UesRestantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UesRestantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
