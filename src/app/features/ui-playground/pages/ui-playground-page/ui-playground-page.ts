import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { PlaygroundBlock } from '@core/models/playground-block.model';
import { MockWorkspaceService } from '@core/services/mock-workspace.service';

@Component({
  selector: 'app-ui-playground-page',
  templateUrl: './ui-playground-page.html',
  styleUrl: './ui-playground-page.scss'
})
export class UiPlaygroundPageComponent {
  private readonly mockWorkspaceService = inject(MockWorkspaceService);

  protected readonly blocks = toSignal(this.mockWorkspaceService.getPlaygroundBlocks(), {
    initialValue: [] as PlaygroundBlock[]
  });
}
