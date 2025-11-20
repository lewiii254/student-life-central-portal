
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

interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  color: string;
}

interface Product {
  id: string;
  name: string;
  stock_quantity: number;
}

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

  // Fetch recent activities from multiple sources
  const { data: recentActivities = [] } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      const activities: Activity[] = [];
      
      // Fetch recent orders
      const { data: orders } = await supabase
        .from('orders')
        .select('id, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(2);
      
      orders?.forEach(order => {
        activities.push({
          id: `order-${order.id}`,
          type: 'order',
          description: 'New order received',
          timestamp: order.created_at,
          color: 'green'
        });
      });

      // Fetch recent bicycle bookings
      const { data: bookings } = await supabase
        .from('bicycle_bookings')
        .select('id, created_at')
        .order('created_at', { ascending: false })
        .limit(2);
      
      bookings?.forEach(booking => {
        activities.push({
          id: `booking-${booking.id}`,
          type: 'booking',
          description: 'Bicycle rental booked',
          timestamp: booking.created_at,
          color: 'blue'
        });
      });

      // Fetch recent rental inquiries
      const { data: rentals } = await supabase
        .from('rental_requests')
        .select('id, created_at, area')
        .order('created_at', { ascending: false })
        .limit(2);
      
      rentals?.forEach(rental => {
        activities.push({
          id: `rental-${rental.id}`,
          type: 'rental',
          description: `New rental inquiry in ${rental.area || 'campus area'}`,
          timestamp: rental.created_at,
          color: 'yellow'
        });
      });

      // Fetch recent event registrations (from events table)
      const { data: events } = await supabase
        .from('events')
        .select('id, created_at, title')
        .order('created_at', { ascending: false })
        .limit(2);
      
      events?.forEach(event => {
        activities.push({
          id: `event-${event.id}`,
          type: 'event',
          description: `Event "${event.title}" created`,
          timestamp: event.created_at,
          color: 'purple'
        });
      });

      // Sort all activities by timestamp and return the most recent 4
      return activities
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 4);
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
                {stats.lowStockProducts.slice(0, 5).map((product: Product) => (
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
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className={`h-2 w-2 bg-${activity.color}-500 rounded-full`}></div>
                    <p className="text-sm flex-1">{activity.description}</p>
                    <span className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
