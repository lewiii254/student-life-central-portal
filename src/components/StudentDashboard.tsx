import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  ShoppingCart, 
  Home, 
  Calendar, 
  Clock,
  Star,
  Package,
  Bike,
  MessageCircle,
  Award,
  Target,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/contexts/CartContext';

export const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getTotalItems } = useCart();

  const quickStats = [
    { label: 'Orders', value: '3', icon: Package, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Rentals', value: '1', icon: Home, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Events', value: '5', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Points', value: '120', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' }
  ];

  const recentActivity = [
    {
      title: 'Lab Coat Order Delivered',
      description: 'Your engineering lab coat has been delivered successfully',
      time: '2 hours ago',
      type: 'order',
      status: 'completed'
    },
    {
      title: 'Room Search in Progress',
      description: 'We\'re searching for rooms in Maskan within your budget',
      time: '1 day ago',
      type: 'rental',
      status: 'in_progress'
    },
    {
      title: 'Tech Summit Registration',
      description: 'Successfully registered for the Tech Innovation Summit',
      time: '3 days ago',
      type: 'event',
      status: 'confirmed'
    }
  ];

  const quickActions = [
    {
      title: 'Order Study Materials',
      description: 'Get your essentials delivered fast',
      icon: ShoppingCart,
      color: 'from-green-500 to-emerald-500',
      action: () => navigate('/study-essentials')
    },
    {
      title: 'Find Accommodation',
      description: 'Search for perfect rooms',
      icon: Home,
      color: 'from-blue-500 to-cyan-500',
      action: () => navigate('/rental-help')
    },
    {
      title: 'Rent a Bicycle',
      description: 'Eco-friendly campus transport',
      icon: Bike,
      color: 'from-purple-500 to-pink-500',
      action: () => navigate('/bicycle-rentals')
    },
    {
      title: 'Browse Events',
      description: 'Discover campus activities',
      icon: Calendar,
      color: 'from-orange-500 to-red-500',
      action: () => navigate('/events')
    },
    {
      title: 'Request Delivery',
      description: 'Fast campus-wide delivery',
      icon: Package,
      color: 'from-yellow-500 to-orange-500',
      action: () => navigate('/delivery')
    },
    {
      title: 'Get Help',
      description: '24/7 support available',
      icon: MessageCircle,
      color: 'from-pink-500 to-rose-500',
      action: () => navigate('/help-center')
    }
  ];

  const achievements = [
    { title: 'Early Adopter', description: 'One of the first 100 users', icon: '🚀', unlocked: true },
    { title: 'Frequent Shopper', description: '10+ orders completed', icon: '🛒', unlocked: true },
    { title: 'Event Enthusiast', description: 'Attended 5+ events', icon: '🎉', unlocked: false },
    { title: 'Eco Warrior', description: 'Used bicycle rental 10+ times', icon: '🌱', unlocked: false }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-purple-600 to-green-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {user?.user_metadata?.first_name || 'Comrade'}! 👋
              </h2>
              <p className="text-purple-100">
                Ready to make your campus life easier today?
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-2">🎓</div>
              <Badge className="bg-white/20 text-white">
                Active Student
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.title}
                  onClick={action.action}
                  className={`h-auto p-4 bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-200 shadow-lg`}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Icon className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-sm opacity-90">{action.description}</div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-2 ${
                  achievement.unlocked 
                    ? 'border-yellow-200 bg-yellow-50' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-yellow-800' : 'text-gray-600'}`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${achievement.unlocked ? 'text-yellow-700' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-yellow-500 text-white">Unlocked!</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};