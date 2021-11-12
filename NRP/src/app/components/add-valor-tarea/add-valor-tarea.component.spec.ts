import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddValorTareaComponent } from './add-valor-tarea.component';

describe('AddValorTareaComponent', () => {
  let component: AddValorTareaComponent;
  let fixture: ComponentFixture<AddValorTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddValorTareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddValorTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
