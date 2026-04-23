import { SummaryCardTone } from './summary-card.model';

export interface ProjectItem {
  id: string;
  name: string;
  owner: string;
  status: string;
  tone: SummaryCardTone;
  updatedAt: string;
  completion: number;
}
