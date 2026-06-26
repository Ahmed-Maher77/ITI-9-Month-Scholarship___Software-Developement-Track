import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ActivityEvent } from '../../core/models/sensor.models';
import { FormatTimePipe } from '../../shared/pipes/format-time.pipe';

@Component({
  selector: 'app-activity-feed',
  standalone: true,
  imports: [FormatTimePipe],
  templateUrl: './activity-feed.component.html',
  styleUrl: './activity-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityFeedComponent {
  readonly events = input<ActivityEvent[]>([]);
}
