import { createFeature, createReducer, on } from '@ngrx/store';
import {
  ACTIVITY_FEED_LIMIT,
  MONITORING_DURATION_SECONDS,
  TEMPERATURE_HISTORY_LIMIT,
} from '../../core/models/monitoring.constants';
import { ActivityEvent, SensorState } from '../../core/models/sensor.models';
import { SensorActions } from '../actions/sensor.actions';

export const initialState: SensorState = {
  monitoring: false,
  monitoringCompleted: false,
  initializing: false,
  temperature: null,
  traffic: null,
  lastUpdated: null,
  activityFeed: [],
  remainingSeconds: MONITORING_DURATION_SECONDS,
  temperatureHistory: [],
  totalUpdates: 0,
};

function prependActivity(
  feed: ActivityEvent[],
  event: ActivityEvent,
): ActivityEvent[] {
  return [event, ...feed].slice(0, ACTIVITY_FEED_LIMIT);
}

function createActivityId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const sensorFeature = createFeature({
  name: 'sensors',
  reducer: createReducer(
    initialState,

    on(SensorActions.startMonitoring, () => ({
      ...initialState,
      monitoring: true,
      initializing: true,
      remainingSeconds: MONITORING_DURATION_SECONDS,
    })),

    on(SensorActions.updateTemperature, (state, { temperature }) => ({
      ...state,
      temperature,
      lastUpdated: temperature.timestamp,
      initializing: false,
      totalUpdates: state.totalUpdates + 1,
      temperatureHistory: [...state.temperatureHistory, temperature.value].slice(
        -TEMPERATURE_HISTORY_LIMIT,
      ),
      activityFeed: prependActivity(state.activityFeed, {
        id: createActivityId(),
        type: 'temperature',
        message: `Temperature updated to ${temperature.value}${temperature.unit}`,
        timestamp: temperature.timestamp,
      }),
    })),

    on(SensorActions.updateTraffic, (state, { traffic }) => ({
      ...state,
      traffic,
      lastUpdated: traffic.timestamp,
      initializing: false,
      totalUpdates: state.totalUpdates + 1,
      activityFeed: prependActivity(state.activityFeed, {
        id: createActivityId(),
        type: 'traffic',
        message: `Traffic changed to ${traffic.level}`,
        timestamp: traffic.timestamp,
      }),
    })),

    on(SensorActions.stopMonitoring, (state) => ({
      ...state,
      monitoring: false,
      monitoringCompleted: true,
      remainingSeconds: 0,
    })),

    on(SensorActions.tickCountdown, (state, { remainingSeconds }) => ({
      ...state,
      remainingSeconds,
    })),
  ),
});

export const {
  name: sensorFeatureKey,
  reducer: sensorReducer,
  selectSensorsState,
} = sensorFeature;
