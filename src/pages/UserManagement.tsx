import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, UserCog, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usersData } from '@/data/mockData';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="status-active">Active</Badge>;
      case 'inactive':
        return <Badge className="status-inactive">Inactive</Badge>;
      default:
        return <Badge className="status-inactive">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-destructive/10 text-destructive border border-destructive/20">Admin</Badge>;
      case 'government':
        return <Badge className="bg-secondary-blue/10 text-secondary-blue border border-secondary-blue/20">Government</Badge>;
      case 'farmer':
        return <Badge className="bg-success/10 text-success border border-success/20">Farmer</Badge>;
      default:
        return <Badge className="status-inactive">Unknown</Badge>;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4 text-destructive" />;
      case 'government':
        return <UserCog className="w-4 h-4 text-secondary-blue" />;
      case 'farmer':
        return <UserCog className="w-4 h-4 text-success" />;
      default:
        return <UserCog className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management & Security</h1>
          <p className="text-muted-foreground mt-1">
            Manage user accounts, roles, and security settings
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus size={16} className="mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter user's name" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="user@oniotrack.gov.in" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="government">Government Officer</SelectItem>
                    <SelectItem value="farmer">Farmer Representative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                  Create User
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-primary/10 p-3 rounded-full w-fit mx-auto mb-3">
              <UserCog className="w-6 h-6 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{usersData.length}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-success/10 p-3 rounded-full w-fit mx-auto mb-3">
              <UserCog className="w-6 h-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {usersData.filter(u => u.status === 'active').length}
            </p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-destructive/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Shield className="w-6 h-6 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-foreground">
              {usersData.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-sm text-muted-foreground">Administrators</p>
          </CardContent>
        </Card>

        <Card className="card-professional">
          <CardContent className="p-6 text-center">
            <div className="bg-warning/10 p-3 rounded-full w-fit mx-auto mb-3">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <p className="text-2xl font-bold text-foreground">0</p>
            <p className="text-sm text-muted-foreground">Failed Logins</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-professional">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search users by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <Filter size={16} className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="farmer">Farmer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter size={16} className="mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-muted p-2 rounded-lg">
                      {getRoleIcon(user.role)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        {getRoleBadge(user.role)}
                        {getStatusBadge(user.status)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{user.email}</p>
                        <p>User ID: {user.id} • Last login: {user.lastLogin}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Logs */}
      <Card className="card-professional">
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">Successful login from Admin User</span>
              </div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">Password reset for Regional Officer</span>
              </div>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm">New user account created</span>
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;