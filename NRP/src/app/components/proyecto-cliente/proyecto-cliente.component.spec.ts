import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoClienteComponent } from './proyecto-cliente.component';

describe('ProyectoClienteComponent', () => {
  let component: ProyectoClienteComponent;
  let fixture: ComponentFixture<ProyectoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
