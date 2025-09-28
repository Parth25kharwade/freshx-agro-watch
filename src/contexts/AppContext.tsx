import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentUser: {
    name: string;
    role: string;
    avatar?: string;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const currentUser = {
    name: 'Admin User',
    role: 'Government Officer',
    avatar: undefined,
  };

  const value: AppContextType = {
    sidebarCollapsed,
    setSidebarCollapsed,
    isDarkMode,
    toggleDarkMode,
    currentUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};