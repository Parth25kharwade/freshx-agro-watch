import React from 'react';
import { Shield, TrendingUp, Users, DollarSign, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { policyData } from '@/data/mockData';

const Policy: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="status-active">Active</Badge>;
      case 'pending':
        return <Badge className="status-warning">Pending</Badge>;
      case 'inactive':
        return <Badge className="status-inactive">Inactive</Badge>;
      default:
        return <Badge className="status-inactive">Unknown</Badge>;
    }
  };

  const impactData = [
    { policy: 'MSP', before: 28, after: 32 },
    { policy: 'Storage Subsidy', before: 65, after: 70 },
    { policy: 'Transport Incentive', before: 45, after: 48 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Policy & Intervention Tools</h1>
          <p className="text-muted-foreground mt-1">
            Government policy management and impact analysis
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <FileText size={16} className="mr-2" />
          New Policy
        </Button>
      </div>

      {/* Policy Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {policyData.filter(p => p.status === 'active').length}
            </p>
            <p className="text-sm text-muted-foreground">Active Policies</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-success/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Users className="w-6 h-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {policyData.reduce((acc, p) => acc + p.beneficiaries, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Beneficiaries</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-secondary-blue/10 p-3 rounded-full w-fit mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-secondary-blue" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              ₹{(policyData.reduce((acc, p) => acc + p.budget, 0) / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-muted-foreground">Total Budget</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-warning/10 p-3 rounded-full w-fit mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">+12.3%</p>
            <p className="text-sm text-muted-foreground">Avg. Impact</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Policies */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle>Active Policy Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {policyData.map((policy) => (
              <div key={policy.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-foreground">{policy.name}</h3>
                    {getStatusBadge(policy.status)}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Impact</p>
                    <p className="font-semibold text-success">{policy.impact}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Beneficiaries:</span>
                    <p className="font-medium text-foreground">{policy.beneficiaries.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Budget:</span>
                    <p className="font-medium text-foreground">₹{(policy.budget / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Policy ID:</span>
                    <p className="font-medium text-foreground">{policy.id}</p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit Policy
                  </Button>
                  {policy.status === 'pending' && (
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                      Approve
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Policy Impact Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-professional">
          <CardHeader>
            <CardTitle>Policy Impact Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="policy" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Bar dataKey="before" fill="hsl(var(--muted))" name="Before" radius={[2, 2, 0, 0]} />
                <Bar dataKey="after" fill="hsl(var(--primary))" name="After" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardHeader>
            <CardTitle>Subsidy Allocation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Minimum Support Price</span>
                  <span className="font-medium text-foreground">₹2.5M / ₹2.5M</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Storage Subsidy</span>
                  <span className="font-medium text-foreground">₹1.4M / ₹1.8M</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Transport Incentive</span>
                  <span className="font-medium text-foreground">₹0M / ₹3.2M</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                Allocate Subsidies
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle>Quick Policy Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <BarChart3 className="w-6 h-6" />
              <span>Generate Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="w-6 h-6" />
              <span>Review Beneficiaries</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <DollarSign className="w-6 h-6" />
              <span>Budget Analysis</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Policy;