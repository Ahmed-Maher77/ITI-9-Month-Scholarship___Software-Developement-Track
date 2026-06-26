import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-completion-screen',
  standalone: true,
  templateUrl: './completion-screen.component.html',
  styleUrl: './completion-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletionScreenComponent {
  readonly visible = input(false);
}
