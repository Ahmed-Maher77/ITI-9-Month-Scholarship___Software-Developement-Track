import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-banner',
  standalone: true,
  template: `
    <div class="status-banner">
      <span class="status-dot" [class.active]="active()"></span>
      <span class="status-text">{{ active() ? 'Monitoring Active' : 'Disconnected' }}</span>
    </div>
  `,
  styles: [`
    .status-banner {
      height: 56px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 24px;
      background: white;
      border-bottom: 1px solid #e2e8f0;

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #e2e8f0;

        &.active {
          background: #16a34a;
        }
      }

      .status-text {
        font-size: 13px;
        font-weight: 500;
        color: #64748b;
      }
    }
  `]
})
export class StatusBannerComponent {
  readonly active = input(false);
}
