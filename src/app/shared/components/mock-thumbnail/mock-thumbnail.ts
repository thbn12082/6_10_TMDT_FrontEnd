import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

import { NewsArtwork } from '@core/models/news-artwork.model';

@Component({
  selector: 'app-mock-thumbnail',
  imports: [NgClass],
  templateUrl: './mock-thumbnail.html',
  styleUrl: './mock-thumbnail.scss'
})
export class MockThumbnailComponent {
  readonly artwork = input.required<NewsArtwork>();
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly align = input<'start' | 'end'>('start');
  readonly aspectRatio = input('16 / 9');
}
