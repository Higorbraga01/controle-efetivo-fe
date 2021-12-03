import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetivoConsultaContainerComponent } from './efetivo-consulta-container.component';

describe('EfetivoConsultaContainerComponent', () => {
  let component: EfetivoConsultaContainerComponent;
  let fixture: ComponentFixture<EfetivoConsultaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfetivoConsultaContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EfetivoConsultaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
