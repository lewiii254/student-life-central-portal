import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Star,
  Zap,
  Heart,
  Coffee
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const QuickActions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Emergency Help',
      description: 'Need urgent assistance?',
      icon: Phone,
      color: 'from-red-500 to-pink-500',
      action: () => window.open('tel:+254790767347'),
      urgent: true
    },
    {
      title: 'Quick Chat',
      description: 'WhatsApp support',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
      action: () => window.open('https://wa.me/254790767347?text=Hi! I need quick help with Campus Connect.'),
    },
    {
      title: 'Find Rooms',
      description: 'Urgent accommodation',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      action: () => user ? navigate('/rental-help') : navigate('/auth'),
    },
    {
      title: 'Order Food',
      description: 'Hungry? Quick delivery',
      icon: Coffee,
      color: 'from-orange-500 to-yellow-500',
      action: () => user ? navigate('/delivery') : navigate('/auth'),
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-3">
          <div className="flex space-x-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.title}
                  size="sm"
                  onClick={action.action}
                  className={`relative bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-200 shadow-lg`}
                  title={`${action.title} - ${action.description}`}
                >
                  <Icon className="h-4 w-4" />
                  {action.urgent && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};