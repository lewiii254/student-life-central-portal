import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Activity, 
  ShoppingCart, 
  Home, 
  Calendar, 
  Bike,
  Package,
  Users,
  TrendingUp
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ActivityItem {
  id: string;
  type: 'order' | 'rental' | 'event' | 'bicycle';
  user: string;
  action: string;
  timestamp: Date;
  details?: string;
}

interface Profile {
  full_name: string | null;
}

interface OrderActivity {
  id: string;
  created_at: string;
  total_amount: number | null;
  user_id: string;
  profiles: Profile | null;
}

interface RentalActivity {
  id: string;
  created_at: string;
  area: string | null;
  user_id: string;
  profiles: Profile | null;
}

interface BicycleActivity {
  id: string;
  created_at: string;
  rental_start: string;
  user_id: string;
  profiles: Profile | null;
}

export const LiveActivityFeed = () => {
  // Fetch real activities from database
  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['live-activities'],
    queryFn: async () => {
      const activityList: ActivityItem[] = [];
      
      // Fetch recent orders with user info
      const { data: orders } = await supabase
        .from('orders')
        .select('id, created_at, total_amount, user_id, profiles(full_name)')
        .order('created_at', { ascending: false })
        .limit(3);
      
      (orders as OrderActivity[] | null)?.forEach(order => {
        const userName = order.profiles?.full_name || 'A Student';
        activityList.push({
          id: `order-${order.id}`,
          type: 'order',
          user: userName,
          action: 'placed an order',
          timestamp: new Date(order.created_at),
          details: `KES ${order.total_amount?.toLocaleString() || 0}`
        });
      });

      // Fetch recent rental requests
      const { data: rentals } = await supabase
        .from('rental_requests')
        .select('id, created_at, area, user_id, profiles(full_name)')
        .order('created_at', { ascending: false })
        .limit(3);
      
      (rentals as RentalActivity[] | null)?.forEach(rental => {
        const userName = rental.profiles?.full_name || 'A Student';
        activityList.push({
          id: `rental-${rental.id}`,
          type: 'rental',
          user: userName,
          action: `searched for accommodation in ${rental.area || 'campus area'}`,
          timestamp: new Date(rental.created_at)
        });
      });

      // Fetch recent bicycle bookings
      const { data: bicycles } = await supabase
        .from('bicycle_bookings')
        .select('id, created_at, rental_start, user_id, profiles(full_name)')
        .order('created_at', { ascending: false })
        .limit(3);
      
      (bicycles as BicycleActivity[] | null)?.forEach(booking => {
        const userName = booking.profiles?.full_name || 'A Student';
        activityList.push({
          id: `bicycle-${booking.id}`,
          type: 'bicycle',
          user: userName,
          action: 'rented a bicycle',
          timestamp: new Date(booking.created_at)
        });
      });

      // Fetch recent events (as proxy for registrations)
      const { data: events } = await supabase
        .from('events')
        .select('id, created_at, title')
        .order('created_at', { ascending: false })
        .limit(2);
      
      events?.forEach(event => {
        activityList.push({
          id: `event-${event.id}`,
          type: 'event',
          user: 'Campus Connect',
          action: `created event: ${event.title}`,
          timestamp: new Date(event.created_at)
        });
      });

      // Sort by timestamp and return top 10
      return activityList
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 10);
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingCart;
      case 'rental': return Home;
      case 'event': return Calendar;
      case 'bicycle': return Bike;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'order': return 'text-green-600';
      case 'rental': return 'text-blue-600';
      case 'event': return 'text-purple-600';
      case 'bicycle': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-green-500" />
          <span>Live Campus Activity</span>
          <Badge className="bg-green-100 text-green-800 animate-pulse">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading activities...</div>
        ) : activities.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              const iconColor = getActivityColor(activity.type);
              
              return (
                <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${iconColor}`} />
                      <span className="font-medium text-gray-900 text-sm">{activity.user}</span>
                      <span className="text-sm text-gray-600">{activity.action}</span>
                    </div>
                    {activity.details && (
                      <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">No recent activity</div>
        )}
      </CardContent>
    </Card>
  );
};