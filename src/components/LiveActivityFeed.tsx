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

interface ActivityItem {
  id: string;
  type: 'order' | 'rental' | 'event' | 'bicycle';
  user: string;
  action: string;
  timestamp: Date;
  details?: string;
}

export const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'order',
      user: 'John M.',
      action: 'ordered lab coat and calculator',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      details: 'KES 3,300'
    },
    {
      id: '2',
      type: 'rental',
      user: 'Sarah K.',
      action: 'found accommodation in Maskan',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: '3',
      type: 'bicycle',
      user: 'Mike O.',
      action: 'rented mountain bike for 4 hours',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: '4',
      type: 'event',
      user: 'Grace N.',
      action: 'registered for Tech Innovation Summit',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
    }
  ]);

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

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: (['order', 'rental', 'event', 'bicycle'] as const)[Math.floor(Math.random() * 4)],
        user: ['Alex T.', 'Maria S.', 'David K.', 'Lucy W.'][Math.floor(Math.random() * 4)],
        action: 'just joined Campus Connect',
        timestamp: new Date(),
      };
      
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 30000); // Add new activity every 30 seconds

    return () => clearInterval(interval);
  }, []);

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
      </CardContent>
    </Card>
  );
};