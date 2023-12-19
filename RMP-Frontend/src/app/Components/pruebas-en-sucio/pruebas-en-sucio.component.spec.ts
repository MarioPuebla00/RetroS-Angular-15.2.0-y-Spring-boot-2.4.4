import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasEnSucioComponent } from './pruebas-en-sucio.component';

describe('PruebasEnSucioComponent', () => {
  let component: PruebasEnSucioComponent;
  let fixture: ComponentFixture<PruebasEnSucioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PruebasEnSucioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebasEnSucioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
