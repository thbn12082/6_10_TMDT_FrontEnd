import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { startWith } from 'rxjs';

import { NewsArticle } from '@core/models/news-article.model';
import { MockAuthService } from '@core/services/mock-auth.service';
import { MockNewsService } from '@core/services/mock-news.service';
import { MockThumbnailComponent } from '@shared/components/mock-thumbnail/mock-thumbnail';

type EditorMode = 'create' | 'edit';

interface ArticleFormValue {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  stats: string;
  eyebrow: string;
  artworkTitle: string;
  artworkSubtitle: string;
  artworkStamp: string;
  startColor: string;
  endColor: string;
}

const DEFAULT_COLORS = {
  startColor: '#0b75ff',
  endColor: '#34c6ff'
};

@Component({
  selector: 'app-news-admin-page',
  imports: [NgClass, ReactiveFormsModule, RouterLink, MockThumbnailComponent],
  templateUrl: './news-admin-page.html',
  styleUrl: './news-admin-page.scss'
})
export class NewsAdminPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(MockAuthService);
  private readonly mockNewsService = inject(MockNewsService);

  protected readonly articles = this.mockNewsService.articles;
  protected readonly articleCount = computed(() => this.articles().length);
  protected readonly mode = signal<EditorMode>('edit');
  protected readonly selectedArticleId = signal(this.articles()[0]?.id ?? '');
  protected readonly statusMessage = signal('');
  protected readonly currentUser = this.authService.currentUser;

  protected readonly articleForm = this.formBuilder.nonNullable.group({
    category: ['Tin moi', [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(12)]],
    excerpt: ['', [Validators.required, Validators.minLength(24)]],
    author: ['', [Validators.required]],
    publishedAt: ['20 Apr 2026', [Validators.required]],
    stats: ['0 views', [Validators.required]],
    eyebrow: ['Fresh post'],
    artworkTitle: ['', [Validators.required]],
    artworkSubtitle: ['Mock visual'],
    artworkStamp: ['Admin draft'],
    startColor: [DEFAULT_COLORS.startColor, [Validators.required]],
    endColor: [DEFAULT_COLORS.endColor, [Validators.required]]
  });

  protected readonly formValue = toSignal(
    this.articleForm.valueChanges.pipe(startWith(this.articleForm.getRawValue())),
    {
      initialValue: this.articleForm.getRawValue()
    }
  );

  protected readonly selectedArticle = computed(() =>
    this.mockNewsService.getArticleById(this.selectedArticleId())
  );

  protected readonly canDelete = computed(
    () => this.mode() === 'edit' && this.articleCount() > 1 && !!this.selectedArticle()
  );

  protected readonly previewArtwork = computed(() => {
    const value = this.formValue();

    return {
      eyebrow: (value.eyebrow ?? '').trim() || 'Fresh post',
      title: (value.artworkTitle ?? '').trim() || (value.title ?? '').trim() || 'Preview title',
      subtitle: (value.artworkSubtitle ?? '').trim() || 'Mock visual',
      stamp: (value.artworkStamp ?? '').trim() || 'Admin draft',
      startColor: value.startColor || DEFAULT_COLORS.startColor,
      endColor: value.endColor || DEFAULT_COLORS.endColor
    };
  });

  constructor() {
    effect(() => {
      const articles = this.articles();
      const mode = this.mode();

      if (!articles.length) {
        return;
      }

      if (mode === 'create') {
        return;
      }

      const selected = this.selectedArticle() ?? articles[0];

      if (selected.id !== this.selectedArticleId()) {
        this.selectedArticleId.set(selected.id);
        return;
      }

      untracked(() => this.patchForm(selected));
    });
  }

  protected selectArticle(articleId: string): void {
    this.mode.set('edit');
    this.selectedArticleId.set(articleId);
    this.statusMessage.set('');
  }

  protected startCreate(): void {
    this.mode.set('create');
    this.statusMessage.set('Dang tao bai viet moi.');
    this.resetFormToDefaults();
  }

  protected saveArticle(): void {
    if (this.articleForm.invalid) {
      this.articleForm.markAllAsTouched();
      this.statusMessage.set('Can dien day du thong tin truoc khi luu.');
      return;
    }

    const payload = this.buildArticlePayload();

    if (this.mode() === 'create') {
      const nextId = this.mockNewsService.createArticle(payload);
      this.mode.set('edit');
      this.selectedArticleId.set(nextId);
      this.statusMessage.set('Da them bai viet moi vao danh sach.');
      return;
    }

    const currentArticleId = this.selectedArticleId();
    const updated = this.mockNewsService.updateArticle(currentArticleId, payload);

    this.statusMessage.set(
      updated ? 'Da cap nhat bai viet thanh cong.' : 'Khong tim thay bai viet de cap nhat.'
    );
  }

  protected resetEditor(): void {
    if (this.mode() === 'create') {
      this.resetFormToDefaults();
      return;
    }

    const currentArticle = this.selectedArticle();

    if (currentArticle) {
      this.patchForm(currentArticle);
      this.statusMessage.set('Da phuc hoi noi dung ve phien ban hien tai.');
    }
  }

  protected deleteCurrentArticle(): void {
    const currentArticle = this.selectedArticle();

    if (!currentArticle) {
      return;
    }

    this.deleteArticle(currentArticle.id);
  }

  protected deleteArticle(articleId: string): void {
    const articles = this.articles();
    const article = articles.find((item) => item.id === articleId);

    if (!article) {
      return;
    }

    if (articles.length <= 1) {
      this.statusMessage.set('Can giu lai toi thieu 1 bai viet trong he thong.');
      return;
    }

    const approved = confirm(`Xoa bai viet "${article.title}" khoi mock data?`);

    if (!approved) {
      return;
    }

    const currentIndex = articles.findIndex((item) => item.id === articleId);
    const deleted = this.mockNewsService.deleteArticle(articleId);

    if (!deleted) {
      this.statusMessage.set('Khong the xoa bai viet nay.');
      return;
    }

    const nextArticles = this.articles();
    const fallbackArticle = nextArticles[Math.min(currentIndex, nextArticles.length - 1)];

    this.mode.set('edit');
    this.selectedArticleId.set(fallbackArticle?.id ?? '');
    this.statusMessage.set('Da xoa bai viet khoi danh sach.');
  }

  protected logout(): void {
    this.authService.logout();
    void this.router.navigate(['/auth/login']);
  }

  private buildArticlePayload(): Omit<NewsArticle, 'id'> {
    const value = this.articleForm.getRawValue();
    const title = value.title.trim();

    return {
      category: value.category.trim(),
      title,
      excerpt: value.excerpt.trim(),
      author: value.author.trim(),
      publishedAt: value.publishedAt.trim(),
      stats: value.stats.trim(),
      artwork: {
        eyebrow: value.eyebrow.trim() || 'Fresh post',
        title: value.artworkTitle.trim() || title,
        subtitle: value.artworkSubtitle.trim() || 'Mock visual',
        stamp: value.artworkStamp.trim() || 'Admin draft',
        startColor: value.startColor,
        endColor: value.endColor
      }
    };
  }

  private patchForm(article: NewsArticle): void {
    this.articleForm.reset({
      category: article.category,
      title: article.title,
      excerpt: article.excerpt,
      author: article.author,
      publishedAt: article.publishedAt,
      stats: article.stats,
      eyebrow: article.artwork.eyebrow ?? '',
      artworkTitle: article.artwork.title,
      artworkSubtitle: article.artwork.subtitle ?? '',
      artworkStamp: article.artwork.stamp ?? '',
      startColor: article.artwork.startColor,
      endColor: article.artwork.endColor
    });
  }

  private resetFormToDefaults(): void {
    this.articleForm.reset({
      category: 'Tin moi',
      title: '',
      excerpt: '',
      author: 'Admin editor',
      publishedAt: '20 Apr 2026',
      stats: '0 views',
      eyebrow: 'Fresh post',
      artworkTitle: '',
      artworkSubtitle: 'Mock visual',
      artworkStamp: 'Admin draft',
      startColor: DEFAULT_COLORS.startColor,
      endColor: DEFAULT_COLORS.endColor
    });
  }
}
