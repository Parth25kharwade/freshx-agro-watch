import React from 'react';
import { Package, Users, Truck, AlertTriangle } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { statsData, supplyChainData, warehouseStatusData, priceComparisonData, supplyDemandData } from '@/data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Real-time onion supply chain monitoring and analytics
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg px-4 py-2">
          <div className="text-sm text-muted-foreground">Last Updated</div>
          <div className="font-medium text-foreground">
            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Onion Stock"
          value={statsData.totalStock.value}
          unit={statsData.totalStock.unit}
          change={statsData.totalStock.change}
          trend={statsData.totalStock.trend as 'up' | 'down'}
          icon={Package}
        />
        <StatsCard
          title="Active Farmers"
          value={statsData.activeFarmers.value}
          change={statsData.activeFarmers.change}
          trend={statsData.activeFarmers.trend as 'up' | 'down'}
          icon={Users}
        />
        <StatsCard
          title="Active Vehicles"
          value={statsData.activeVehicles.value}
          change={statsData.activeVehicles.change}
          trend={statsData.activeVehicles.trend as 'up' | 'down'}
          icon={Truck}
        />
        <StatsCard
          title="Pending Requests"
          value={statsData.pendingRequests.value}
          change={statsData.pendingRequests.change}
          trend={statsData.pendingRequests.trend as 'up' | 'down'}
          icon={AlertTriangle}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Map Placeholder */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-primary" />
              <span>Live Transport Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground font-medium">Interactive Map</p>
                <p className="text-sm text-muted-foreground">Real-time vehicle tracking</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supply Chain Status */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle>Transport Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={supplyChainData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Warehouse Status */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle>Storage Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={warehouseStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {warehouseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {warehouseStatusData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Trends */}
        <Card className="card-professional lg:col-span-2">
          <CardHeader>
            <CardTitle>Price Trends (₹/kg)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={priceComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="farmgate" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Farmgate Price"
                />
                <Line 
                  type="monotone" 
                  dataKey="retail" 
                  stroke="hsl(var(--secondary-blue))" 
                  strokeWidth={3}
                  name="Retail Price"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Supply vs Demand */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle>Regional Supply vs Demand (MT)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={supplyDemandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar dataKey="supply" fill="hsl(var(--primary))" name="Supply" radius={[4, 4, 0, 0]} />
              <Bar dataKey="demand" fill="hsl(var(--secondary-blue))" name="Demand" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;