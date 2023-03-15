import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTovarComponent } from './admin-tovar.component';

describe('AdminTovarComponent', () => {
  let component: AdminTovarComponent;
  let fixture: ComponentFixture<AdminTovarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTovarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTovarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
