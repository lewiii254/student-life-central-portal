import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus
} from 'lucide-react';

interface Deadline {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: 'academic' | 'payment' | 'event' | 'rental';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed';
}

export const UpcomingDeadlines = () => {
  const deadlines: Deadline[] = [
    {
      id: '1',
      title: 'Assignment Submission',
      description: 'Software Engineering Project Report',
      dueDate: 'Tomorrow, 5:00 PM',
      category: 'academic',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Hostel Rent Payment',
      description: 'Monthly rent for November',
      dueDate: 'In 3 days',
      category: 'payment',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Tech Summit Registration',
      description: 'Last day to register for the event',
      dueDate: 'In 5 days',
      category: 'event',
      priority: 'medium',
      status: 'pending'
    },
    {
      id: '4',
      title: 'Lab Report',
      description: 'Physics Lab Report - Week 8',
      dueDate: 'In 1 week',
      category: 'academic',
      priority: 'medium',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Library Book Return',
      description: 'Data Structures and Algorithms textbook',
      dueDate: 'In 10 days',
      category: 'academic',
      priority: 'low',
      status: 'pending'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return '📚';
      case 'payment': return '💰';
      case 'event': return '🎉';
      case 'rental': return '🏠';
      default: return '📌';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'payment': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'rental': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: AlertTriangle,
          iconColor: 'text-red-600'
        };
      case 'medium':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          iconColor: 'text-yellow-600'
        };
      default:
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Clock,
          iconColor: 'text-blue-600'
        };
    }
  };

  const pendingDeadlines = deadlines.filter(d => d.status === 'pending');
  const highPriorityCount = pendingDeadlines.filter(d => d.priority === 'high').length;

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            <span>Upcoming Deadlines</span>
            {highPriorityCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {highPriorityCount} Urgent
              </Badge>
            )}
          </CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {pendingDeadlines.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <p className="text-gray-600">No pending deadlines! 🎉</p>
              <p className="text-sm text-gray-500">You're all caught up</p>
            </div>
          ) : (
            pendingDeadlines.map((deadline) => {
              const priorityConfig = getPriorityConfig(deadline.priority);
              const PriorityIcon = priorityConfig.icon;
              
              return (
                <div 
                  key={deadline.id}
                  className={`p-4 border-2 rounded-lg ${priorityConfig.color} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">{getCategoryIcon(deadline.category)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {deadline.title}
                        </h4>
                        <PriorityIcon className={`h-4 w-4 flex-shrink-0 ml-2 ${priorityConfig.iconColor}`} />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{deadline.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge className={getCategoryColor(deadline.category)}>
                          {deadline.category}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                          <Clock className="h-3 w-3" />
                          <span>{deadline.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {pendingDeadlines.length > 0 && (
          <Button variant="outline" className="w-full mt-4">
            View All Deadlines
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
