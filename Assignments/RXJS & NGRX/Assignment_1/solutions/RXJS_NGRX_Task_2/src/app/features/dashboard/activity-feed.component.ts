import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface ActivityEntry {
  timestamp: Date;
  message: string;
}

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="activity-feed">
      <h3 class="feed-title">Activity Log</h3>
      <div class="feed-list">
        @for (entry of entries(); track $index) {
          <div class="feed-entry">
            <span class="entry-time">{{ entry.timestamp | date:'HH:mm:ss' }}</span>
            <span class="entry-message">{{ entry.message }}</span>
          </div>
        } @empty {
          <div class="feed-empty">No activity recorded.</div>
        }
      </div>
    </div>
  `,
  styles: [`
    .activity-feed {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

      .feed-title {
        font-size: 13px;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 16px 20px;
        border-bottom: 1px solid #f1f5f9;
      }

      .feed-list {
        padding: 8px 0;
      }

      .feed-entry {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 20px;
        font-size: 13px;

        .entry-time {
          font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;
          font-size: 12px;
          color: #94a3b8;
          flex-shrink: 0;
        }

        .entry-message {
          color: #334155;
        }
      }

      .feed-empty {
        padding: 24px 20px;
        text-align: center;
        font-size: 13px;
        color: #94a3b8;
      }
    }
  `]
})
export class ActivityFeedComponent {
  readonly entries = input<ActivityEntry[]>([]);
}
