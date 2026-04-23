import { Routes } from '@angular/router';

import { authGuard, guestGuard } from '@core/guards/auth.guard';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/signup'
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signup'
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('@features/auth/pages/signup-page/signup-page').then(
            (module) => module.SignupPageComponent
          ),
        title: 'Sign up'
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@features/auth/pages/login-page/login-page').then(
            (module) => module.LoginPageComponent
          ),
        title: 'Login'
      }
    ]
  },
  {
    path: 'news',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@features/news/pages/news-page/news-page').then(
        (module) => module.NewsPageComponent
      ),
    title: 'Trang tin tuc'
  },
  {
    path: 'news/:articleId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@features/news/pages/news-detail-page/news-detail-page').then(
        (module) => module.NewsDetailPageComponent
      ),
    title: 'Chi tiet bai viet'
  },
  {
    path: 'workspace',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@features/dashboard/pages/dashboard-page/dashboard-page').then(
            (module) => module.DashboardPageComponent
          ),
        title: 'Dashboard'
      },
      {
        path: 'ui-playground',
        loadComponent: () =>
          import('@features/ui-playground/pages/ui-playground-page/ui-playground-page').then(
            (module) => module.UiPlaygroundPageComponent
          ),
        title: 'UI Playground'
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('@features/settings/pages/settings-page/settings-page').then(
            (module) => module.SettingsPageComponent
          ),
        title: 'Settings'
      },
      {
        path: 'admin/articles',
        loadComponent: () =>
          import('@features/admin/pages/news-admin-page/news-admin-page').then(
            (module) => module.NewsAdminPageComponent
          ),
        title: 'Admin News'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/signup'
  }
];
