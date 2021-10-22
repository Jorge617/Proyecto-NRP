import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionTareaClienteComponent } from './descripcion-tarea-cliente.component';

describe('DescripcionTareaClienteComponent', () => {
  let component: DescripcionTareaClienteComponent;
  let fixture: ComponentFixture<DescripcionTareaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescripcionTareaClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescripcionTareaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
