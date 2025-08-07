'use client';

import { createContext, useContext } from 'react';
import { Story, Filters, User, Category } from '@/app/types/types';

type PublicServerActions = {
  getUser: (id: string) => Promise<User | null>;
  UpdateUser: (data: FormData, user: User) => Promise<void>;
  getStories: (filters?: Filters) => Promise<Story[]>;
  getStory: (id: string) => Promise<Story | null>;
  getRadarStory: () => Promise<Story | null>;
  getRecommendations: () => Promise<Story[]>;
  getCategories: () => Promise<Category[]>;
  getSavedStories: (userId: string) => Promise<Story[]>;
  createStorySave: (storyId: string, userId: string) => Promise<void>;
  deleteStorySave: (storyId: string, userId: string) => Promise<void>;
  isStorySaved: (storyId: string, userId: string) => Promise<boolean>;
  createSubscriber: (email: string, phone?: string) => Promise<string>;
};

const PublicServerActionsContext = createContext<PublicServerActions | null>(null);

export function PublicServerActionsProvider({
  children,
  ...actions
}: {
  children: React.ReactNode;
} & PublicServerActions) {
  return (
    <PublicServerActionsContext.Provider value={actions}>
      {children}
    </PublicServerActionsContext.Provider>
  );
}

export function usePublicServerActions() {
  const context = useContext(PublicServerActionsContext);
  if (!context) {
    throw new Error('usePublicServerActions must be used within a PublicServerActionsProvider');
  }
  return context;
}
