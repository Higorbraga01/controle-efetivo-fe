import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetivoCadastroContainerComponent } from './efetivo-cadastro-container.component';

describe('EfetivoCadastroContainerComponent', () => {
  let component: EfetivoCadastroContainerComponent;
  let fixture: ComponentFixture<EfetivoCadastroContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfetivoCadastroContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EfetivoCadastroContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
