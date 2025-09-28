import React from 'react';
import { Moon, Sun, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const { sidebarCollapsed, isDarkMode, toggleDarkMode, currentUser } = useApp();

  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-40 h-16 bg-background/95 backdrop-blur-sm border-b border-border transition-all duration-300 flex items-center justify-between px-6',
        sidebarCollapsed ? 'left-16' : 'left-64'
      )}
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-foreground">
          FreshX Onion Supply Chain Monitor
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="text-muted-foreground hover:text-foreground"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-muted/50">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User size={16} />
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium text-foreground">{currentUser.name}</div>
            <div className="text-xs text-muted-foreground">{currentUser.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;