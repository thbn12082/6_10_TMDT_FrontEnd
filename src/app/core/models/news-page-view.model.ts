import { NewsArtwork } from './news-artwork.model';
import { NewsArticle } from './news-article.model';

export interface NewsQuickLink {
  title: string;
  meta: string;
  articleId?: string;
}

export interface FooterLinkGroup {
  title: string;
  links: string[];
}

export interface NewsBanner {
  eyebrow: string;
  title: string;
  caption: string;
  cta: string;
  artwork: NewsArtwork;
}

export interface NewsPageViewModel {
  headerActions: string[];
  topNav: string[];
  ticker: string[];
  hero: NewsArticle;
  heroHighlights: NewsQuickLink[];
  heroPromo: NewsBanner;
  articleFeed: NewsArticle[];
  sidebarBriefs: NewsQuickLink[];
  sidebarStories: NewsArticle[];
  banner: NewsBanner;
  sectionTabs: string[];
  sectionCards: NewsArticle[];
  footerColumns: FooterLinkGroup[];
  footerNote: string;
}
