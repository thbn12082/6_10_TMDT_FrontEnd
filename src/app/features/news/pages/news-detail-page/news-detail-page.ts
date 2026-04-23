import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { NewsArticleDetailViewModel } from '@core/models/news-article-detail.model';
import { MockAuthService } from '@core/services/mock-auth.service';
import { MockNewsService } from '@core/services/mock-news.service';
import { MockThumbnailComponent } from '@shared/components/mock-thumbnail/mock-thumbnail';

@Component({
  selector: 'app-news-detail-page',
  imports: [RouterLink, MockThumbnailComponent],
  templateUrl: './news-detail-page.html',
  styleUrl: './news-detail-page.scss'
})
export class NewsDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(MockAuthService);
  private readonly mockNewsService = inject(MockNewsService);

  protected readonly chrome = this.mockNewsService.getNewsPageView();
  protected readonly currentUser = this.authService.currentUser;

  private readonly articleId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('articleId') ?? '')),
    {
      initialValue: ''
    }
  );

  protected readonly detail = computed<NewsArticleDetailViewModel | null>(() =>
    this.mockNewsService.getNewsArticleDetail(this.articleId())
  );

  protected logout(): void {
    this.authService.logout();
    void this.router.navigate(['/auth/login']);
  }
}
