import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);  
   const userData = localStorage.getItem('datosUsuario');
  const isAuthenticated = userData ? JSON.parse(userData).isLoggedIn : false;

  if (!isAuthenticated) {
    router.navigate(['/login']);  
    return false;  
  }

  return true;  
};