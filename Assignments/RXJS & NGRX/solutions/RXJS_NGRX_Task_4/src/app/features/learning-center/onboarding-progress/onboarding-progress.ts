import { Component, Input } from '@angular/core';

interface OnboardingStep {
  label: string;
  key: string;
}

const STEPS: OnboardingStep[] = [
  { label: 'Login', key: 'login' },
  { label: 'Profile', key: 'profile' },
  { label: 'Preferences', key: 'preferences' },
  { label: 'Recommendations', key: 'recommendations' },
  { label: 'Complete', key: 'complete' },
];

@Component({
  selector: 'app-onboarding-progress',
  imports: [],
  templateUrl: './onboarding-progress.html',
  styleUrl: './onboarding-progress.scss',
})
export class OnboardingProgressComponent {
  @Input() isLoggedIn = false;
  @Input() onboardingInProgress = false;
  @Input() onboardingCompleted = false;

  steps = STEPS;

  get activeStep(): number {
    if (!this.isLoggedIn) return -1;
    if (this.onboardingCompleted) return this.steps.length;
    if (this.onboardingInProgress) {
      const elapsed = Math.floor((Date.now() % 4000) / 1000);
      return Math.min(elapsed, this.steps.length - 1);
    }
    return 0;
  }

  isStepComplete(index: number): boolean {
    return index < this.activeStep;
  }

  isStepActive(index: number): boolean {
    return index === this.activeStep;
  }
}
