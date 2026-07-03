import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { SensorActions } from '../../store/actions/sensor.actions';
import {
  selectActivityFeed,
  selectAverageTemperature,
  selectInitializing,
  selectLastUpdated,
  selectMonitoring,
  selectMonitoringCompleted,
  selectPeakTraffic,
  selectRemainingSeconds,
  selectSensorHealth,
  selectTemperature,
  selectTemperatureHistory,
  selectTemperatureStatus,
  selectTotalUpdates,
  selectTraffic,
} from '../../store/selectors/sensor.selectors';
import { FormatTimePipe } from '../../shared/pipes/format-time.pipe';
import { ActivityFeedComponent } from './activity-feed.component';
import { CompletionScreenComponent } from './completion-screen.component';
import { MonitoringStatusComponent } from './monitoring-status.component';
import { SensorCardComponent } from './sensor-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MonitoringStatusComponent,
    SensorCardComponent,
    ActivityFeedComponent,
    CompletionScreenComponent,
    FormatTimePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly store = inject(Store);
  private errorTimeout: ReturnType<typeof setTimeout> | null = null;
  private timeInterval: ReturnType<typeof setInterval> | null = null;

  readonly monitoring = this.store.selectSignal(selectMonitoring);
  readonly monitoringCompleted = this.store.selectSignal(selectMonitoringCompleted);
  readonly initializing = this.store.selectSignal(selectInitializing);
  readonly temperature = this.store.selectSignal(selectTemperature);
  readonly traffic = this.store.selectSignal(selectTraffic);
  readonly lastUpdated = this.store.selectSignal(selectLastUpdated);
  readonly activityFeed = this.store.selectSignal(selectActivityFeed);
  readonly remainingSeconds = this.store.selectSignal(selectRemainingSeconds);
  readonly temperatureStatus = this.store.selectSignal(selectTemperatureStatus);
  readonly temperatureHistory = this.store.selectSignal(selectTemperatureHistory);
  readonly averageTemperature = this.store.selectSignal(selectAverageTemperature);
  readonly peakTraffic = this.store.selectSignal(selectPeakTraffic);
  readonly totalUpdates = this.store.selectSignal(selectTotalUpdates);
  readonly sensorHealth = this.store.selectSignal(selectSensorHealth);

  readonly currentTime = signal(this.formatTime(new Date()));

  readonly hasError = signal(false);
  readonly errorMessage = signal('');

  constructor() {
    afterNextRender(() => {
      this.store.dispatch(SensorActions.startMonitoring());
      this.timeInterval = setInterval(() => {
        this.currentTime.set(this.formatTime(new Date()));
      }, 1000);
    });

    effect(() => {
      if (this.monitoringCompleted()) {
        this.clearErrorTimeout();
        if (this.timeInterval) {
          clearInterval(this.timeInterval);
          this.timeInterval = null;
        }
      }
    });

    effect(() => {
      if (this.monitoring() && !this.monitoringCompleted()) {
        this.startErrorTimeout();
      }
      if (this.temperature() || this.traffic()) {
        this.clearErrorTimeout();
        this.hasError.set(false);
        this.errorMessage.set('');
      }
    });
  }

  private startErrorTimeout(): void {
    this.clearErrorTimeout();
    this.errorTimeout = setTimeout(() => {
      if ((!this.temperature() || !this.traffic()) && !this.monitoringCompleted()) {
        this.hasError.set(true);
        this.errorMessage.set('Weather Information Service unavailable.');
      }
    }, 8000);
  }

  private clearErrorTimeout(): void {
    if (this.errorTimeout) {
      clearTimeout(this.errorTimeout);
      this.errorTimeout = null;
    }
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  startMonitoring(): void {
    this.hasError.set(false);
    this.errorMessage.set('');
    this.store.dispatch(SensorActions.startMonitoring());
  }

  stopMonitoring(): void {
    this.clearErrorTimeout();
    this.store.dispatch(SensorActions.stopMonitoring());
  }

  retryConnection(): void {
    this.hasError.set(false);
    this.errorMessage.set('');
    this.store.dispatch(SensorActions.stopMonitoring());
    setTimeout(() => {
      this.store.dispatch(SensorActions.startMonitoring());
    }, 500);
  }

  getHistoryBarHeight(value: number): number {
    return Math.min(100, Math.max(10, ((value - 20) / 20) * 100));
  }
}
