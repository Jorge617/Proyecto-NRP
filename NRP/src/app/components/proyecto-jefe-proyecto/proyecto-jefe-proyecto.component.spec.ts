import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoJefeProyectoComponent } from './proyecto-jefe-proyecto.component';

describe('ProyectoJefeProyectoComponent', () => {
  let component: ProyectoJefeProyectoComponent;
  let fixture: ComponentFixture<ProyectoJefeProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoJefeProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoJefeProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
