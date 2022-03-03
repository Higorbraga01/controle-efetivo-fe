import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetivoFiltroComponent } from './efetivo-filtro.component';

describe('EfetivoFiltroComponent', () => {
  let component: EfetivoFiltroComponent;
  let fixture: ComponentFixture<EfetivoFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfetivoFiltroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EfetivoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
