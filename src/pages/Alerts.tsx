import React, { useState } from 'react';
import { Bell, AlertTriangle, Clock, CheckCircle, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { alertsData } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Alerts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAlerts = alertsData.filter(alert => {
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-destructive/10 text-destructive border border-destructive/20">Critical</Badge>;
      case 'high':
        return <Badge className="bg-warning/10 text-warning border border-warning/20">High</Badge>;
      case 'medium':
        return <Badge className="bg-secondary-blue/10 text-secondary-blue border border-secondary-blue/20">Medium</Badge>;
      case 'low':
        return <Badge className="status-inactive">Low</Badge>;
      default:
        return <Badge className="status-inactive">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="status-warning">Pending</Badge>;
      case 'acknowledged':
        return <Badge className="bg-secondary-blue/10 text-secondary-blue border border-secondary-blue/20">Acknowledged</Badge>;
      case 'resolved':
        return <Badge className="status-active">Resolved</Badge>;
      default:
        return <Badge className="status-inactive">Unknown</Badge>;
    }
  };

  const getAlertIcon = (type: string, severity: string) => {
    switch (type) {
      case 'spoilage':
        return <AlertTriangle className={cn('w-5 h-5', severity === 'critical' ? 'text-destructive' : 'text-warning')} />;
      case 'stock':
        return <Bell className={cn('w-5 h-5', severity === 'critical' ? 'text-destructive' : 'text-warning')} />;
      case 'transport':
        return <Clock className={cn('w-5 h-5', severity === 'critical' ? 'text-destructive' : 'text-warning')} />;
      default:
        return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const handleAction = (alertId: string, action: 'acknowledge' | 'resolve' | 'escalate') => {
    alert(`${action} alert ${alertId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage system alerts and notifications
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="bg-card border border-border rounded-lg px-4 py-2">
            <div className="text-sm text-muted-foreground">Critical Alerts</div>
            <div className="font-bold text-xl text-destructive">
              {alertsData.filter(a => a.severity === 'critical' && a.status === 'pending').length}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg px-4 py-2">
            <div className="text-sm text-muted-foreground">Pending</div>
            <div className="font-bold text-xl text-foreground">
              {alertsData.filter(a => a.status === 'pending').length}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="card-professional">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search alerts by message, type, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter size={16} className="mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className={cn(
            "card-professional",
            alert.severity === 'critical' && alert.status === 'pending' && "border-destructive/30 bg-destructive/5"
          )}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="mt-1">
                    {getAlertIcon(alert.type, alert.severity)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-foreground">Alert {alert.id}</span>
                      {getSeverityBadge(alert.severity)}
                      {getStatusBadge(alert.status)}
                    </div>
                    <p className="text-foreground">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Type: {alert.type}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                {alert.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction(alert.id, 'acknowledge')}
                    >
                      Acknowledge
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction(alert.id, 'resolve')}
                      className="text-success hover:text-success"
                    >
                      Resolve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction(alert.id, 'escalate')}
                      className="text-destructive hover:text-destructive"
                    >
                      Escalate
                    </Button>
                  </div>
                )}
                
                {alert.status === 'acknowledged' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAction(alert.id, 'resolve')}
                    className="text-success hover:text-success"
                  >
                    <CheckCircle size={16} className="mr-1" />
                    Resolve
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card className="card-professional">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Bell size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No alerts found</p>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Alerts;