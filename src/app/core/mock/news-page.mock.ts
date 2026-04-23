import { NewsPageViewModel, NewsQuickLink } from '@core/models/news-page-view.model';
import { NewsArticle } from '@core/models/news-article.model';

const NEWS_SITE_CHROME = {
  headerActions: ['Bang gia', 'So sanh', 'Hot deals'],
  topNav: ['Tin moi', 'Laptop', 'Gaming gear', 'Build PC', 'Huong dan', 'Khuyen mai'],
  ticker: [
    'Tin nhanh: Lenovo, Asus va Acer dong loat day manh AI laptop 2025.',
    'Guide: Cach chon laptop do hoa theo nhu cau render va edit 4K.',
    'Deal watch: Nhieu mau gaming laptop giam gia truoc he.'
  ]
};

const NEWS_STATIC_VIEW: NewsPageViewModel = {
  ...NEWS_SITE_CHROME,
  hero: {
    id: 'hero-01',
    category: 'Phan tich',
    title: 'Performance vs custom: bo laptop chien game can bang giua gia va nhiet do',
    excerpt:
      'Mock bai viet dau trang cho giao dien tin tuc. Bieu dien mot bai dai co anh hero, meta line va doan mo ta ngan.',
    author: 'Admin editor',
    publishedAt: '20 Apr 2026',
    stats: '8 phut doc',
    artwork: {
      eyebrow: 'Lab test',
      title: 'Performance vs custom',
      subtitle: 'An toan cho gaming setup',
      stamp: 'Review deep dive',
      startColor: '#0f7b6c',
      endColor: '#2b58ff'
    }
  },
  heroHighlights: [
    {
      title: 'Top 5 mau laptop cho sinh vien IT trong tam gia 20 trieu',
      meta: '3 phut doc',
      articleId: 'feed-01'
    },
    {
      title: 'Co nen nang cap RAM truoc hay doi SSD khi build may hoc lap trinh?',
      meta: 'Guide nhanh',
      articleId: 'feed-02'
    },
    {
      title: 'Back to school: nhung mon phu kien nen co de setup goc hoc tap',
      meta: 'Hot trend',
      articleId: 'side-01'
    },
    {
      title: 'Case study: toi uu nhiet do cho phong stream nho nhung van giu fps on dinh',
      meta: 'Editor choice',
      articleId: 'feed-05'
    }
  ],
  heroPromo: {
    eyebrow: 'Spotlight',
    title: 'Back to school setup',
    caption: 'Landing zone cho laptop mong nhe, monitor va phu kien study mode.',
    cta: 'Xem bo suu tap',
    artwork: {
      eyebrow: 'Campus',
      title: 'School ready',
      subtitle: 'Lightweight and focused',
      stamp: 'Sale picks',
      startColor: '#1b4db1',
      endColor: '#5fb4ff'
    }
  },
  articleFeed: [
    {
      id: 'feed-01',
      category: 'Danh gia',
      title: 'Asus Zephyrus mock edition: toi uu cho creator va game thu di dong',
      excerpt:
        'Bai list item co thumb ben trai, tieu de, excerpt ngan va hang meta de ban lap layout nhanh.',
      author: 'Hoang Duy',
      publishedAt: '20 Apr 2026',
      stats: '12.4k views',
      artwork: {
        eyebrow: 'RTX setup',
        title: 'Creator ready',
        subtitle: 'Thin body, strong thermals',
        startColor: '#006d77',
        endColor: '#83c5be'
      }
    },
    {
      id: 'feed-02',
      category: 'Build guide',
      title: 'Cach chon monitor 2K cho laptop gaming de co do muot va mau can doi',
      excerpt:
        'Noi dung mo phong cho group tin huong dan. Ban co the thay bang du lieu that hoac API sau.',
      author: 'Minh Quan',
      publishedAt: '19 Apr 2026',
      stats: '9.8k views',
      artwork: {
        eyebrow: 'Guide',
        title: '2K monitor pick',
        subtitle: 'Smooth enough for FPS',
        startColor: '#9d4edd',
        endColor: '#3a0ca3'
      }
    },
    {
      id: 'feed-03',
      category: 'Gaming gear',
      title: 'Ban phim low profile cho goc setup gon: 6 lua chon dang can nhac',
      excerpt:
        'Thiet ke row nay co the tai su dung cho bai viet, video tong hop hoac live blog cong nghe.',
      author: 'Gia Han',
      publishedAt: '18 Apr 2026',
      stats: '7.1k views',
      artwork: {
        eyebrow: 'Desk setup',
        title: 'Low profile picks',
        subtitle: 'Slim board, clean desk',
        startColor: '#264653',
        endColor: '#2a9d8f'
      }
    },
    {
      id: 'feed-04',
      category: 'Tin nhanh',
      title: 'GPU laptop gen moi sap do bo, nhieu hang bat dau reset gia tren kenh retail',
      excerpt:
        'Muc nay mo phong feed tin moi. Van giu cung card image de bo cuc on dinh tren desktop va mobile.',
      author: 'Ngoc Mai',
      publishedAt: '18 Apr 2026',
      stats: '14.9k views',
      artwork: {
        eyebrow: 'Market',
        title: 'Price reset wave',
        subtitle: 'Retail channel update',
        startColor: '#f77f00',
        endColor: '#fcbf49'
      }
    },
    {
      id: 'feed-05',
      category: 'Tips',
      title: '5 cach giam nhiet laptop khi render lau ma khong can hy sinh qua nhieu hieu nang',
      excerpt:
        'Layout dang row nay se hop cho trang tin, trang blog cong nghe hoac chuyen muc how-to.',
      author: 'Tuan Kiet',
      publishedAt: '17 Apr 2026',
      stats: '11.2k views',
      artwork: {
        eyebrow: 'Cooling',
        title: 'Thermal tips',
        subtitle: 'Keep clocks stable',
        startColor: '#e63946',
        endColor: '#f1fa8c'
      }
    },
    {
      id: 'feed-06',
      category: 'Video',
      title: 'Test nhanh 3 mau laptop 16 inch cho nhu cau editor, streamer va motion artist',
      excerpt:
        'Neu can, ban co the doi card nay thanh component video row rieng ma khong pha vo page structure.',
      author: 'Editor team',
      publishedAt: '16 Apr 2026',
      stats: '18.6k views',
      artwork: {
        eyebrow: 'Video',
        title: '16-inch showdown',
        subtitle: 'Editor vs streamer use case',
        startColor: '#1d3557',
        endColor: '#457b9d'
      }
    },
    {
      id: 'feed-07',
      category: 'Khuyen mai',
      title: 'Deal cuoi tuan: laptop gaming, SSD va monitor dong loat giam de day ton',
      excerpt:
        'Card tin co the gan them badge gia, phan tram giam hoac CTA neu ban can mode e-commerce lai.',
      author: 'Deal bot',
      publishedAt: '16 Apr 2026',
      stats: '22.3k views',
      artwork: {
        eyebrow: 'Sale',
        title: 'Weekend drop',
        subtitle: 'Laptop + SSD + monitor',
        startColor: '#2a9d8f',
        endColor: '#e9c46a'
      }
    },
    {
      id: 'feed-08',
      category: 'Phan tich',
      title: 'Khi nao nen mua laptop AI? Nhung diem can can doi truoc khi xuong tien',
      excerpt:
        'Mau bai cuoi de feed co chieu dai giong giao dien tham khao, de ban thay rhythm va spacing toan trang.',
      author: 'Bao Long',
      publishedAt: '15 Apr 2026',
      stats: '15.7k views',
      artwork: {
        eyebrow: 'AI trend',
        title: 'Worth it now?',
        subtitle: 'Buying guide 2026',
        startColor: '#7209b7',
        endColor: '#4cc9f0'
      }
    }
  ],
  sidebarBriefs: [
    {
      title: 'Moc gia nao hop ly cho laptop 14 inch da nang nam 2026?',
      meta: 'Quick note'
    },
    {
      title: '3 bo tri ban lam viec giup giam roi day ma van de thao tac.',
      meta: 'Workspace'
    },
    {
      title: 'Mouse wireless nao dang duoc game thu FPS uu tien?',
      meta: 'Community poll'
    },
    {
      title: 'Mock block nay phu hop cho danh sach tin ngan hoac bullet editorial.',
      meta: 'UI note'
    },
    {
      title: 'Tai sao nen co state cho ads, empty slot va block sponsor?',
      meta: 'Layout note'
    }
  ],
  sidebarStories: [
    {
      id: 'side-01',
      category: 'Spotlight',
      title: 'School mode: bo goi laptop nhe, pin tot va sac USB-C',
      excerpt: 'Card nho cho sidebar hoac khu vuc de xuat.',
      author: 'Desk team',
      publishedAt: '18 Apr',
      stats: '6.2k',
      artwork: {
        eyebrow: 'Study',
        title: 'USB-C daily carry',
        subtitle: 'Light and long battery',
        startColor: '#277da1',
        endColor: '#90e0ef'
      }
    },
    {
      id: 'side-02',
      category: 'Build room',
      title: '3 concept goc setup cho phong ngu nho',
      excerpt: 'Mo ta ngan cho the tac dong nhanh.',
      author: 'Space lab',
      publishedAt: '17 Apr',
      stats: '4.8k',
      artwork: {
        eyebrow: 'Room tour',
        title: 'Compact battle station',
        subtitle: 'Small room idea',
        startColor: '#6a4c93',
        endColor: '#b5179e'
      }
    },
    {
      id: 'side-03',
      category: 'Creator',
      title: 'SSD gen 5 co that su can thiet cho edit 4K?',
      excerpt: 'Them mot card nho de day day bo cuc cot phai.',
      author: 'Media lab',
      publishedAt: '16 Apr',
      stats: '8.1k',
      artwork: {
        eyebrow: 'Storage',
        title: 'Gen 5 debate',
        subtitle: '4K edit workflow',
        startColor: '#ff6b6b',
        endColor: '#ffd166'
      }
    }
  ],
  banner: {
    eyebrow: 'Partner content',
    title: 'Legion mock campaign 2025',
    caption: 'Khoang banner ngang de ban thay section sponsor, CTA va hero visual mini.',
    cta: 'Dat cho quang cao',
    artwork: {
      eyebrow: 'Legion',
      title: 'Tuyet doi dien anh',
      subtitle: 'Pro 7i launch visual',
      stamp: 'Campaign block',
      startColor: '#008f5a',
      endColor: '#1d3557'
    }
  },
  sectionTabs: ['Tin moi nhat', 'Review laptop', 'Gaming zone', 'Build and desk'],
  sectionCards: [
    {
      id: 'card-01',
      category: 'Tin moi',
      title: 'Acer day manh laptop AI cho phan khuc creator cap trung',
      excerpt: 'Card grid 4 cot cho phan duoi trang.',
      author: 'News desk',
      publishedAt: '20 Apr',
      stats: '5.4k',
      artwork: {
        eyebrow: 'Launch',
        title: 'Creator AI lineup',
        subtitle: 'Mid-range focus',
        startColor: '#3a86ff',
        endColor: '#00b4d8'
      }
    },
    {
      id: 'card-02',
      category: 'Review',
      title: 'Ultrabook 14 inch nao cho cam giac go van ban tot nhat?',
      excerpt: 'Card nho cho bo duoi trang.',
      author: 'Review team',
      publishedAt: '19 Apr',
      stats: '6.8k',
      artwork: {
        eyebrow: 'Typing test',
        title: 'Best keyboard feel',
        subtitle: 'Ultrabook 14 inch',
        startColor: '#577590',
        endColor: '#90be6d'
      }
    },
    {
      id: 'card-03',
      category: 'Desk setup',
      title: 'Veneer, walnut hay black matte: chat lieu nao hop workspace tech?',
      excerpt: 'Mock block vat lieu cho card thu ba.',
      author: 'Interior lab',
      publishedAt: '18 Apr',
      stats: '3.2k',
      artwork: {
        eyebrow: 'Material',
        title: 'Desk surface picks',
        subtitle: 'Warm tone or stealth mode',
        startColor: '#7f5539',
        endColor: '#ddb892'
      }
    },
    {
      id: 'card-04',
      category: 'Gaming',
      title: 'Headset open-back co hop cho stream va choi FPS tai nha?',
      excerpt: 'Card cuoi de ket section.',
      author: 'Audio desk',
      publishedAt: '18 Apr',
      stats: '4.9k',
      artwork: {
        eyebrow: 'Audio test',
        title: 'Open-back debate',
        subtitle: 'FPS and stream combo',
        startColor: '#560bad',
        endColor: '#4895ef'
      }
    }
  ],
  footerColumns: [
    {
      title: 'Chuyen muc',
      links: ['Tin moi', 'Laptop', 'Gaming gear', 'Build PC', 'Khuyen mai']
    },
    {
      title: 'Noi dung',
      links: ['Review chuyen sau', 'Tips toi uu', 'Deal watch', 'Phong setup', 'Video']
    },
    {
      title: 'Cong dong',
      links: ['Discord mock', 'Facebook page', 'Email newsletter', 'Desktop app', 'RSS']
    },
    {
      title: 'Thong tin',
      links: ['Lien he quang cao', 'Chinh sach noi dung', 'Bao loi bai viet', 'Dieu khoan', 'About']
    }
  ],
  footerNote: 'Mock footer cho trang tin tuc. Sau nay co the tach thanh shared layout footer neu can.'
};

