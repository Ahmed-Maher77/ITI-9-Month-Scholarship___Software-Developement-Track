import { Component, input } from '@angular/core';

@Component({
  selector: 'app-sensor-card',
  standalone: true,
  template: `
    <div class="sensor-card">
      <div class="card-header">
        <span class="card-label">{{ label() }}</span>
        <span class="card-value">{{ value() }}</span>
      </div>
      <div class="card-footer">
        <span class="card-meta">{{ meta() }}</span>
      </div>
    </div>
  `,
  styles: [`
    .sensor-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      padding: 20px 24px;
      transition: 200ms ease;

      &:hover {
        transform: translateY(-1px);
      }

      .card-header {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .card-label {
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
        }

        .card-value {
          font-size: 28px;
          font-weight: 600;
          color: #0f172a;
          line-height: 1.2;
        }
      }

      .card-footer {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid #f1f5f9;

        .card-meta {
          font-size: 12px;
          font-weight: 500;
          color: #94a3b8;
        }
      }
    }
  `]
})
export class SensorCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly meta = input('');
}
