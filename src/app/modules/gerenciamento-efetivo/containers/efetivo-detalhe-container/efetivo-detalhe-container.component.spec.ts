import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetivoDetalheContainerComponent } from './efetivo-detalhe-container.component';

describe('EfetivoDetalheContainerComponent', () => {
  let component: EfetivoDetalheContainerComponent;
  let fixture: ComponentFixture<EfetivoDetalheContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfetivoDetalheContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EfetivoDetalheContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
