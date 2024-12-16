import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegistroComponent {
  registroForm: FormGroup;
  mensajeError: string = '';
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registroForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: [''],
      firstApp: ['', Validators.required],
      secondApp: [''],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('.*[A-Z].*'),  
          Validators.pattern('.*[a-z].*'),  
          Validators.pattern('.*\\d.*'),  
          Validators.pattern('.*[!@#$%^&*(),.?":{}|<>].*'),  
        ]),
      ],
      birthdayDate: ['', Validators.required],
      gender: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    });
  }

 



  async onSubmit() {
    if (this.registroForm.valid) {
      const { password, emailAddress, ...userData } = this.registroForm.value; 

      try {
        await this.authService.register(emailAddress, password, userData); 
         this.router.navigate(['/login']);  
        } catch (error: any) {
           if (error.code === 'auth/email-already-in-use') {
            this.mensajeError = 'El correo ya está registrado';
          } else {
            this.mensajeError = 'Error en cargar la ruta';
          }
         }
      } else {
        console.log('Formulario inválido:', this.registroForm.value);
      }

    }

    
  }
 