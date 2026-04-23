export type SummaryCardTone = 'positive' | 'neutral' | 'warning';

export interface SummaryCard {
  title: string;
  value: string;
  delta: string;
  helper: string;
  tone: SummaryCardTone;
}
