// Paid tiers are disabled right now — growth mode. Keeping the single FREE
// plan here (instead of deleting the file) so any call-site that imports
// PLANS or getPlanDetails keeps compiling. When we turn paid plans back on,
// add PRO / TEAMS entries back to this object.

export const PLANS = {
  FREE: {
    id: 'FREE' as const,
    name: 'Free',
    price: 0,
    priceMonthly: 0,
    priceAnnual: 0,
    features: {
      lessons: 'All 110+ lessons',
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

export function getAnnualSavings(_planId: PlanType) {
  return 0;
}
