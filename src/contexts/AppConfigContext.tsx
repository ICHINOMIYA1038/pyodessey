"use client";

import { createContext, useContext, ReactNode } from "react";

export interface AppConfig {
  prefix: string; // e.g. "/pyodessey" or "/jsodessey"
  name: string; // e.g. "PyOdessey" or "JSOdessey"
  emoji: string; // e.g. "🐍" or "⚡"
  headerTitle: string; // e.g. "パイソンのぼうけん" or "ジャバスクリプトのぼうけん"
  language: string; // e.g. "Python" or "JavaScript"
  storageKeyPrefix: string; // e.g. "pyodessey" or "jsodessey"
}

const AppConfigContext = createContext<AppConfig | null>(null);

export function AppConfigProvider({
  config,
  children,
}: {
  config: AppConfig;
  children: ReactNode;
}) {
  return (
    <AppConfigContext.Provider value={config}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig(): AppConfig {
  const config = useContext(AppConfigContext);
  if (!config) {
    throw new Error("useAppConfig must be used within an AppConfigProvider");
  }
  return config;
}
