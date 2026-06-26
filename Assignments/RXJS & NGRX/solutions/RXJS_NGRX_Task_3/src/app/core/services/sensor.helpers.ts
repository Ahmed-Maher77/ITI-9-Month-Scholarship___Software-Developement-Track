import { TemperatureStatus, TrafficLevel } from '../models/sensor.models';

export function getTemperatureStatus(value: number): TemperatureStatus {
  if (value < 25) return 'Cool';
  if (value < 35) return 'Normal';
  return 'Hot';
}

export function getTrafficColorClass(level: TrafficLevel): string {
  switch (level) {
    case 'Low':
      return 'traffic-low';
    case 'Moderate':
      return 'traffic-moderate';
    case 'High':
      return 'traffic-high';
  }
}

export function formatTime(date: Date | null): string {
  if (!date) return '--:--:--';
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function formatCountdown(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
