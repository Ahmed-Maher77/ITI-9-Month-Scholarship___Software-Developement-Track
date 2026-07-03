import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { WeatherInfo } from '../models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class WeatherInfoService {
  fetchWeatherInfo(): Observable<WeatherInfo> {
    if (Math.random() > 0.7) {
      return throwError(() => ({ service: 'Weather Information Service' }));
    }
    const data: WeatherInfo = {
      temperature: 28,
      condition: 'Partly Cloudy',
      visibility: '10 km',
    };
    return of(data).pipe(delay(3000));
  }
}
