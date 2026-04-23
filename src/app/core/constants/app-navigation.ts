import { NavigationItem } from '@core/models/navigation-item.model';

export const APP_NAVIGATION: NavigationItem[] = [
  {
    label: 'Tin tuc',
    path: '/news',
    description: 'Trang landing tin tuc voi mock data',
    exact: true
  },
  {
    label: 'Dashboard',
    path: '/workspace/dashboard',
    description: 'Trang tong quan va dataset mock',
    exact: true
  },
  {
    label: 'UI Playground',
    path: '/workspace/ui-playground',
    description: 'Khu vuc de rap component giao dien'
  },
  {
    label: 'Settings',
    path: '/workspace/settings',
    description: 'Checklist truoc khi noi API that'
  },
  {
    label: 'Admin News',
    path: '/workspace/admin/articles',
    description: 'Them, sua va xoa bai viet mock'
  }
];
