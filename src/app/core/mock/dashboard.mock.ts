import { ActivityItem } from '@core/models/activity-item.model';
import { DashboardViewModel } from '@core/models/dashboard-view.model';
import { ProjectItem } from '@core/models/project-item.model';
import { SummaryCard } from '@core/models/summary-card.model';

export const DASHBOARD_SUMMARY_CARDS: SummaryCard[] = [
  {
    title: 'Screens dang mock',
    value: '12',
    delta: '+4 tuan nay',
    helper: 'So man hinh da co khung layout hoac wireframe',
    tone: 'positive'
  },
  {
    title: 'Component tai su dung',
    value: '28',
    delta: '68% coverage',
    helper: 'Nut, card, badge, bang va section wrapper',
    tone: 'neutral'
  },
  {
    title: 'Task cho UI',
    value: '09',
    delta: '3 can uu tien',
    helper: 'Tap trung vao page shell, form va table state',
    tone: 'warning'
  }
];

export const DASHBOARD_PROJECTS: ProjectItem[] = [
  {
    id: 'PRJ-101',
    name: 'Merchant onboarding',
    owner: 'Ngoc Anh',
    status: 'Ready for UI',
    tone: 'positive',
    updatedAt: '2 gio truoc',
    completion: 84
  },
  {
    id: 'PRJ-102',
    name: 'Campaign manager',
    owner: 'Minh Quan',
    status: 'In design',
    tone: 'neutral',
    updatedAt: 'Hom qua',
    completion: 57
  },
  {
    id: 'PRJ-103',
    name: 'Order tracking',
    owner: 'Thu Ha',
    status: 'Need empty state',
    tone: 'warning',
    updatedAt: '3 ngay truoc',
    completion: 35
  }
];

export const DASHBOARD_ACTIVITIES: ActivityItem[] = [
  {
    id: 'ACT-1',
    title: 'Cap nhat mock data cho dashboard',
    description: 'Them 3 card KPI, bang du lieu va timeline de code UI nhanh hon.',
    timestamp: '09:30'
  },
  {
    id: 'ACT-2',
    title: 'Tach layout shell ra khoi app root',
    description: 'Giup sau nay doi route hoac them auth layout khong anh huong page hien tai.',
    timestamp: '11:10'
  },
  {
    id: 'ACT-3',
    title: 'Danh dau cac route placeholder',
    description: 'UI Playground va Settings dang la noi de ban gan component that vao.',
    timestamp: '14:00'
  }
];

export const DASHBOARD_VIEW: DashboardViewModel = {
  summaryCards: DASHBOARD_SUMMARY_CARDS,
  projects: DASHBOARD_PROJECTS,
  activities: DASHBOARD_ACTIVITIES
};
