import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { dashboardReducer } from './store/reducers/dashboard.reducer';
import { loadDashboard$ } from './store/effects/dashboard.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ dashboard: dashboardReducer }),
    provideEffects({ loadDashboard$ }),
  ]
};
