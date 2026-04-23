import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MockAuthService } from '@core/services/mock-auth.service';
import { MockNewsService } from '@core/services/mock-news.service';
import { MockThumbnailComponent } from '@shared/components/mock-thumbnail/mock-thumbnail';

@Component({
  selector: 'app-news-page',
  imports: [RouterLink, MockThumbnailComponent],
  templateUrl: './news-page.html',
  styleUrl: './news-page.scss'
})
export class NewsPageComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(MockAuthService);
  private readonly mockNewsService = inject(MockNewsService);

  protected readonly view = this.mockNewsService.getNewsPageView();
  protected readonly currentUser = this.authService.currentUser;

  protected logout(): void {
    this.authService.logout();
    void this.router.navigate(['/auth/login']);
  }
}
