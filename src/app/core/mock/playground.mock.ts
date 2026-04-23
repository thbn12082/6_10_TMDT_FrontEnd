import { PlaygroundBlock } from '@core/models/playground-block.model';

export const PLAYGROUND_BLOCKS: PlaygroundBlock[] = [
  {
    id: 'cards',
    title: 'Cards and Metrics',
    description: 'Dung cho dashboard, tong quan KPI, quick stats va highlight widgets.',
    tags: ['summary', 'analytics', 'reusable'],
    notes: [
      'Nen giu 1 block = 1 card component + input model ro rang.',
      'Mock data co the dat trong feature de lap UI nhanh.'
    ]
  },
  {
    id: 'forms',
    title: 'Forms and Filters',
    description: 'Noi ban thu input, select, radio group va validation state truoc khi goi API.',
    tags: ['forms', 'state', 'validation'],
    notes: [
      'Dung Reactive Forms neu form co logic xu ly.',
      'Tach fake options thanh file mock rieng de de doi.'
    ]
  },
  {
    id: 'tables',
    title: 'Tables and Empty States',
    description: 'Mau bang co status badge, progress va row action de ban thay bo cuc.',
    tags: ['table', 'empty-state', 'list'],
    notes: [
      'Nen chuan bi truoc 3 state: loading, empty, error state.',
      'Khi noi API that chi can doi service, khong doi component.'
    ]
  }
];
