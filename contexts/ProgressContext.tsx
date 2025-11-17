"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface LessonProgress {
  lessonSlug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  progress: number; // 0-100
  timeSpent: number; // minutes
  lastViewed: Date;
}

interface ChallengeProgress {
  challengeId: string;
  completed: boolean;
  points: number;
  completedAt?: Date;
}

interface ProgressContextType {
  lessonProgress: Map<string, LessonProgress>;
  challengeProgress: Map<string, ChallengeProgress>;
  totalPoints: number;
  completedLessons: number;
  completedChallenges: number;
  markLessonComplete: (slug: string, difficulty: string) => void;
  updateLessonProgress: (slug: string, progress: number, timeSpent?: number) => void;
  markChallengeComplete: (challengeId: string, points: number) => void;
  getLessonProgress: (slug: string) => LessonProgress | undefined;
  getChallengeProgress: (challengeId: string) => ChallengeProgress | undefined;
  isLessonCompleted: (slug: string) => boolean;
  isChallengeCompleted: (challengeId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY_LESSONS = 'learnllm_lesson_progress';
const STORAGE_KEY_CHALLENGES = 'learnllm_challenge_progress';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [lessonProgress, setLessonProgress] = useState<Map<string, LessonProgress>>(new Map());
  const [challengeProgress, setChallengeProgress] = useState<Map<string, ChallengeProgress>>(new Map());

  // Load progress from localStorage
  useEffect(() => {
    if (user) {
      const storageKey = `${STORAGE_KEY_LESSONS}_${user.id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          const map = new Map(Object.entries(data).map(([key, value]: [string, any]) => [
            key,
            { ...value, lastViewed: new Date(value.lastViewed) }
          ]));
          setLessonProgress(map);
        } catch (e) {
          console.error('Failed to load lesson progress:', e);
        }
      }

      const challengeStorageKey = `${STORAGE_KEY_CHALLENGES}_${user.id}`;
      const storedChallenges = localStorage.getItem(challengeStorageKey);
      if (storedChallenges) {
        try {
          const data = JSON.parse(storedChallenges);
          const map = new Map(Object.entries(data).map(([key, value]: [string, any]) => [
            key,
            { ...value, completedAt: value.completedAt ? new Date(value.completedAt) : undefined }
          ]));
          setChallengeProgress(map);
        } catch (e) {
          console.error('Failed to load challenge progress:', e);
        }
      }
    }
  }, [user]);

  // Save progress to localStorage
  useEffect(() => {
    if (user && lessonProgress.size > 0) {
      const storageKey = `${STORAGE_KEY_LESSONS}_${user.id}`;
      const data = Object.fromEntries(lessonProgress);
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [lessonProgress, user]);

  useEffect(() => {
    if (user && challengeProgress.size > 0) {
      const storageKey = `${STORAGE_KEY_CHALLENGES}_${user.id}`;
      const data = Object.fromEntries(challengeProgress);
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [challengeProgress, user]);

  const markLessonComplete = (slug: string, difficulty: string) => {
    const existing = lessonProgress.get(slug);
    const updated: LessonProgress = {
      lessonSlug: slug,
      difficulty: difficulty as any,
      completed: true,
      progress: 100,
      timeSpent: existing?.timeSpent || 0,
      lastViewed: new Date(),
    };

    setLessonProgress(new Map(lessonProgress.set(slug, updated)));

    // TODO: Sync to backend
    // await fetch('/api/progress/lesson', { method: 'POST', body: JSON.stringify(updated) });
  };

  const updateLessonProgress = (slug: string, progress: number, timeSpent?: number) => {
    const existing = lessonProgress.get(slug);
    const updated: LessonProgress = {
      lessonSlug: slug,
      difficulty: existing?.difficulty || 'beginner',
      completed: progress === 100,
      progress,
      timeSpent: timeSpent !== undefined ? timeSpent : (existing?.timeSpent || 0),
      lastViewed: new Date(),
    };

    setLessonProgress(new Map(lessonProgress.set(slug, updated)));
  };

  const markChallengeComplete = (challengeId: string, points: number) => {
    const updated: ChallengeProgress = {
      challengeId,
      completed: true,
      points,
      completedAt: new Date(),
    };

    setChallengeProgress(new Map(challengeProgress.set(challengeId, updated)));

    // TODO: Sync to backend
    // await fetch('/api/progress/challenge', { method: 'POST', body: JSON.stringify(updated) });
  };

  const getLessonProgress = (slug: string) => lessonProgress.get(slug);
  const getChallengeProgress = (challengeId: string) => challengeProgress.get(challengeId);
  const isLessonCompleted = (slug: string) => lessonProgress.get(slug)?.completed || false;
  const isChallengeCompleted = (challengeId: string) => challengeProgress.get(challengeId)?.completed || false;

  const totalPoints = Array.from(challengeProgress.values())
    .reduce((sum, challenge) => sum + (challenge.completed ? challenge.points : 0), 0);

  const completedLessons = Array.from(lessonProgress.values())
    .filter(lesson => lesson.completed).length;

  const completedChallenges = Array.from(challengeProgress.values())
    .filter(challenge => challenge.completed).length;

  return (
    <ProgressContext.Provider
      value={{
        lessonProgress,
        challengeProgress,
        totalPoints,
        completedLessons,
        completedChallenges,
        markLessonComplete,
        updateLessonProgress,
        markChallengeComplete,
        getLessonProgress,
        getChallengeProgress,
        isLessonCompleted,
        isChallengeCompleted,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
