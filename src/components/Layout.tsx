import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const Layout: React.FC = () => {
  const { sidebarCollapsed } = useApp();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Sidebar />
      <Header />
      <main
        className={cn(
          'pt-20 pb-6 transition-all duration-300 min-h-screen',
          sidebarCollapsed ? 'pl-20' : 'pl-68'
        )}
      >
        <div className="px-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;