import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MockAuthService } from '@core/services/mock-auth.service';
import { MockWorkspaceService } from '@core/services/mock-workspace.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(MockAuthService);
  private readonly mockWorkspaceService = inject(MockWorkspaceService);

  protected readonly navigation = this.mockWorkspaceService.getNavigation();
  protected readonly currentUser = this.authService.currentUser;

  protected logout(): void {
    this.authService.logout();
    void this.router.navigate(['/auth/login']);
  }
}
