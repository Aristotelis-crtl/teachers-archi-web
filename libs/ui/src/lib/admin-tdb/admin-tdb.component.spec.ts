import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTdbComponent } from './admin-tdb.component';

describe('TeachersComponent', () => {
  let component: AdminTdbComponent;
  let fixture: ComponentFixture<AdminTdbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTdbComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
