import {
  NewsArticleDetailViewModel,
  NewsArticleFigure,
  NewsArticleSection
} from '@core/models/news-article-detail.model';
import { NewsArticle } from '@core/models/news-article.model';

const FIGURE_LIBRARY: Omit<NewsArticleFigure, 'id'>[] = [
  {
    caption: 'Anh mock bien ban tiep nhan, checklist va thong tin bo sung cho bai viet.',
    aspectRatio: '16 / 10',
    artwork: {
      eyebrow: 'Ho so',
      title: 'Bien ban tiep nhan',
      subtitle: 'Checklist va ghi chu hien truong',
      stamp: 'Mock scan',
      startColor: '#d6ccc2',
      endColor: '#8d99ae'
    }
  },
  {
    caption: 'Hinh anh mo phong tai lieu doi chieu de nguoi doc de hinh dung boi canh.',
    aspectRatio: '16 / 11',
    artwork: {
      eyebrow: 'Doi chieu',
      title: 'Tai lieu xac minh',
      subtitle: 'Thong tin duoc tom tat lai',
      stamp: 'Internal copy',
      startColor: '#ced4da',
      endColor: '#6c757d'
    }
  },
  {
    caption: 'Anh doc mock cho phan noi dung trung tam, dung de thay bo cuc dang bai dai.',
    aspectRatio: '16 / 12',
    artwork: {
      eyebrow: 'Tong hop',
      title: 'Goi tai lieu trung tam',
      subtitle: 'Cap nhat theo tung moc thoi gian',
      stamp: 'Field note',
      startColor: '#cdb4db',
      endColor: '#9c89b8'
    }
  },
  {
    caption: 'Khoi anh mo phong phan chung cu, van ban va tem nhan de tao nhiep bo cuc.',
    aspectRatio: '16 / 9.5',
    artwork: {
      eyebrow: 'Kiem ke',
      title: 'Tem nhan va chung cu',
      subtitle: 'Mock frame cho anh chi tiet',
      stamp: 'Archive',
      startColor: '#d4a373',
      endColor: '#6f4e37'
    }
  },
  {
    caption: 'Anh mo ta buoc kiem tra cuoi, hop cho section ket bai va tong ket.',
    aspectRatio: '16 / 10.5',
    artwork: {
      eyebrow: 'Tong ket',
      title: 'Ket qua doi soat',
      subtitle: 'So lieu da duoc dong bo',
      stamp: 'Verified',
      startColor: '#adb5bd',
      endColor: '#495057'
    }
  }
];

function makeFigure(seed: number, offset: number): NewsArticleFigure {
  const figure = FIGURE_LIBRARY[(seed + offset) % FIGURE_LIBRARY.length];

  return {
    id: `figure-${seed}-${offset}`,
    caption: figure.caption,
    aspectRatio: figure.aspectRatio,
    artwork: figure.artwork
  };
}

function buildSections(article: NewsArticle, seed: number): NewsArticleSection[] {
  return [
    {
      heading: 'Tom tat dien bien',
      paragraphs: [
        `${article.title} duoc dung lam du lieu mock cho trang chi tiet bai viet. Bo cuc nay uu tien van ban dai, doan mo ta ngan va hinh minh hoa chen giua noi dung.`,
        `Phan mo dau nay mo phong kieu bai viet tong hop thong tin, cho phep ban thay ro khoang cach, line-height va nhip doc tren man hinh dai.`
      ],
      bullets: [
        `Category hien tai: ${article.category}.`,
        `Tac gia mock: ${article.author}.`,
        `So lieu nhanh: ${article.stats}.`
      ],
      quote:
        'Muc tieu cua trang detail la giu duoc cam giac mot bai viet dai, nhieu thong tin, nhung van de doc va de thay asset.',
      figure: makeFigure(seed, 0)
    },
    {
      heading: 'Nhung diem can luu y',
      paragraphs: [
        `Neu sau nay noi API that, ban chi can tra ve payload chi tiet theo article id va map vao cac block section dang co.`,
        `Phan body nay dang duoc chia thanh nhieu section co heading, paragraph, list va figure, dung cho bai review, bai phan tich hoac bai tin tong hop.`
      ],
      bullets: [
        'Co the chen them box note, quote hoac callout noi bat.',
        'Co the thay figure bang anh that khi du lieu san sang.',
        'Related posts cuoi bai dang duoc lay tu catalog mock hien tai.'
      ],
      figure: makeFigure(seed, 1)
    },
    {
      heading: 'Phan tich mo rong',
      paragraphs: [
        `Trong giao dien tham khao, bai viet chi tiet co xu huong dai va chen nhieu hinh theo chieu doc. Phan nay mo phong lai dieu do bang mot khoi figure rong va doan van tiep noi.`,
        `Ban co the bo sung component table, block code, box FAQ hoac anchor muc luc ma khong can thay doi route hay layout tong.`
      ],
      quote:
        `${article.category} khong nhat thiet phai chi co 1 kieu trinh bay. Voi mock hien tai, ban co the test nhieu state content tren cung mot shell.`,
      figure: makeFigure(seed, 2)
    },
    {
      heading: 'Ket luan tam thoi',
      paragraphs: [
        `Ket cau duoi bai giu vai tro dong bai, dua ra nhung diem chot va nguon tham chieu. Day la noi phu hop de dat CTA, survey, newsletter hoac block bai lien quan.`,
        `Voi mock detail nay, moi bai viet tren trang list deu co duong dan rieng va co the mo ra trang chi tiet ngay lap tuc.`
      ],
      figure: makeFigure(seed, 3)
    }
  ];
}

function buildGallery(seed: number): NewsArticleFigure[] {
  return [makeFigure(seed, 1), makeFigure(seed, 2), makeFigure(seed, 4)];
}

function buildRelatedArticles(articleId: string, articles: NewsArticle[]): NewsArticle[] {
  return articles.filter((article) => article.id !== articleId).slice(0, 4);
}

function buildArticleDetail(
  article: NewsArticle,
  articles: NewsArticle[],
  seed: number
): NewsArticleDetailViewModel {
  return {
    article,
    updatedAt: `${article.publishedAt} | cap nhat 11:30`,
    lead:
      'Trang chi tiet nay duoc dung de mock lai mot bai viet cong nghe dai, trong do van ban va hinh anh can duoc sap xep de doc de quet va de mo rong sau nay.',
    highlightPoints: [
      'Co breadcrumb, meta line va block tom tat nhanh o dau bai.',
      'Body chia thanh section ro rang, chen duoc figure trong tung nhom noi dung.',
      'Cuoi bai co gallery, banner quang cao va danh sach bai lien quan.'
    ],
    sections: buildSections(article, seed),
    gallery: buildGallery(seed),
    sources: [
      'Nguon mock 01: bien tap noi bo va bo du lieu gia lap.',
      'Nguon mock 02: thong tin tong hop de test bo cuc bai dai.',
      'Nguon mock 03: placeholder cho phan reference, CMS hoac API article detail.'
    ],
    relatedArticles: buildRelatedArticles(article.id, articles)
  };
}

export function buildNewsArticleDetailView(
  articleId: string,
  articles: NewsArticle[]
): NewsArticleDetailViewModel | null {
  const articleIndex = articles.findIndex((article) => article.id === articleId);

  if (articleIndex === -1) {
    return null;
  }

  return buildArticleDetail(articles[articleIndex], articles, articleIndex);
}

export const NEWS_ARTICLE_DETAIL_MAP: Record<string, NewsArticleDetailViewModel> = {};
