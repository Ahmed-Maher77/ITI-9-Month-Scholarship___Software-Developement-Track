import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  template: `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading dashboard data...</p>
    </div>
  `,
  styles: [`
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 80px 24px;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #e2e8f0;
      border-top-color: #2563eb;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    .loading-text {
      font-size: 14px;
      color: #64748b;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingScreenComponent {}
