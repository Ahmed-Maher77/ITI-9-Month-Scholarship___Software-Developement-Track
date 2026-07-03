import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LearningState } from '../reducers/learning.reducer';

export const selectLearningState = createFeatureSelector<LearningState>('learning');

export const selectIsLoggedIn = createSelector(
  selectLearningState,
  (state) => state.isLoggedIn
);

export const selectOnboardingInProgress = createSelector(
  selectLearningState,
  (state) => state.onboardingInProgress
);

export const selectOnboardingCompleted = createSelector(
  selectLearningState,
  (state) => state.onboardingCompleted
);

export const selectActivities = createSelector(
  selectLearningState,
  (state) => state.activities
);

export const selectCurrentUser = createSelector(
  selectLearningState,
  (state) => state.currentUser
);
