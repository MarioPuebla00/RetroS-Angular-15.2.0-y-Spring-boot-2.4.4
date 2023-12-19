import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOptComponent } from './admin-opt.component';

describe('AdminOptComponent', () => {
  let component: AdminOptComponent;
  let fixture: ComponentFixture<AdminOptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
