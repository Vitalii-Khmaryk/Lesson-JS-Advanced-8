import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZamovlenaComponent } from './admin-zamovlena.component';

describe('AdminZamovlenaComponent', () => {
  let component: AdminZamovlenaComponent;
  let fixture: ComponentFixture<AdminZamovlenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminZamovlenaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminZamovlenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
