import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoEfetivoConsultaContainerComponent } from './gerenciamento-efetivo-consulta-container.component';

describe('GerenciamentoEfetivoConsultaContainerComponent', () => {
  let component: GerenciamentoEfetivoConsultaContainerComponent;
  let fixture: ComponentFixture<GerenciamentoEfetivoConsultaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciamentoEfetivoConsultaContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciamentoEfetivoConsultaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
