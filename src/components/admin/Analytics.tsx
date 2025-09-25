import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShoppingCart,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell
} from 'recharts';

export const Analytics = () => {
  // Sample data - in real app, fetch from database
  const revenueData = [
    { month: 'Jan', revenue: 12000, orders: 45 },
    { month: 'Feb', revenue: 15000, orders: 52 },
    { month: 'Mar', revenue: 18000, orders: 68 },
    { month: 'Apr', revenue: 22000, orders: 75 },
    { month: 'May', revenue: 25000, orders: 89 },
    { month: 'Jun', revenue: 28000, orders: 95 }
  ];

  const serviceData = [
    { name: 'Study Essentials', value: 35, color: '#8884d8' },
    { name: 'Rental Help', value: 25, color: '#82ca9d' },
    { name: 'Delivery Services', value: 20, color: '#ffc658' },
    { name: 'Bicycle Rentals', value: 12, color: '#ff7300' },
    { name: 'Events', value: 8, color: '#00ff88' }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 150 },
    { month: 'Feb', users: 280 },
    { month: 'Mar', users: 420 },
    { month: 'Apr', users: 650 },
    { month: 'May', users: 890 },
    { month: 'Jun', users: 1200 }
  ];

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: 'KES 120,000',
      change: '+15%',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+23%',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Total Orders',
      value: '384',
      change: '+18%',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      title: 'Events Hosted',
      value: '28',
      change: '+12%',
      icon: Calendar,
      color: 'text-orange-600',
      bg: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h2>
        <Badge className="bg-green-100 text-green-800">
          Real-time Data
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{kpi.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${kpi.bg}`}>
                    <Icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Revenue Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`KES ${value}`, 'Revenue']} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#8884d8" 
                  strokeWidth={3}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-green-500" />
              <span>Service Usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <RechartsPieChart data={serviceData}>
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
                <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {serviceData.map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: service.color }}
                    ></div>
                    <span className="text-sm text-gray-700">{service.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{service.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-purple-500" />
            <span>User Growth</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}`, 'Users']} />
              <Bar 
                dataKey="users" 
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};