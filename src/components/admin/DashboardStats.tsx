
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  MessageSquare, 
  Calendar, 
  Bike,
  TrendingUp,
  Users,
  AlertTriangle,
  DollarSign,
  Plus
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const DashboardStats = () => {
  // Fetch dashboard statistics
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [
        ordersResult,
        inquiriesResult,
        eventsResult,
        bicycleBookingsResult,
        productsResult,
        rentalRequestsResult
      ] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact' }),
        supabase.from('customer_inquiries').select('*', { count: 'exact' }).eq('status', 'unread'),
        supabase.from('events').select('*', { count: 'exact' }).gte('event_date', new Date().toISOString()),
        supabase.from('bicycle_bookings').select('*', { count: 'exact' }).eq('status', 'active'),
        supabase.from('products').select('*').lte('stock_quantity', 5),
        supabase.from('rental_requests').select('*', { count: 'exact' }).eq('status', 'pending')
      ]);

      return {
        totalOrders: ordersResult.count || 0,
        newInquiries: inquiriesResult.count || 0,
        upcomingEvents: eventsResult.count || 0,
        rentalsToday: bicycleBookingsResult.count || 0,
        lowStockItems: productsResult.data?.length || 0,
        pendingRentals: rentalRequestsResult.count || 0,
        lowStockProducts: productsResult.data || []
      };
    }
  });

  const statCards = [
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'New Inquiries',
      value: stats?.newInquiries || 0,
      icon: MessageSquare,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Upcoming Events',
      value: stats?.upcomingEvents || 0,
      icon: Calendar,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Active Rentals',
      value: stats?.rentalsToday || 0,
      icon: Bike,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Admin! 👋</h2>
        <p className="text-gray-600">Here's what's happening with Campus Connect today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats?.lowStockItems > 0 ? (
              <div className="space-y-3">
                {stats.lowStockProducts.slice(0, 5).map((product: any) => (
                  <div key={product.id} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">Stock: {product.stock_quantity}</p>
                    </div>
                    <Badge variant="destructive">Low Stock</Badge>
                  </div>
                ))}
                {stats.lowStockItems > 5 && (
                  <p className="text-sm text-gray-600 text-center">
                    +{stats.lowStockItems - 5} more items need restocking
                  </p>
                )}
              </div>
            ) : (
              <p className="text-green-600">All products are well stocked! ✅</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <p className="text-sm">New order received from John Doe</p>
                <span className="text-xs text-gray-500">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <p className="text-sm">Bicycle rental booked for tomorrow</p>
                <span className="text-xs text-gray-500">15 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <p className="text-sm">New rental inquiry in Westlands</p>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                <p className="text-sm">Event registration milestone reached</p>
                <span className="text-xs text-gray-500">3 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
