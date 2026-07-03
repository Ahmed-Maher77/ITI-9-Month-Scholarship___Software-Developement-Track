import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as DashboardActions from '../actions/dashboard.actions';
import { FlightStatusService } from '../../core/services/flight-status.service';
import { WeatherInfoService } from '../../core/services/weather-info.service';
import { GateInfoService } from '../../core/services/gate-info.service';

export const loadDashboard$ = createEffect(
  (
    actions$ = inject(Actions),
    flightStatusService = inject(FlightStatusService),
    weatherInfoService = inject(WeatherInfoService),
    gateInfoService = inject(GateInfoService)
  ) =>
    actions$.pipe(
      ofType(DashboardActions.loadDashboard, DashboardActions.retryDashboardLoad),
      switchMap(() =>
        forkJoin([
          flightStatusService.fetchFlightStatus(),
          weatherInfoService.fetchWeatherInfo(),
          gateInfoService.fetchGateInfo(),
        ]).pipe(
          map(([flightStatus, weatherInfo, gateInfo]) =>
            DashboardActions.loadDashboardSuccess({ flightStatus, weatherInfo, gateInfo })
          ),
          catchError((err) => {
            const serviceName = err?.service || 'Unknown Service';
            return of(DashboardActions.loadDashboardFailure({ error: `${serviceName} unavailable.` }));
          })
        )
      )
    ),
  { functional: true }
);
