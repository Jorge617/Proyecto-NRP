import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsuarioParticipanteComponent } from './add-usuario-participante.component';

describe('AddUsuarioParticipanteComponent', () => {
  let component: AddUsuarioParticipanteComponent;
  let fixture: ComponentFixture<AddUsuarioParticipanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsuarioParticipanteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsuarioParticipanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
