import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspecaoCadastroContainerComponent } from './inspecao-cadastro-container.component';

describe('InspecaoCadastroContainerComponent', () => {
  let component: InspecaoCadastroContainerComponent;
  let fixture: ComponentFixture<InspecaoCadastroContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspecaoCadastroContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspecaoCadastroContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
