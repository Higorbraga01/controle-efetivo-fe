import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetivoTabelaComponent } from './efetivo-tabela.component';

describe('EfetivoTabelaComponent', () => {
  let component: EfetivoTabelaComponent;
  let fixture: ComponentFixture<EfetivoTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfetivoTabelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EfetivoTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
