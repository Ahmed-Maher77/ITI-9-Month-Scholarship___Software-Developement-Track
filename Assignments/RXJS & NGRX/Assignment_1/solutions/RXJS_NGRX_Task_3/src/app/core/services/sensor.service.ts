import { Injectable } from '@angular/core';
import { combineLatest, interval, map, Observable, takeUntil, timer } from 'rxjs';
import {
  MONITORING_DURATION_MS,
  TEMP_INTERVAL_MS,
  TRAFFIC_INTERVAL_MS,
} from '../models/monitoring.constants';
import { TemperatureData, TrafficData, TrafficLevel } from '../models/sensor.models';
import { randomInt } from './sensor.helpers';

@Injectable({ providedIn: 'root' })
export class SensorService {
  /** Simulates a temperature sensor emitting every 3 seconds (20–40°C). */
  temperature$(): Observable<TemperatureData> {
    return interval(TEMP_INTERVAL_MS).pipe(
      map(() => ({
        value: randomInt(20, 40),
        unit: '°C' as const,
        timestamp: new Date(),
      })),
    );
  }

  /** Simulates a traffic sensor emitting every 5 seconds with random density. */
  traffic$(): Observable<TrafficData> {
    return interval(TRAFFIC_INTERVAL_MS).pipe(
      map(() => {
        const level = this.randomTrafficLevel();
        return {
          level,
          vehicles: this.vehiclesForLevel(level),
          timestamp: new Date(),
        };
      }),
    );
  }

  /**
   * Combines both sensor streams and stops after the monitoring duration.
   * Demonstrates combineLatest + takeUntil for stream lifecycle management.
   */
  createMonitoringStream(): Observable<[TemperatureData, TrafficData]> {
    const stop$ = timer(MONITORING_DURATION_MS);
    return combineLatest([this.temperature$(), this.traffic$()]).pipe(takeUntil(stop$));
  }

  private randomTrafficLevel(): TrafficLevel {
    const levels: TrafficLevel[] = ['Low', 'Moderate', 'High'];
    return levels[randomInt(0, levels.length - 1)];
  }

  private vehiclesForLevel(level: TrafficLevel): number {
    switch (level) {
      case 'Low':
        return randomInt(20, 80);
      case 'Moderate':
        return randomInt(81, 180);
      case 'High':
        return randomInt(181, 350);
    }
  }
}
