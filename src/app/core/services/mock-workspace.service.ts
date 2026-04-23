import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { APP_NAVIGATION } from '@core/constants/app-navigation';
import { DASHBOARD_VIEW } from '@core/mock/dashboard.mock';
import { PLAYGROUND_BLOCKS } from '@core/mock/playground.mock';
import { DashboardViewModel } from '@core/models/dashboard-view.model';
import { NavigationItem } from '@core/models/navigation-item.model';
import { PlaygroundBlock } from '@core/models/playground-block.model';

@Injectable({
  providedIn: 'root'
})
export class MockWorkspaceService {
  getNavigation(): NavigationItem[] {
    return APP_NAVIGATION;
  }

  getDashboardView(): Observable<DashboardViewModel> {
    return of(DASHBOARD_VIEW);
  }

  getPlaygroundBlocks(): Observable<PlaygroundBlock[]> {
    return of(PLAYGROUND_BLOCKS);
  }
}
