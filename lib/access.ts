// Access control utilities for content gating

export type Plan = "FREE" | "PRO" | "TEAMS";
export type Role = "USER" | "EMPLOYEE" | "ADMIN";
export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

interface UserAccess {
  plan: Plan;
  role: Role;
}

// Check if user has full access (Admin, Employee, or paid plan)
export function hasFullAccess(user: UserAccess | null): boolean {
  if (!user) return false;

  // Admins and employees always have full access
  if (user.role === "ADMIN" || user.role === "EMPLOYEE") {
    return true;
  }

  // Pro and Teams plans have full access
  if (user.plan === "PRO" || user.plan === "TEAMS") {
    return true;
  }

  return false;
}

// Check if user can access specific difficulty level
export function canAccessDifficulty(user: UserAccess | null, difficulty: Difficulty): boolean {
  // Beginner content is always free
  if (difficulty === "BEGINNER") {
    return true;
  }

  // Intermediate and Advanced require full access
  return hasFullAccess(user);
}

// Check if user can access challenges
export function canAccessChallenges(user: UserAccess | null): boolean {
  // Basic challenges are free, but we can gate specific ones later
  return true;
}

// Check if user can save playground experiments
export function canSavePlayground(user: UserAccess | null): boolean {
  return hasFullAccess(user);
}

// Check if user is admin
export function isAdmin(user: UserAccess | null): boolean {
  if (!user) return false;
  return user.role === "ADMIN";
}

// Check if user is employee or admin
export function isStaff(user: UserAccess | null): boolean {
  if (!user) return false;
  return user.role === "ADMIN" || user.role === "EMPLOYEE";
}

// Get content access message for upgrade prompts
export function getUpgradeMessage(difficulty: Difficulty): string {
  return `Upgrade to Pro to access ${difficulty.toLowerCase()} content and unlock all lessons.`;
}
