// Pricing Plans - Single source of truth for consistent pricing across the site

export const PLANS = {
  FREE: {
    id: 'FREE' as const,
    name: 'Free',
    price: 0,
    priceMonthly: 0,
    priceAnnual: 0,
    features: {
      lessons: 'All 83 lessons',
      playground: false,
      challenges: false,
      certificate: false,
      support: 'Community forum',
      downloads: false,
      adFree: false,
    },
    limits: {
      playgroundRuns: 0,
      challengesAccess: 0,
    }
  },
  PRO: {
    id: 'PRO' as const,
    name: 'Pro',
    price: 19,
    priceMonthly: 19,
    priceAnnual: 180, // 20% discount (15/month)
    features: {
      lessons: 'All 83 lessons',
      playground: true,
      challenges: true,
      certificate: true,
      support: 'Priority email',
      downloads: true,
      adFree: true,
    },
    limits: {
      playgroundRuns: -1, // Unlimited
      challengesAccess: -1, // Unlimited
    }
  },
  TEAMS: {
    id: 'TEAMS' as const,
    name: 'Teams',
    price: 49,
    priceMonthly: 49,
    priceAnnual: 468, // 20% discount (39/month per user)
    perUser: true,
    features: {
      lessons: 'All 83 lessons',
      playground: true,
      challenges: true,
      certificate: true,
      support: '24/7 Priority support',
      downloads: true,
      adFree: true,
      teamDashboard: true,
      analytics: true,
      sso: true,
    },
    limits: {
      playgroundRuns: -1,
      challengesAccess: -1,
      teamMembers: -1,
    }
  }
} as const;

export type PlanType = keyof typeof PLANS;

// Feature flags for content locking
export const FEATURE_FLAGS: Record<string, PlanType[]> = {
  PLAYGROUND: ['PRO', 'TEAMS'],
  CHALLENGES: ['PRO', 'TEAMS'],
  CERTIFICATE: ['PRO', 'TEAMS'],
  DOWNLOADS: ['PRO', 'TEAMS'],
  TEAM_FEATURES: ['TEAMS'],
};

// Check if user has access to feature
export function hasAccess(userPlan: PlanType, feature: keyof typeof FEATURE_FLAGS): boolean {
  return FEATURE_FLAGS[feature].includes(userPlan);
}

// Get plan details
export function getPlanDetails(planId: PlanType) {
  return PLANS[planId];
}

// Calculate savings for annual billing
export function getAnnualSavings(planId: PlanType) {
  const plan = PLANS[planId];
  const monthlyTotal = plan.priceMonthly * 12;
  const annualTotal = plan.priceAnnual;
  return monthlyTotal - annualTotal;
}
