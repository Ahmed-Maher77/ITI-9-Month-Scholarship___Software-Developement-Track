import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../../core/models/dashboard.models';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectLoading = createSelector(
  selectDashboardState,
  (state) => state.loading
);

export const selectReady = createSelector(
  selectDashboardState,
  (state) => state.ready
);

export const selectError = createSelector(
  selectDashboardState,
  (state) => state.error
);

export const selectFlightStatus = createSelector(
  selectDashboardState,
  (state) => state.flightStatus
);

export const selectWeatherInfo = createSelector(
  selectDashboardState,
  (state) => state.weatherInfo
);

export const selectGateInfo = createSelector(
  selectDashboardState,
  (state) => state.gateInfo
);
