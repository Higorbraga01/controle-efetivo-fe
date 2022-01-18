import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspecaoDetalheContainerComponent } from './inspecao-detalhe-container.component';

describe('InspecaoDetalheContainerComponent', () => {
  let component: InspecaoDetalheContainerComponent;
  let fixture: ComponentFixture<InspecaoDetalheContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspecaoDetalheContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspecaoDetalheContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
