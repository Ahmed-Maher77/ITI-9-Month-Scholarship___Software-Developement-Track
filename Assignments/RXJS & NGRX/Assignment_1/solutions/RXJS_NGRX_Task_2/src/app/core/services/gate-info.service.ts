import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { GateInfo } from '../models/dashboard.models';

@Injectable({ providedIn: 'root' })
export class GateInfoService {
  fetchGateInfo(): Observable<GateInfo> {
    if (Math.random() > 0.7) {
      return throwError(() => ({ service: 'Gate Information Service' }));
    }
    const data: GateInfo = {
      availableGates: 15,
      occupiedGates: 22,
      maintenanceGates: 3,
    };
    return of(data).pipe(delay(4000));
  }
}
