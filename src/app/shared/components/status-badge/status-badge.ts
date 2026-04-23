import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

import { SummaryCardTone } from '@core/models/summary-card.model';

@Component({
  selector: 'app-status-badge',
  imports: [NgClass],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss'
})
export class StatusBadgeComponent {
  readonly label = input.required<string>();
  readonly tone = input<SummaryCardTone>('neutral');
}
