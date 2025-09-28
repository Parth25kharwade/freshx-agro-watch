import React from 'react';
import { Truck, Clock, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { vehicleTrackingData } from '@/data/mockData';
import { cn } from '@/lib/utils';

const SupplyChain: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-transit':
        return <Badge className="bg-secondary-blue/10 text-secondary-blue border border-secondary-blue/20">In Transit</Badge>;
      case 'loading':
        return <Badge className="status-warning">Loading</Badge>;
      case 'delayed':
        return <Badge className="bg-destructive/10 text-destructive border border-destructive/20">Delayed</Badge>;
      case 'delivered':
        return <Badge className="status-active">Delivered</Badge>;
      default:
        return <Badge className="status-inactive">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-transit':
        return <Truck className="w-4 h-4 text-secondary-blue" />;
      case 'loading':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'delayed':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Supply Chain Monitoring</h1>
          <p className="text-muted-foreground mt-1">
            Real-time tracking of onion transportation and logistics
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg px-4 py-2">
          <div className="text-sm text-muted-foreground">Active Vehicles</div>
          <div className="font-bold text-2xl text-foreground">
            {vehicleTrackingData.filter(v => v.status !== 'delivered').length}
          </div>
        </div>
      </div>

      {/* Real-time Transport Map Placeholder */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Live Transport Tracking Map</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-muted-foreground">Interactive Transport Map</p>
              <p className="text-muted-foreground">Real-time vehicle positions and routes</p>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-secondary-blue"></div>
                  <span className="text-sm text-muted-foreground">In Transit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-sm text-muted-foreground">Loading</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span className="text-sm text-muted-foreground">Delayed</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Tracking List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {vehicleTrackingData.map((vehicle) => (
          <Card key={vehicle.id} className="card-professional">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(vehicle.status)}
                  <span>Vehicle {vehicle.id}</span>
                </CardTitle>
                {getStatusBadge(vehicle.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin size={16} className="text-muted-foreground" />
                    <span className="font-medium text-foreground">{vehicle.route}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Driver: {vehicle.driver}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{vehicle.progress}%</span>
                  </div>
                  <Progress 
                    value={vehicle.progress} 
                    className="h-2"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div>
                    <span className="text-muted-foreground text-sm">ETA:</span>
                    <p className="font-medium text-foreground">{vehicle.eta}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground text-sm">Status:</span>
                    <p className={cn(
                      "font-medium capitalize",
                      vehicle.status === 'in-transit' && "text-secondary-blue",
                      vehicle.status === 'loading' && "text-warning",
                      vehicle.status === 'delayed' && "text-destructive",
                      vehicle.status === 'delivered' && "text-success"
                    )}>
                      {vehicle.status.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-secondary-blue/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Truck className="w-6 h-6 text-secondary-blue" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {vehicleTrackingData.filter(v => v.status === 'in-transit').length}
            </p>
            <p className="text-sm text-muted-foreground">In Transit</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-warning/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {vehicleTrackingData.filter(v => v.status === 'loading').length}
            </p>
            <p className="text-sm text-muted-foreground">Loading</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-destructive/10 p-3 rounded-full w-fit mx-auto mb-3">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {vehicleTrackingData.filter(v => v.status === 'delayed').length}
            </p>
            <p className="text-sm text-muted-foreground">Delayed</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-success/10 p-3 rounded-full w-fit mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {vehicleTrackingData.filter(v => v.status === 'delivered').length}
            </p>
            <p className="text-sm text-muted-foreground">Delivered</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplyChain;