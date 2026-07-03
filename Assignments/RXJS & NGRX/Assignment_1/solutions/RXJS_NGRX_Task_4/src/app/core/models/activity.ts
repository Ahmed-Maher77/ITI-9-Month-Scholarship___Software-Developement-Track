export interface Activity {
  id: string;
  timestamp: Date;
  message: string;
  type: 'login' | 'logout' | 'enroll' | 'onboarding' | 'system';
}
