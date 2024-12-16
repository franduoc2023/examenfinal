import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

// Mock de AuthService
class MockAuthService {
  login = jasmine.createSpy('login'); // Espía para el método login
  register = jasmine.createSpy('register'); // Espía para el método register
}

describe('´Test del component login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: MockAuthService;

  beforeEach(async () => {
    mockAuthService = new MockAuthService(); // Inicializamos el mock

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent, // LoginComponent debe ser standalone
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },  
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Prueba Unitaria para probar el login el mock ', () => {
    component.loginForm.controls['emailAddress'].setValue('francisco@gmail.com');
    component.loginForm.controls['password'].setValue('123456zxc789*Z');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(mockAuthService.login).toHaveBeenCalledWith('francisco@gmail.com', '123456zxc789*Z');
  });
});