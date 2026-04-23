import { Injectable, computed, signal } from '@angular/core';

import { buildNewsArticleDetailView } from '@core/mock/news-article-detail.mock';
import { buildNewsPageView, NEWS_SEED_ARTICLES } from '@core/mock/news-page.mock';
import { NewsArticleDetailViewModel } from '@core/models/news-article-detail.model';
import { NewsArticle } from '@core/models/news-article.model';
import { NewsPageViewModel } from '@core/models/news-page-view.model';

@Injectable({
  providedIn: 'root'
})
export class MockNewsService {
  private readonly articlesState = signal<NewsArticle[]>(NEWS_SEED_ARTICLES);

  readonly articles = this.articlesState.asReadonly();
  readonly newsPageView = computed<NewsPageViewModel>(() => buildNewsPageView(this.articlesState()));

  getNewsPageView() {
    return this.newsPageView;
  }

  getNewsArticleDetail(articleId: string): NewsArticleDetailViewModel | null {
    return buildNewsArticleDetailView(articleId, this.articlesState());
  }

  createArticle(article: Omit<NewsArticle, 'id'>): string {
    const articleId = this.createArticleId(article.title);
    const nextArticle: NewsArticle = {
      ...article,
      id: articleId
    };

    this.articlesState.update((articles) => [nextArticle, ...articles]);
    return articleId;
  }

  updateArticle(articleId: string, article: Omit<NewsArticle, 'id'>): boolean {
    let updated = false;

    this.articlesState.update((articles) =>
      articles.map((item) => {
        if (item.id !== articleId) {
          return item;
        }

        updated = true;
        return {
          ...article,
          id: articleId
        };
      })
    );

    return updated;
  }

  deleteArticle(articleId: string): boolean {
    if (this.articlesState().length <= 1) {
      return false;
    }

    const nextArticles = this.articlesState().filter((article) => article.id !== articleId);

    if (nextArticles.length === this.articlesState().length) {
      return false;
    }

    this.articlesState.set(nextArticles);
    return true;
  }

  getArticleById(articleId: string): NewsArticle | null {
    return this.articlesState().find((article) => article.id === articleId) ?? null;
  }

  private createArticleId(title: string): string {
    const baseId =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .slice(0, 32) || 'article';

    let suffix = 1;
    let nextId = baseId;

    while (this.articlesState().some((article) => article.id === nextId)) {
      suffix += 1;
      nextId = `${baseId}-${suffix}`;
    }

    return nextId;
  }
}
