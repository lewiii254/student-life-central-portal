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
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StudentDashboard } from '@/components/StudentDashboard';
import { ProgressTracker } from '@/components/ProgressTracker';
import { FeedbackSystem } from '@/components/FeedbackSystem';
import { ReferralSystem } from '@/components/ReferralSystem';

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
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Progress</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>Feedback</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <StudentDashboard />
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Track Your Activities</h2>
              <ProgressTracker {...orderProgress} />
            </div>
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