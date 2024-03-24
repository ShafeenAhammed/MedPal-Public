import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwtToken');
  
  if (!token) {
    router.navigate(['/user-login']);
    return false;
  }

  // router.navigate(['/user-home']);
  return true;
};
