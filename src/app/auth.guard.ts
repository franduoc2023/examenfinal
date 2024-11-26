import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);  
  const isAuthenticated = !!localStorage.getItem('userData');  
  if (!isAuthenticated) {
    router.navigate(['/login']);  
  }

  return true;  
};
