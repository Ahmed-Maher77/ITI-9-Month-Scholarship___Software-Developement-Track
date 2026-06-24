import { createReducer, on } from '@ngrx/store';
import * as LearningActions from '../actions/learning.actions';
import { Activity, User } from '../../core/models';

export interface LearningState {
  isLoggedIn: boolean;
  onboardingInProgress: boolean;
  onboardingCompleted: boolean;
  activities: Activity[];
  currentUser: User | null;
}

export const initialState: LearningState = {
  isLoggedIn: false,
  onboardingInProgress: false,
  onboardingCompleted: false,
  activities: [],
  currentUser: null,
};

export const learningReducer = createReducer(
  initialState,

  on(LearningActions.login, (state, { user }): LearningState => ({
    ...state,
    isLoggedIn: true,
    currentUser: user,
  })),

  on(LearningActions.logout, (state): LearningState => ({
    ...state,
    isLoggedIn: false,
    onboardingInProgress: false,
    onboardingCompleted: false,
    currentUser: null,
  })),

  on(LearningActions.enrollInCourse, (state): LearningState => ({
    ...state,
  })),

  on(LearningActions.addActivity, (state, { activity }): LearningState => ({
    ...state,
    activities: [activity, ...state.activities],
  })),

  on(LearningActions.startOnboarding, (state): LearningState => ({
    ...state,
    onboardingInProgress: true,
    onboardingCompleted: false,
  })),

  on(LearningActions.completeOnboarding, (state): LearningState => ({
    ...state,
    onboardingInProgress: false,
    onboardingCompleted: true,
  })),
);
