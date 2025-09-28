import React, { useState } from 'react';
import { Download, Calendar, Filter, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { priceComparisonData, supplyDemandData, warehouseStatusData } from '@/data/mockData';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('6months');
  const [region, setRegion] = useState('all');

  const exportReport = (format: 'csv' | 'pdf') => {
    // Mock export functionality
    alert(`Exporting ${format.toUpperCase()} report...`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive supply chain analytics and data insights
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => exportReport('csv')}>
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download size={16} className="mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="card-professional">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex space-x-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <Calendar size={16} className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>

              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-40">
                  <Filter size={16} className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">12.5%</p>
            <p className="text-sm text-muted-foreground">Price Increase (YoY)</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-success/10 p-3 rounded-full w-fit mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">95.2%</p>
            <p className="text-sm text-muted-foreground">Supply Efficiency</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-warning/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Calendar className="w-6 h-6 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">4.2 days</p>
            <p className="text-sm text-muted-foreground">Avg. Transit Time</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Trends */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle>Price Trends Analysis (₹/kg)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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

        {/* Storage Distribution */}
        <Card className="card-professional">
          <CardHeader>
            <CardTitle>Storage Capacity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={warehouseStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
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
          </CardContent>
        </Card>
      </div>

      {/* Regional Supply vs Demand */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle>Regional Supply vs Demand Analysis (MT)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={supplyDemandData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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

      {/* Report Summary */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle>Report Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Key Insights</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Supply efficiency has improved by 5.2% compared to last quarter</li>
                <li>• East region shows highest demand-supply gap requiring intervention</li>
                <li>• Average transportation time reduced by 0.8 days</li>
                <li>• Storage utilization at optimal 75% capacity</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Recommendations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Increase storage capacity in East region by 20%</li>
                <li>• Implement dynamic pricing for better price stability</li>
                <li>• Focus farmer training programs in low-yield areas</li>
                <li>• Expand cold storage network for reduced spoilage</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;