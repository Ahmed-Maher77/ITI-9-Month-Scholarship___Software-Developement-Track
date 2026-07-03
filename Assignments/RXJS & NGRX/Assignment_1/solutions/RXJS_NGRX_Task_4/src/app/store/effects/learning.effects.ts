import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, delay, map, of, tap } from 'rxjs';
import * as LearningActions from '../actions/learning.actions';
import { Activity } from '../../core/models';

@Injectable()
export class LearningEffects {
  private actions$ = inject(Actions);

  private createActivity(message: string, type: Activity['type']): Activity {
    return {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      message,
      type,
    };
  }

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearningActions.login),
      concatMap(({ user }) => {
        const loginActivity = this.createActivity(`${user.name} logged in`, 'login');

        const onboardingSequence$ = of(
          this.createActivity('Loading user profile...', 'onboarding'),
          this.createActivity('Initializing learning preferences...', 'onboarding'),
          this.createActivity('Fetching recommended courses...', 'onboarding'),
          this.createActivity('Onboarding complete!', 'onboarding'),
        ).pipe(
          concatMap((activity, index) =>
            of(activity).pipe(
              delay((index + 1) * 1000),
              tap(() => {
                if (index === 0) {
                  LearningActions.startOnboarding();
                }
              }),
              map((act) => LearningActions.addActivity({ activity: act })),
            ),
          ),
        );

        return of(
          LearningActions.addActivity({ activity: loginActivity }),
          LearningActions.startOnboarding(),
        ).pipe(
          concatMap((action) =>
            action.type === '[Learning] Start Onboarding'
              ? of(action).pipe(
                  delay(500),
                  concatMap(() => onboardingSequence$),
                )
              : of(action),
          ),
        );
      }),
    ),
  );

  enrollmentEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearningActions.enrollInCourse),
      map(({ courseName }) => {
        const activity = this.createActivity(
          `User enrolled in ${courseName}`,
          'enroll',
        );
        return LearningActions.addActivity({ activity });
      }),
    ),
  );

  logoutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LearningActions.logout),
      map(() => {
        const activity = this.createActivity('User logged out', 'logout');
        return LearningActions.addActivity({ activity });
      }),
    ),
  );
}
