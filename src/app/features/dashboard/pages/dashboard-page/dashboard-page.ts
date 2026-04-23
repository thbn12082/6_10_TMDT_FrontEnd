import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DashboardViewModel } from '@core/models/dashboard-view.model';
import { MockWorkspaceService } from '@core/services/mock-workspace.service';
import { StatusBadgeComponent } from '@shared/components/status-badge/status-badge';

const EMPTY_DASHBOARD_VIEW: DashboardViewModel = {
  summaryCards: [],
  projects: [],
  activities: []
};

@Component({
  selector: 'app-dashboard-page',
  imports: [DecimalPipe, StatusBadgeComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss'
})
export class DashboardPageComponent {
  private readonly mockWorkspaceService = inject(MockWorkspaceService);

  protected readonly dashboardView = toSignal(this.mockWorkspaceService.getDashboardView(), {
    initialValue: EMPTY_DASHBOARD_VIEW
  });
}
