import { createReducer, on } from '@ngrx/store';
import { DashboardState } from '../../core/models/dashboard.models';
import * as DashboardActions from '../actions/dashboard.actions';

export const initialState: DashboardState = {
  loading: false,
  ready: false,
  error: null,
  flightStatus: null,
  weatherInfo: null,
  gateInfo: null,
};

export const dashboardReducer = createReducer(
  initialState,

  on(DashboardActions.loadDashboard, (state): DashboardState => ({
    ...state,
    loading: true,
    ready: false,
    error: null,
  })),

  on(DashboardActions.loadDashboardSuccess, (state, { flightStatus, weatherInfo, gateInfo }): DashboardState => ({
    ...state,
    loading: false,
    ready: true,
    error: null,
    flightStatus,
    weatherInfo,
    gateInfo,
  })),

  on(DashboardActions.loadDashboardFailure, (state, { error }): DashboardState => ({
    ...state,
    loading: false,
    ready: false,
    error,
  })),

  on(DashboardActions.retryDashboardLoad, (state): DashboardState => ({
    ...state,
    loading: true,
    ready: false,
    error: null,
  }))
);
