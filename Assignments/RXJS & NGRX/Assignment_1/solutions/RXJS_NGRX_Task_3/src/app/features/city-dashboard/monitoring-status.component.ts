import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { formatCountdown } from '../../core/services/sensor.helpers';

@Component({
  selector: 'app-monitoring-status',
  standalone: true,
  templateUrl: './monitoring-status.component.html',
  styleUrl: './monitoring-status.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringStatusComponent {
  readonly monitoring = input(false);
  readonly monitoringCompleted = input(false);
  readonly remainingSeconds = input(0);

  formatCountdown(seconds: number): string {
    return formatCountdown(seconds);
  }
}
