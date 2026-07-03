import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, interval } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { DashboardState, FlightStatus, WeatherInfo, GateInfo } from '../../core/models/dashboard.models';
import * as DashboardActions from '../../store/actions/dashboard.actions';
import * as DashboardSelectors from '../../store/selectors/dashboard.selectors';
import { StatusBannerComponent } from './status-banner.component';
import { SensorCardComponent } from './sensor-card.component';
import { ActivityFeedComponent, ActivityEntry } from './activity-feed.component';
import { LoadingScreenComponent } from './loading-screen.component';
import { ErrorScreenComponent } from './error-screen.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe, DatePipe,
    StatusBannerComponent,
    SensorCardComponent,
    ActivityFeedComponent,
    LoadingScreenComponent,
    ErrorScreenComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private store = inject(Store<{ dashboard: DashboardState }>);
  private subs: Subscription[] = [];

  loading$: Observable<boolean>;
  ready$: Observable<boolean>;
  error$: Observable<string | null>;
  flightStatus$: Observable<FlightStatus | null>;
  weatherInfo$: Observable<WeatherInfo | null>;
  gateInfo$: Observable<GateInfo | null>;

  activities: ActivityEntry[] = [];
  lastUpdated: Date | null = null;
  currentTime = new Date();

  constructor() {
    this.loading$ = this.store.select(DashboardSelectors.selectLoading);
    this.ready$ = this.store.select(DashboardSelectors.selectReady);
    this.error$ = this.store.select(DashboardSelectors.selectError);
    this.flightStatus$ = this.store.select(DashboardSelectors.selectFlightStatus);
    this.weatherInfo$ = this.store.select(DashboardSelectors.selectWeatherInfo);
    this.gateInfo$ = this.store.select(DashboardSelectors.selectGateInfo);
  }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadDashboard());

    this.subs.push(interval(1000).subscribe(() => {
      this.currentTime = new Date();
    }));

    this.subs.push(this.flightStatus$.subscribe((fs) => {
      if (fs) {
        this.addEntry(`Flight data updated — ${fs.totalFlights} total, ${fs.delayedFlights} delayed`);
      }
    }));

    this.subs.push(this.weatherInfo$.subscribe((wi) => {
      if (wi) {
        this.addEntry(`Temperature updated to ${wi.temperature}°C`);
      }
    }));

    this.subs.push(this.gateInfo$.subscribe((gi) => {
      if (gi) {
        this.addEntry(`Gate status updated — ${gi.availableGates} available`);
      }
    }));

    this.subs.push(this.ready$.subscribe((ready) => {
      if (ready) {
        this.lastUpdated = new Date();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  onRetry(): void {
    this.store.dispatch(DashboardActions.retryDashboardLoad());
  }

  private addEntry(message: string): void {
    this.activities = [...this.activities, { timestamp: new Date(), message }];
  }
}
