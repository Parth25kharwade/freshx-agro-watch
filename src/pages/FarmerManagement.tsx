import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { farmersData } from '@/data/mockData';
import { cn } from '@/lib/utils';

const FarmerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredFarmers = farmersData.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || farmer.status === statusFilter;
    return matchesSearch && matchesStatus;
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Farmer Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage farmer registrations and onion stock allocation
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus size={16} className="mr-2" />
              Add Farmer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Farmer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter farmer's name" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+91 XXXXXXXXXX" />
              </div>
              <div>
                <Label htmlFor="warehouse">Assigned Warehouse</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WH-001">WH-001 - Delhi Central</SelectItem>
                    <SelectItem value="WH-002">WH-002 - Mumbai West</SelectItem>
                    <SelectItem value="WH-003">WH-003 - Bangalore South</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-gradient-primary hover:opacity-90">
                  Add Farmer
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="card-professional">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  placeholder="Search farmers by name, ID, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
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

      {/* Farmers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer) => (
          <Card key={farmer.id} className="card-professional">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{farmer.name}</CardTitle>
                {getStatusBadge(farmer.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Farmer ID:</span>
                  <p className="font-medium text-foreground">{farmer.id}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <p className="font-medium text-foreground">{farmer.location}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Stock:</span>
                  <p className="font-medium text-foreground">{farmer.stock} MT</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Warehouse:</span>
                  <p className="font-medium text-foreground">{farmer.warehouse}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Phone size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{farmer.phone}</span>
              </div>

              <div className="flex space-x-2 pt-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit size={14} className="mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFarmers.length === 0 && (
        <Card className="card-professional">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No farmers found</p>
              <p>Try adjusting your search criteria or add a new farmer.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FarmerManagement;