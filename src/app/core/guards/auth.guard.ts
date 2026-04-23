import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { MockAuthService } from '@core/services/mock-auth.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const authService = inject(MockAuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  if (authService.hasAccounts()) {
    return router.createUrlTree(['/auth/login'], {
      queryParams: { redirect: state.url }
    });
  }

  return router.createUrlTree(['/auth/signup'], {
    queryParams: { redirect: state.url }
  });
};

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(MockAuthService);

  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/workspace/admin/articles']);
  }

  return true;
};
