import { createAction, props } from '@ngrx/store';
import { FlightStatus, WeatherInfo, GateInfo } from '../../core/models/dashboard.models';

export const loadDashboard = createAction('[Dashboard] Load Dashboard');

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Success',
  props<{ flightStatus: FlightStatus; weatherInfo: WeatherInfo; gateInfo: GateInfo }>()
);

export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboard Failure',
  props<{ error: string }>()
);

export const retryDashboardLoad = createAction('[Dashboard] Retry Dashboard Load');
