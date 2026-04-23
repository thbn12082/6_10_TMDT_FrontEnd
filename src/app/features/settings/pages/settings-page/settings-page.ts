import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss'
})
export class SettingsPageComponent {
  protected readonly checklist = [
    'Tach mock data khoi component truoc khi code man hinh lon.',
    'Tai su dung shared component truoc khi copy HTML/CSS.',
    'Chuan bi loading, empty, error state ngay tu dau.',
    'Khi can API that thi doi service, giu nguyen input model cho component.'
  ];

  protected readonly folderGuide = [
    { name: 'core', purpose: 'Constants, models, services dung chung' },
    { name: 'features', purpose: 'Page va component theo tung man hinh' },
    { name: 'shared', purpose: 'Badge, button, dialog, table, form field' },
    { name: 'layouts', purpose: 'Shell, sidebar, topbar va wrapper route' }
  ];
}
