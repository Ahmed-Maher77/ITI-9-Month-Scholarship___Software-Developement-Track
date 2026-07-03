import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-screen',
  standalone: true,
  template: `
    <div class="error-state">
      <p class="error-message">{{ errorMessage() }}</p>
      <button class="retry-btn" (click)="retry.emit()">Retry</button>
    </div>
  `,
  styles: [`
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 80px 24px;
    }

    .error-message {
      font-size: 14px;
      color: #64748b;
      text-align: center;
    }

    .retry-btn {
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 500;
      color: #0f172a;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      cursor: pointer;
      transition: 200ms ease;

      &:hover {
        background: #f8fafc;
        border-color: #cbd5e1;
      }
    }
  `]
})
export class ErrorScreenComponent {
  readonly errorMessage = input.required<string>();
  readonly retry = output<void>();
}
