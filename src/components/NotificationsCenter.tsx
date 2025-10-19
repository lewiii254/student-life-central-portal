import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell,
  Package,
  Calendar,
  DollarSign,
  Gift,
  AlertCircle,
  CheckCircle,
  X,
  Settings
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'payment' | 'event' | 'promotion' | 'alert' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'normal' | 'low';
}

export const NotificationsCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order Delivered',
      message: 'Your lab coat order has been delivered successfully',
      time: '10 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Reminder',
      message: 'Hostel rent payment due in 3 days',
      time: '1 hour ago',
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'event',
      title: 'New Event',
      message: 'Tech Innovation Summit registration is now open',
      time: '3 hours ago',
      read: false,
      priority: 'normal'
    },
    {
      id: '4',
      type: 'promotion',
      title: 'Special Offer',
      message: '20% off on all study materials this week!',
      time: '5 hours ago',
      read: true,
      priority: 'normal'
    },
    {
      id: '5',
      type: 'success',
      title: 'Referral Bonus',
      message: 'You earned KES 50 from a successful referral',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return Package;
      case 'payment': return DollarSign;
      case 'event': return Calendar;
      case 'promotion': return Gift;
      case 'alert': return AlertCircle;
      case 'success': return CheckCircle;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-600';
      case 'payment': return 'bg-red-100 text-red-600';
      case 'event': return 'bg-purple-100 text-purple-600';
      case 'promotion': return 'bg-green-100 text-green-600';
      case 'alert': return 'bg-yellow-100 text-yellow-600';
      case 'success': return 'bg-emerald-100 text-emerald-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-blue-500" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} New
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={markAllAsRead}
              >
                Mark all read
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No notifications</p>
              <p className="text-sm text-gray-500">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const colorClass = getNotificationColor(notification.type);
              
              return (
                <div 
                  key={notification.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    notification.read 
                      ? 'bg-gray-50 border-gray-100' 
                      : 'bg-white border-blue-200 shadow-sm'
                  } hover:shadow-md`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className={`font-semibold ${
                          notification.read ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 ml-2"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className={`text-sm mb-2 ${
                        notification.read ? 'text-gray-500' : 'text-gray-700'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {notifications.length > 0 && (
          <Button variant="outline" className="w-full mt-4">
            View All Notifications
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
