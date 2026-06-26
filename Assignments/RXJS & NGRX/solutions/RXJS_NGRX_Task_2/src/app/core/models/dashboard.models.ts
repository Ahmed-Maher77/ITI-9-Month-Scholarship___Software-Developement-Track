export interface FlightStatus {
  totalFlights: number;
  delayedFlights: number;
  cancelledFlights: number;
}

export interface WeatherInfo {
  temperature: number;
  condition: string;
  visibility: string;
}

export interface GateInfo {
  availableGates: number;
  occupiedGates: number;
  maintenanceGates: number;
}

export interface DashboardState {
  loading: boolean;
  ready: boolean;
  error: string | null;
  flightStatus: FlightStatus | null;
  weatherInfo: WeatherInfo | null;
  gateInfo: GateInfo | null;
}
