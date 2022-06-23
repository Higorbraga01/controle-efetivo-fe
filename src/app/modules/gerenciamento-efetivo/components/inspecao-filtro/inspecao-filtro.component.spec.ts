import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspecaoFiltroComponent } from './inspecao-filtro.component';

describe('InspecaoFiltroComponent', () => {
  let component: InspecaoFiltroComponent;
  let fixture: ComponentFixture<InspecaoFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspecaoFiltroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspecaoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
