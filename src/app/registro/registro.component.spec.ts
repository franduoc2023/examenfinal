import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro.component';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      register: jasmine.createSpy('register').and.returnValue(Promise.resolve()),  
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RegistroComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validar formulario', () => {
    component.registroForm.setValue({
      firstName: 'sdadas',
      secondName: 'asdsad',
      firstApp: 'asddsa',
      secondApp: 'asdsdads',
      password: 'PasswodDrd123!',
      birthdayDate: '1990-01-01',
      gender: 'Masculino',
      emailAddress: 'juan@gmail.com.com',
      phoneNumber: '923456789',
    });
    expect(component.registroForm.valid).toBeTrue();
  });


  it('Comprueba el ingreso al input al atributo   phoneNumber', () => {
     const inputElement = fixture.debugElement.query(By.css('input[formControlName="phoneNumber"]')).nativeElement;

     component.registroForm.controls['phoneNumber'].setValue('914151415');
    fixture.detectChanges();  
     expect(inputElement.value).toBe('914151415');
  });
  it('Comprueba el ingreso al input al atributo nombre', () => {
     const inputElement = fixture.debugElement.query(By.css('input[formControlName="firstName"]')).nativeElement;

     component.registroForm.controls['firstName'].setValue('francisco');
    fixture.detectChanges();  

     expect(inputElement.value).toBe('francisco');
  });

});