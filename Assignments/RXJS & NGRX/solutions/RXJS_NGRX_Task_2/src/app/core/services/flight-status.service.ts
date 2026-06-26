import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { FlightStatus } from '../models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class FlightStatusService {
  fetchFlightStatus(): Observable<FlightStatus> {
    if (Math.random() > 0.7) {
      return throwError(() => ({ service: 'Flight Status Service' }));
    }
    const data: FlightStatus = {
      totalFlights: 342,
      delayedFlights: 47,
      cancelledFlights: 12,
    };
    return of(data).pipe(delay(2000));
  }
}
