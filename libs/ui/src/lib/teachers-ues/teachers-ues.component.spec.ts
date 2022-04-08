import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersUesComponent } from './teachers-ues.component';

describe('TeachersUesComponent', () => {
  let component: TeachersUesComponent;
  let fixture: ComponentFixture<TeachersUesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersUesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersUesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
