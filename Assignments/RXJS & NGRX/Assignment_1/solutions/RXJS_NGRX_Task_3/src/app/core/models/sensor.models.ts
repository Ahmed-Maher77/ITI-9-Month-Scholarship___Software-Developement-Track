export interface TemperatureData {
  value: number;
  unit: '°C';
  timestamp: Date;
}

export interface TrafficData {
  level: 'Low' | 'Moderate' | 'High';
  vehicles: number;
  timestamp: Date;
}

export type TrafficLevel = TrafficData['level'];

export interface ActivityEvent {
  id: string;
  type: 'temperature' | 'traffic';
  message: string;
  timestamp: Date;
}

export interface SensorState {
  monitoring: boolean;
  monitoringCompleted: boolean;
  initializing: boolean;
  temperature: TemperatureData | null;
  traffic: TrafficData | null;
  lastUpdated: Date | null;
  activityFeed: ActivityEvent[];
  remainingSeconds: number;
  temperatureHistory: number[];
  totalUpdates: number;
}

export type TemperatureStatus = 'Cool' | 'Normal' | 'Hot';
