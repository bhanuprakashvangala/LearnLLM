// LearnLLM.dev is 100% free. This file used to define paid tiers —
// it now exposes a single FREE plan so legacy call-sites keep working.

export const PLANS = {
  FREE: {
    id: 'FREE' as const,
    name: 'Free',
    price: 0,
    priceMonthly: 0,
    priceAnnual: 0,
    features: {
      lessons: 'All 100+ lessons',
      playground: true,
      challenges: true,
      certificate: true,
      support: 'Community forum',
      downloads: true,
      adFree: true,
    },
    limits: {
      playgroundRuns: -1,
      challengesAccess: -1,
    },
  },
} as const;

export type PlanType = keyof typeof PLANS;

// All features are available to every signed-in user.
export const FEATURE_FLAGS: Record<string, PlanType[]> = {
  PLAYGROUND: ['FREE'],
  CHALLENGES: ['FREE'],
  CERTIFICATE: ['FREE'],
  DOWNLOADS: ['FREE'],
  TEAM_FEATURES: ['FREE'],
};

export function hasAccess(userPlan: PlanType, feature: keyof typeof FEATURE_FLAGS): boolean {
  return FEATURE_FLAGS[feature].includes(userPlan);
}

export function getPlanDetails(planId: PlanType) {
  return PLANS[planId];
}

// No annual savings because everything is free.
export function getAnnualSavings(_planId: PlanType) {
  return 0;
}
