import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioJefeProyectoComponent } from './inicio-jefe-proyecto.component';

describe('InicioJefeProyectoComponent', () => {
  let component: InicioJefeProyectoComponent;
  let fixture: ComponentFixture<InicioJefeProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioJefeProyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioJefeProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
