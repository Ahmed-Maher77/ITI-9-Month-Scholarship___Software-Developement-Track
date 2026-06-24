import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TemperatureData, TrafficData } from '../../core/models/sensor.models';

export const SensorActions = createActionGroup({
  source: 'Sensors',
  events: {
    'Start Monitoring': emptyProps(),
    'Update Temperature': props<{ temperature: TemperatureData }>(),
    'Update Traffic': props<{ traffic: TrafficData }>(),
    'Stop Monitoring': emptyProps(),
    'Tick Countdown': props<{ remainingSeconds: number }>(),
  },
});
