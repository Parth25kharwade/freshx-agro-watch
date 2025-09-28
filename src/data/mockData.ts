// Mock data for OnioTrack dashboard

export const statsData = {
  totalStock: { value: 50000, unit: 'MT', change: '+2.5%', trend: 'up' },
  activeFarmers: { value: 1200, unit: '', change: '+8.2%', trend: 'up' },
  activeVehicles: { value: 300, unit: '', change: '-1.2%', trend: 'down' },
  pendingRequests: { value: 75, unit: '', change: '+15.3%', trend: 'up' },
};

export const supplyChainData = [
  { name: 'In Transit', value: 120, color: '#3B82F6' },
  { name: 'At Warehouse', value: 180, color: '#10B981' },
  { name: 'Loading', value: 45, color: '#F59E0B' },
  { name: 'Unloading', value: 35, color: '#8B5CF6' },
];

export const warehouseStatusData = [
  { name: 'Used', value: 75, color: '#10B981' },
  { name: 'Available', value: 25, color: '#E5E7EB' },
];

export const priceComparisonData = [
  { month: 'Jan', farmgate: 25, retail: 45 },
  { month: 'Feb', farmgate: 28, retail: 48 },
  { month: 'Mar', farmgate: 32, retail: 55 },
  { month: 'Apr', farmgate: 30, retail: 52 },
  { month: 'May', farmgate: 35, retail: 60 },
  { month: 'Jun', farmgate: 38, retail: 65 },
];

export const supplyDemandData = [
  { region: 'North', supply: 12000, demand: 10500 },
  { region: 'South', supply: 8500, demand: 9200 },
  { region: 'East', supply: 15000, demand: 14200 },
  { region: 'West', supply: 11200, demand: 12800 },
  { region: 'Central', supply: 9800, demand: 8900 },
];

export const farmersData = [
  {
    id: 'F001',
    name: 'Rajesh Kumar',
    location: 'Punjab',
    stock: 150,
    status: 'active',
    warehouse: 'WH-001',
    phone: '+91 9876543210',
  },
  {
    id: 'F002',
    name: 'Amit Singh',
    location: 'Haryana',
    stock: 220,
    status: 'active',
    warehouse: 'WH-002',
    phone: '+91 9876543211',
  },
  {
    id: 'F003',
    name: 'Priya Sharma',
    location: 'Rajasthan',
    stock: 85,
    status: 'inactive',
    warehouse: 'WH-003',
    phone: '+91 9876543212',
  },
  {
    id: 'F004',
    name: 'Sunil Patel',
    location: 'Gujarat',
    stock: 190,
    status: 'active',
    warehouse: 'WH-001',
    phone: '+91 9876543213',
  },
];

export const vehicleTrackingData = [
  {
    id: 'V001',
    route: 'Delhi → Mumbai',
    status: 'in-transit',
    eta: '2 hours',
    progress: 75,
    driver: 'Ramesh Kumar',
  },
  {
    id: 'V002',
    route: 'Pune → Bangalore',
    status: 'loading',
    eta: '4 hours',
    progress: 20,
    driver: 'Suresh Patil',
  },
  {
    id: 'V003',
    route: 'Chennai → Hyderabad',
    status: 'delayed',
    eta: '6 hours',
    progress: 45,
    driver: 'Ravi Kumar',
  },
  {
    id: 'V004',
    route: 'Kolkata → Bhubaneswar',
    status: 'delivered',
    eta: 'Completed',
    progress: 100,
    driver: 'Bikash Das',
  },
];

export const alertsData = [
  {
    id: 'A001',
    type: 'spoilage',
    severity: 'critical',
    message: 'High spoilage detected at Warehouse WH-003',
    timestamp: '2 hours ago',
    status: 'pending',
  },
  {
    id: 'A002',
    type: 'stock',
    severity: 'medium',
    message: 'Low onion stock in Central region',
    timestamp: '4 hours ago',
    status: 'pending',
  },
  {
    id: 'A003',
    type: 'transport',
    severity: 'high',
    message: 'Vehicle V003 delayed by 3 hours',
    timestamp: '1 hour ago',
    status: 'acknowledged',
  },
  {
    id: 'A004',
    type: 'system',
    severity: 'low',
    message: 'Scheduled maintenance reminder',
    timestamp: '6 hours ago',
    status: 'resolved',
  },
];

export const policyData = [
  {
    id: 'P001',
    name: 'Minimum Support Price',
    status: 'active',
    impact: '+15%',
    beneficiaries: 850,
    budget: 2500000,
  },
  {
    id: 'P002',
    name: 'Storage Subsidy Scheme',
    status: 'active',
    impact: '+8%',
    beneficiaries: 420,
    budget: 1800000,
  },
  {
    id: 'P003',
    name: 'Transport Incentive',
    status: 'pending',
    impact: 'TBD',
    beneficiaries: 0,
    budget: 3200000,
  },
];

export const usersData = [
  {
    id: 'U001',
    name: 'Admin User',
    email: 'admin@oniotrack.gov.in',
    role: 'admin',
    status: 'active',
    lastLogin: '2 hours ago',
  },
  {
    id: 'U002',
    name: 'Regional Officer',
    email: 'regional@oniotrack.gov.in',
    role: 'government',
    status: 'active',
    lastLogin: '1 day ago',
  },
  {
    id: 'U003',
    name: 'Farmer Representative',
    email: 'farmer@oniotrack.gov.in',
    role: 'farmer',
    status: 'inactive',
    lastLogin: '3 days ago',
  },
];