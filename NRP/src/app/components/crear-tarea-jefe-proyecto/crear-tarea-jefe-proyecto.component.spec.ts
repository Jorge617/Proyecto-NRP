import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTareaJefeProyectoComponent } from './crear-tarea-jefe-proyecto.component';

describe('CrearTareaJefeProyectoComponent', () => {
  let component: CrearTareaJefeProyectoComponent;
  let fixture: ComponentFixture<CrearTareaJefeProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTareaJefeProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTareaJefeProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
