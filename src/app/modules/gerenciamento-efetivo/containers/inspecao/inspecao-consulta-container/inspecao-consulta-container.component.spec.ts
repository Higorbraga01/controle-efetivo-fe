import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspecaoConsultaContainerComponent } from './inspecao-consulta-container.component';

describe('InspecaoConsultaContainerComponent', () => {
  let component: InspecaoConsultaContainerComponent;
  let fixture: ComponentFixture<InspecaoConsultaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspecaoConsultaContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspecaoConsultaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
