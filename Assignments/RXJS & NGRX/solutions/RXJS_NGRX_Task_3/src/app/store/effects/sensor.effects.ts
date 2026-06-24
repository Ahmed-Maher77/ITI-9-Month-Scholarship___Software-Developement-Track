import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  exhaustMap,
  interval,
  map,
  merge,
  switchMap,
  take,
  takeUntil,
  timer,
} from 'rxjs';
import {
  MONITORING_DURATION_MS,
  MONITORING_DURATION_SECONDS,
} from '../../core/models/monitoring.constants';
import { SensorService } from '../../core/services/sensor.service';
import { SensorActions } from '../actions/sensor.actions';

@Injectable()
export class SensorEffects {
  private readonly actions$ = inject(Actions);
  private readonly sensorService = inject(SensorService);

  /** Starts independent sensor streams and dispatches update actions until monitoring ends. */
  monitorSensors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SensorActions.startMonitoring),
      switchMap(() => {
        const stop$ = merge(
          timer(MONITORING_DURATION_MS),
          this.actions$.pipe(ofType(SensorActions.stopMonitoring)),
        );

        return merge(
          this.sensorService.temperature$().pipe(
            takeUntil(stop$),
            map((temperature) => SensorActions.updateTemperature({ temperature })),
          ),
          this.sensorService.traffic$().pipe(
            takeUntil(stop$),
            map((traffic) => SensorActions.updateTraffic({ traffic })),
          ),
          timer(MONITORING_DURATION_MS).pipe(map(() => SensorActions.stopMonitoring())),
        );
      }),
    ),
  );

  /** Countdown timer while monitoring is active. */
  countdown$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SensorActions.startMonitoring),
      exhaustMap(() =>
        interval(1000).pipe(
          take(MONITORING_DURATION_SECONDS),
          map((tick) =>
            SensorActions.tickCountdown({
              remainingSeconds: MONITORING_DURATION_SECONDS - tick - 1,
            }),
          ),
          takeUntil(this.actions$.pipe(ofType(SensorActions.stopMonitoring))),
        ),
      ),
    ),
  );
}
