import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  unit,
  change,
  trend,
  icon: Icon,
  className,
}) => {
  return (
    <Card className={cn('card-professional p-6', className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-foreground">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
          </div>
          {change && (
            <div className="flex items-center space-x-1 mt-2">
              {trend === 'up' ? (
                <TrendingUp size={16} className="text-success" />
              ) : (
                <TrendingDown size={16} className="text-destructive" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  trend === 'up' ? 'text-success' : 'text-destructive'
                )}
              >
                {change}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        <div className="bg-primary/10 p-3 rounded-xl">
          <Icon size={24} className="text-primary" />
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;