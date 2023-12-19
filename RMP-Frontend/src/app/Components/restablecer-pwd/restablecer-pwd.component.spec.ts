import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerPwdComponent } from './restablecer-pwd.component';

describe('RestablecerPwdComponent', () => {
  let component: RestablecerPwdComponent;
  let fixture: ComponentFixture<RestablecerPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestablecerPwdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestablecerPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
