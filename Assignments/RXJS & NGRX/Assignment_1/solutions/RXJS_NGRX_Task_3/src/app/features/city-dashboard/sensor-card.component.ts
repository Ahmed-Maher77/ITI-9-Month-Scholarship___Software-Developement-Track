import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TemperatureData, TrafficData, TemperatureStatus } from '../../core/models/sensor.models';
import { getTrafficColorClass } from '../../core/services/sensor.helpers';

export type SensorCardType = 'temperature' | 'traffic';

@Component({
  selector: 'app-sensor-card',
  standalone: true,
  templateUrl: './sensor-card.component.html',
  styleUrl: './sensor-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SensorCardComponent {
  readonly type = input.required<SensorCardType>();
  readonly temperature = input<TemperatureData | null>(null);
  readonly traffic = input<TrafficData | null>(null);
  readonly temperatureStatus = input<TemperatureStatus | null>(null);
  readonly initializing = input(false);
  readonly isHealthy = input(true);

  readonly trafficColorClass = computed(() => {
    const level = this.traffic()?.level;
    return level ? getTrafficColorClass(level) : '';
  });

  readonly gaugePercent = computed(() => {
    const temp = this.temperature()?.value;
    if (temp == null) return 0;
    return Math.min(100, Math.max(0, ((temp - 20) / 20) * 100));
  });

  readonly densityPercent = computed(() => {
    const vehicles = this.traffic()?.vehicles;
    if (vehicles == null) return 0;
    return Math.min(100, (vehicles / 350) * 100);
  });
}
