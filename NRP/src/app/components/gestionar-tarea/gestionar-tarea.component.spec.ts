import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTareaComponent } from './gestionar-tarea.component';

describe('GestionarTareaComponent', () => {
  let component: GestionarTareaComponent;
  let fixture: ComponentFixture<GestionarTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarTareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
