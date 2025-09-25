import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Bell, Check, X, Clock, Package, Home, Calendar } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'rental' | 'event' | 'system';
  read: boolean;
  created_at: string;
  action_url?: string;
}

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  // Mock notifications - in real app, fetch from database
  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'Order Ready for Pickup',
      message: 'Your study essentials order is ready for collection at the main gate.',
      type: 'order',
      read: false,
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      action_url: '/orders'
    },
    {
      id: '2',
      title: 'New Rental Match Found',
      message: 'We found 3 perfect rooms in Maskan within your budget range.',
      type: 'rental',
      read: false,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      action_url: '/rental-help'
    },
    {
      id: '3',
      title: 'Upcoming Event Reminder',
      message: 'Tech Innovation Summit starts tomorrow at 1:00 PM.',
      type: 'event',
      read: true,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      action_url: '/events'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return Package;
      case 'rental': return Home;
      case 'event': return Calendar;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order': return 'text-green-600';
      case 'rental': return 'text-blue-600';
      case 'event': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    // In real app, update database
    toast.success('Notification marked as read');
  };

  const markAllAsRead = () => {
    // In real app, update all notifications
    toast.success('All notifications marked as read');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-4">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            Stay updated with your Campus Connect activities
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {mockNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No notifications yet</p>
            </div>
          ) : (
            mockNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const iconColor = getNotificationColor(notification.type);
              
              return (
                <Card key={notification.id} className={`${!notification.read ? 'border-blue-200 bg-blue-50/50' : ''} hover:shadow-md transition-shadow`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full bg-gray-100`}>
                        <Icon className={`h-4 w-4 ${iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm text-gray-900 truncate">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(notification.created_at).toLocaleTimeString()}
                          </span>
                          <div className="flex space-x-1">
                            {!notification.read && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                                className="h-6 px-2"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};