import { createAction, props } from '@ngrx/store';
import { Activity, User } from '../../core/models';

export const login = createAction(
  '[Learning] Login',
  props<{ user: User }>()
);

export const logout = createAction(
  '[Learning] Logout'
);

export const enrollInCourse = createAction(
  '[Learning] Enroll In Course',
  props<{ courseName: string }>()
);

export const addActivity = createAction(
  '[Learning] Add Activity',
  props<{ activity: Activity }>()
);

export const startOnboarding = createAction(
  '[Learning] Start Onboarding'
);

export const completeOnboarding = createAction(
  '[Learning] Complete Onboarding'
);
