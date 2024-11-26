import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginProfessorComponent } from './login-professor.component';

describe('LoginProfessorComponent', () => {
  let component: LoginProfessorComponent;
  let fixture: ComponentFixture<LoginProfessorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginProfessorComponent]
    });
    fixture = TestBed.createComponent(LoginProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
