import { NewsArticle } from './news-article.model';
import { NewsArtwork } from './news-artwork.model';

export interface NewsArticleFigure {
  id: string;
  caption: string;
  aspectRatio: string;
  artwork: NewsArtwork;
}

export interface NewsArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
  figure?: NewsArticleFigure;
}

export interface NewsArticleDetailViewModel {
  article: NewsArticle;
  updatedAt: string;
  lead: string;
  highlightPoints: string[];
  sections: NewsArticleSection[];
  gallery: NewsArticleFigure[];
  sources: string[];
  relatedArticles: NewsArticle[];
}
