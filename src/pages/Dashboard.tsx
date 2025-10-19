import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Gift,
  MessageSquare,
  Star,
  ArrowLeft,
  Wallet,
  Bell,
  Calendar,
  Heart,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StudentDashboard } from '@/components/StudentDashboard';
import { ProgressTracker } from '@/components/ProgressTracker';
import { FeedbackSystem } from '@/components/FeedbackSystem';
import { ReferralSystem } from '@/components/ReferralSystem';
import { BudgetTracker } from '@/components/BudgetTracker';
import { WalletCard } from '@/components/WalletCard';
import { UpcomingDeadlines } from '@/components/UpcomingDeadlines';
import { SavedItems } from '@/components/SavedItems';
import { PersonalAnalytics } from '@/components/PersonalAnalytics';
import { NotificationsCenter } from '@/components/NotificationsCenter';
import { CalendarWidget } from '@/components/CalendarWidget';

const Dashboard = () => {
  // Sample progress data
  const orderProgress = {
    type: 'order' as const,
    title: 'Lab Coat Order #CC123',
    currentStep: 2,
    steps: [
      {
        id: '1',
        title: 'Order Placed',
        description: 'Your order has been received and confirmed',
        status: 'completed' as const,
        timestamp: '2 hours ago'
      },
      {
        id: '2',
        title: 'Processing',
        description: 'We\'re preparing your items for delivery',
        status: 'completed' as const,
        timestamp: '1 hour ago'
      },
      {
        id: '3',
        title: 'Ready for Pickup',
        description: 'Your order is ready at the pickup station',
        status: 'in_progress' as const,
      },
      {
        id: '4',
        title: 'Completed',
        description: 'Order delivered successfully',
        status: 'pending' as const,
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="w-8 h-8 text-purple-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                Student Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8 h-auto">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center space-x-2">
              <Wallet className="w-4 h-4" />
              <span className="hidden md:inline">Wallet</span>
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden md:inline">Budget</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden md:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden md:inline">Calendar</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span className="hidden md:inline">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span className="hidden md:inline">Feedback</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StudentDashboard />
              </div>
              <div className="space-y-6">
                <NotificationsCenter />
                <UpcomingDeadlines />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wallet">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WalletCard />
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Track Your Activities</h2>
                <ProgressTracker {...orderProgress} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="budget">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BudgetTracker />
              <PersonalAnalytics />
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <PersonalAnalytics />
          </TabsContent>

          <TabsContent value="calendar">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CalendarWidget />
              <UpcomingDeadlines />
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <SavedItems />
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralSystem />
          </TabsContent>

          <TabsContent value="feedback">
            <FeedbackSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;