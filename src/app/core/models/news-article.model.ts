import { NewsArtwork } from './news-artwork.model';

export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  stats: string;
  artwork: NewsArtwork;
}
