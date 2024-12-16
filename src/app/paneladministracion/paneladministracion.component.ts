import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-paneladministracion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './paneladministracion.component.html',
  styleUrl: './paneladministracion.component.css'
})


 

export class PaneladministracionComponent {
  registroForm: FormGroup;
  //userData: any = {};
  constructor(private fb: FormBuilder, private router: Router) {
    this.registroForm = this.fb.group({
      firstName: [''], 
      secondName: [''],  
      firstApp: [''], 
      secondApp: [''],  
      password: ['', Validators.compose([
        Validators.minLength(8),
        Validators.pattern('.*[A-Z].*'),
        Validators.pattern('.*[a-z].*'),
        Validators.pattern('.*\\d.*'),
        Validators.pattern('.*[!@#$%^&*(),.?":{}|<>].*')
      ])], 
      birthdayDate: [''],  
      gender: [''], 
      emailAddress: ['', [Validators.required, Validators.email]],  
      phoneNumber: ['']  
    });
  }


  ngOnInit(): void {
     this.loadUserData();
  }

  loadUserData(): void {
    const storedData = localStorage.getItem('userData'); 
    if (storedData) {
      const userData = JSON.parse(storedData);  
      this.registroForm.patchValue(userData);  
    }
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const updatedUserData = this.registroForm.value;

       localStorage.setItem('userData', JSON.stringify(updatedUserData));
       console.log('Usuario actualizado:', updatedUserData);
    } else {
      console.log('falta aviso');
    }
  }

  onDelete(): void {
     const confirmDelete = confirm('confirmacion para inicializar el delete ');
    if (confirmDelete) {
      localStorage.removeItem('userData');  
      this.registroForm.reset();  
       console.log('Usuario eliminado.');
    }
  }
  }