function dedupeArticles(articles: NewsArticle[]): NewsArticle[] {
  const seenIds = new Set<string>();

  return articles.filter((article) => {
    if (seenIds.has(article.id)) {
      return false;
    }

    seenIds.add(article.id);
    return true;
  });
}

function toQuickLinks(articles: NewsArticle[], limit: number): NewsQuickLink[] {
  return articles.slice(0, limit).map((article) => ({
    title: article.title,
    meta: article.stats,
    articleId: article.id
  }));
}

const EMPTY_ARTICLE: NewsArticle = {
  id: 'empty-article',
  category: 'Tin moi',
  title: 'Chua co bai viet nao',
  excerpt: 'Hay tao bai viet moi tu trang admin de cap nhat khu vuc nay.',
  author: 'System',
  publishedAt: 'Hom nay',
  stats: '0 views',
  artwork: {
    eyebrow: 'Empty',
    title: 'No articles yet',
    subtitle: 'Create one from admin',
    startColor: '#adb5bd',
    endColor: '#6c757d'
  }
};

export const NEWS_SEED_ARTICLES: NewsArticle[] = dedupeArticles([
  NEWS_STATIC_VIEW.hero,
  ...NEWS_STATIC_VIEW.articleFeed,
  ...NEWS_STATIC_VIEW.sidebarStories,
  ...NEWS_STATIC_VIEW.sectionCards
]);

export function buildNewsPageView(articles: NewsArticle[]): NewsPageViewModel {
  const hero = articles[0] ?? EMPTY_ARTICLE;
  const contentArticles = articles.slice(1);
  const articleFeed = contentArticles;
  const sidebarStories = contentArticles.slice(0, 3);
  const sectionCards = contentArticles.slice(3, 7);

  return {
    ...NEWS_SITE_CHROME,
    hero,
    heroHighlights: toQuickLinks(contentArticles, 4),
    heroPromo: NEWS_STATIC_VIEW.heroPromo,
    articleFeed,
    sidebarBriefs: NEWS_STATIC_VIEW.sidebarBriefs,
    sidebarStories,
    banner: NEWS_STATIC_VIEW.banner,
    sectionTabs: NEWS_STATIC_VIEW.sectionTabs,
    sectionCards,
    footerColumns: NEWS_STATIC_VIEW.footerColumns,
    footerNote: NEWS_STATIC_VIEW.footerNote
  };
}

export const NEWS_PAGE_VIEW: NewsPageViewModel = buildNewsPageView(NEWS_SEED_ARTICLES);
