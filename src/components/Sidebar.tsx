import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Truck,
  BarChart3,
  Bell,
  Shield,
  UserCog,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Farmer Management', href: '/farmers', icon: Users },
  { name: 'Supply Chain', href: '/supply-chain', icon: Truck },
  { name: 'Analytics & Reports', href: '/analytics', icon: BarChart3 },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Policy Tools', href: '/policy', icon: Shield },
  { name: 'User Management', href: '/users', icon: UserCog },
  { name: 'Support', href: '/support', icon: HelpCircle },
];

const Sidebar: React.FC = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useApp();

  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-50 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">OT</span>
            </div>
            <span className="font-bold text-sidebar-foreground">OnioTrack</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-3 py-2 rounded-lg text-sidebar-foreground transition-colors group',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                sidebarCollapsed && 'justify-center'
              )
            }
          >
            <item.icon size={20} />
            {!sidebarCollapsed && <span className="font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn('text-xs text-sidebar-foreground/60', sidebarCollapsed && 'text-center')}>
          {!sidebarCollapsed ? 'OnioTrack v2.0' : 'v2.0'}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;