import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProyectoJefeProyectoComponent } from './crear-proyecto-jefe-proyecto.component';

describe('CrearProyectoJefeProyectoComponent', () => {
  let component: CrearProyectoJefeProyectoComponent;
  let fixture: ComponentFixture<CrearProyectoJefeProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearProyectoJefeProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearProyectoJefeProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
