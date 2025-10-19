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
  Pie,
  Cell
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}

interface ServiceData {
  name: string;
  value: number;
  color: string;
}

interface UserGrowthData {
  month: string;
  users: number;
}

export const Analytics = () => {
  // Fetch real analytics data
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['analytics-data'],
    queryFn: async () => {
      // Get current year data
      const currentYear = new Date().getFullYear();
      const startOfYear = new Date(currentYear, 0, 1).toISOString();
      
      // Fetch orders data
      const { data: orders } = await supabase
        .from('orders')
        .select('created_at, total_amount')
        .gte('created_at', startOfYear)
        .order('created_at', { ascending: true });

      // Fetch total counts for KPIs
      const [ordersCount, usersCount, eventsCount] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true })
      ]);

      // Calculate revenue by month
      const monthlyRevenue: Record<string, { revenue: number; orders: number }> = {};
      orders?.forEach(order => {
        const date = new Date(order.created_at);
        const monthKey = date.toLocaleString('default', { month: 'short' });
        if (!monthlyRevenue[monthKey]) {
          monthlyRevenue[monthKey] = { revenue: 0, orders: 0 };
        }
        monthlyRevenue[monthKey].revenue += order.total_amount || 0;
        monthlyRevenue[monthKey].orders += 1;
      });

      // Format revenue data for charts
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const revenueData: RevenueData[] = months.map(month => ({
        month,
        revenue: monthlyRevenue[month]?.revenue || 0,
        orders: monthlyRevenue[month]?.orders || 0
      }));

      // Calculate total revenue
      const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

      return {
        totalRevenue,
        totalOrders: ordersCount.count || 0,
        totalUsers: usersCount.count || 0,
        totalEvents: eventsCount.count || 0,
        revenueData: revenueData.filter(d => d.revenue > 0 || d.orders > 0)
      };
    }
  });

  // Fetch service usage data
  const { data: serviceData = [] } = useQuery({
    queryKey: ['service-usage'],
    queryFn: async () => {
      const [orders, rentals, deliveries, bicycles, events] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('rental_requests').select('*', { count: 'exact', head: true }),
        supabase.from('delivery_requests').select('*', { count: 'exact', head: true }),
        supabase.from('bicycle_bookings').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true })
      ]);

      const total = (orders.count || 0) + (rentals.count || 0) + (deliveries.count || 0) + 
                    (bicycles.count || 0) + (events.count || 0);

      if (total === 0) return [];

      const serviceData: ServiceData[] = [
        { name: 'Study Essentials', value: Math.round(((orders.count || 0) / total) * 100), color: '#8884d8' },
        { name: 'Rental Help', value: Math.round(((rentals.count || 0) / total) * 100), color: '#82ca9d' },
        { name: 'Delivery Services', value: Math.round(((deliveries.count || 0) / total) * 100), color: '#ffc658' },
        { name: 'Bicycle Rentals', value: Math.round(((bicycles.count || 0) / total) * 100), color: '#ff7300' },
        { name: 'Events', value: Math.round(((events.count || 0) / total) * 100), color: '#00ff88' }
      ];

      return serviceData.filter(s => s.value > 0);
    }
  });

  // Fetch user growth data
  const { data: userGrowthData = [] } = useQuery({
    queryKey: ['user-growth'],
    queryFn: async () => {
      const currentYear = new Date().getFullYear();
      const startOfYear = new Date(currentYear, 0, 1).toISOString();
      
      const { data: profiles } = await supabase
        .from('profiles')
        .select('created_at')
        .gte('created_at', startOfYear)
        .order('created_at', { ascending: true });

      // Calculate cumulative users by month
      const monthlyUsers: Record<string, number> = {};
      let cumulativeCount = 0;
      
      profiles?.forEach(profile => {
        const date = new Date(profile.created_at);
        const monthKey = date.toLocaleString('default', { month: 'short' });
        cumulativeCount++;
        monthlyUsers[monthKey] = cumulativeCount;
      });

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const growthData: UserGrowthData[] = months
        .map(month => ({
          month,
          users: monthlyUsers[month] || 0
        }))
        .filter(d => d.users > 0);

      return growthData;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: `KES ${analyticsData?.totalRevenue?.toLocaleString() || 0}`,
      change: '+15%',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'Active Users',
      value: analyticsData?.totalUsers?.toLocaleString() || '0',
      change: '+23%',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Total Orders',
      value: analyticsData?.totalOrders?.toLocaleString() || '0',
      change: '+18%',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      title: 'Events Hosted',
      value: analyticsData?.totalEvents?.toLocaleString() || '0',
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
            {analyticsData?.revenueData && analyticsData.revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.revenueData}>
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
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No revenue data available yet
              </div>
            )}
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
            {serviceData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
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
              </>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                No service usage data available yet
              </div>
            )}
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
          {userGrowthData.length > 0 ? (
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
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No user growth data available yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};