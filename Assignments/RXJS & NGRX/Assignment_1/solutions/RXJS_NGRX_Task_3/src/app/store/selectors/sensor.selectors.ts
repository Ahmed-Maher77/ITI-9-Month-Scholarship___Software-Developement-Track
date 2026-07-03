import { createSelector } from '@ngrx/store';
import { getTemperatureStatus } from '../../core/services/sensor.helpers';
import { selectSensorsState } from '../reducers/sensor.reducer';

export const selectMonitoring = createSelector(
  selectSensorsState,
  (state) => state.monitoring,
);

export const selectMonitoringCompleted = createSelector(
  selectSensorsState,
  (state) => state.monitoringCompleted,
);

export const selectInitializing = createSelector(
  selectSensorsState,
  (state) => state.initializing,
);

export const selectTemperature = createSelector(
  selectSensorsState,
  (state) => state.temperature,
);

export const selectTraffic = createSelector(
  selectSensorsState,
  (state) => state.traffic,
);

export const selectLastUpdated = createSelector(
  selectSensorsState,
  (state) => state.lastUpdated,
);

export const selectActivityFeed = createSelector(
  selectSensorsState,
  (state) => state.activityFeed,
);

export const selectRemainingSeconds = createSelector(
  selectSensorsState,
  (state) => state.remainingSeconds,
);

export const selectTemperatureHistory = createSelector(
  selectSensorsState,
  (state) => state.temperatureHistory,
);

export const selectTotalUpdates = createSelector(
  selectSensorsState,
  (state) => state.totalUpdates,
);

export const selectTemperatureStatus = createSelector(selectTemperature, (temp) =>
  temp ? getTemperatureStatus(temp.value) : null,
);

export const selectAverageTemperature = createSelector(
  selectTemperatureHistory,
  (history) => {
    if (history.length === 0) return null;
    const sum = history.reduce((acc, v) => acc + v, 0);
    return Math.round((sum / history.length) * 10) / 10;
  },
);

export const selectPeakTraffic = createSelector(selectTraffic, (traffic) =>
  traffic ? traffic.vehicles : null,
);

export const selectSensorHealth = createSelector(
  selectMonitoring,
  selectMonitoringCompleted,
  (monitoring, completed) => ({
    temperature: monitoring && !completed,
    traffic: monitoring && !completed,
  }),
);
