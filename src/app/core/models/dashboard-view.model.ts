import { ActivityItem } from './activity-item.model';
import { ProjectItem } from './project-item.model';
import { SummaryCard } from './summary-card.model';

export interface DashboardViewModel {
  summaryCards: SummaryCard[];
  projects: ProjectItem[];
  activities: ActivityItem[];
}
