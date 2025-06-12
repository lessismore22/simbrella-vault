'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Wallet, 
  Activity, 
  Shield,
  Search,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  UserCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', wallets: 3, balance: 12450.00, joined: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', wallets: 2, balance: 8920.50, joined: '2024-02-20' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'suspended', wallets: 1, balance: 250.00, joined: '2024-03-10' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', status: 'active', wallets: 4, balance: 15680.75, joined: '2024-01-05' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', status: 'pending', wallets: 1, balance: 0.00, joined: '2025-01-18' },
];

const services = [
  { id: '1', name: 'Airtime Top-up', status: 'active', provider: 'MTN', transactions: 1245, revenue: 12450.00 },
  { id: '2', name: 'Data Bundle', status: 'active', provider: 'Airtel', transactions: 987, revenue: 19740.00 },
  { id: '3', name: 'Electricity Bill', status: 'maintenance', provider: 'EKEDC', transactions: 456, revenue: 45600.00 },
  { id: '4', name: 'Cable TV', status: 'active', provider: 'DSTV', transactions: 678, revenue: 33900.00 },
];

const auditLogs = [
  { id: '1', action: 'User Login', user: 'john@example.com', timestamp: '2025-01-20 14:30:00', ip: '192.168.1.1', status: 'success' },
  { id: '2', action: 'Transfer', user: 'jane@example.com', timestamp: '2025-01-20 14:25:00', ip: '192.168.1.5', status: 'success' },
  { id: '3', action: 'Failed Login', user: 'unknown@example.com', timestamp: '2025-01-20 14:20:00', ip: '192.168.1.100', status: 'failed' },
  { id: '4', action: 'Service Payment', user: 'alice@example.com', timestamp: '2025-01-20 14:15:00', ip: '192.168.1.8', status: 'success' },
  { id: '5', action: 'Wallet Created', user: 'bob@example.com', timestamp: '2025-01-20 14:10:00', ip: '192.168.1.3', status: 'success' },
];

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    setUser(parsedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">System management and oversight</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Users</p>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-blue-200">+12% this month</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Total Wallets</p>
                  <p className="text-2xl font-bold">3,891</p>
                  <p className="text-sm text-emerald-200">+8% this month</p>
                </div>
                <Wallet className="w-8 h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Active Services</p>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-sm text-purple-200">2 in maintenance</p>
                </div>
                <Activity className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Revenue</p>
                  <p className="text-2xl font-bold">$89.2k</p>
                  <p className="text-sm text-orange-200">+15% this month</p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">Joined: {user.joined}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">${user.balance.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">{user.wallets} wallets</p>
                        </div>
                        <Badge 
                          variant={user.status === 'active' ? 'default' : user.status === 'suspended' ? 'destructive' : 'secondary'}
                        >
                          {user.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {user.status === 'active' ? (
                            <Button size="sm" variant="ghost">
                              <Ban className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost">
                              <UserCheck className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
                <CardDescription>Monitor and manage payment services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          service.status === 'active' ? 'bg-emerald-500' : 
                          service.status === 'maintenance' ? 'bg-orange-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-gray-600">Provider: {service.provider}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-semibold">${service.revenue.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">{service.transactions} transactions</p>
                        </div>
                        <Badge 
                          variant={service.status === 'active' ? 'default' : service.status === 'maintenance' ? 'secondary' : 'destructive'}
                        >
                          {service.status}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost">
                            <Settings className="w-4 h-4" />
                          </Button>
                          {service.status === 'active' ? (
                            <Button size="sm" variant="ghost">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Key metrics and performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Server Uptime</span>
                      <span className="text-sm text-emerald-600 font-semibold">99.9%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Transaction Success Rate</span>
                      <span className="text-sm text-blue-600 font-semibold">98.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">User Satisfaction</span>
                      <span className="text-sm text-purple-600 font-semibold">95.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95.2%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">API Response Time</span>
                      <span className="text-sm text-orange-600 font-semibold">245ms avg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Recent system notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="font-semibold text-emerald-800">System Update Complete</span>
                    </div>
                    <p className="text-sm text-emerald-700">
                      Security patch 2.4.1 successfully deployed at 14:30 UTC
                    </p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold text-orange-800">High Transaction Volume</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Processing 150% above normal capacity. All systems stable.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-800">New User Milestone</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Reached 1,250 active users this month. 25% growth achieved!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audit Logs */}
          <TabsContent value="logs" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>System activity and security logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          log.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-gray-600">User: {log.user}</p>
                          <p className="text-xs text-gray-500">IP: {log.ip}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{log.timestamp}</p>
                        <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                          {log.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}