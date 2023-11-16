import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RolesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isLogged: boolean = authService.usuarioLogueado?.tipo !== undefined || false;

  let pass = false;
  const { role, redirect } = route.data;
  let roles = role as string[];
  if(isLogged)
  {
      pass = roles.includes(authService.usuarioLogueado!.tipo)
  }
  else{
    router.navigateByUrl(redirect);
  }
  
  return pass;
};