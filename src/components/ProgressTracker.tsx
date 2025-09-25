import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Clock, 
  Package, 
  Truck, 
  Home,
  Calendar,
  Star,
  Target
} from 'lucide-react';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  timestamp?: string;
}

interface ProgressTrackerProps {
  type: 'order' | 'rental' | 'delivery' | 'event';
  steps: ProgressStep[];
  currentStep: number;
  title: string;
}

export const ProgressTracker = ({ type, steps, currentStep, title }: ProgressTrackerProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return Package;
      case 'rental': return Home;
      case 'delivery': return Truck;
      case 'event': return Calendar;
      default: return Target;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return Clock;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in_progress': return 'text-blue-600';
      default: return 'text-gray-400';
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  const Icon = getIcon(type);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-blue-500" />
          <span>{title}</span>
        </CardTitle>
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const StatusIcon = getStatusIcon(step.status);
            const statusColor = getStatusColor(step.status);
            
            return (
              <div key={step.id} className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${
                  step.status === 'completed' ? 'bg-green-100' :
                  step.status === 'in_progress' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-semibold ${
                      step.status === 'completed' ? 'text-green-800' :
                      step.status === 'in_progress' ? 'text-blue-800' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </h4>
                    <Badge 
                      variant={step.status === 'completed' ? 'default' : 'secondary'}
                      className={
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'in_progress' ? 'bg-blue-500' : ''
                      }
                    >
                      {step.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  {step.timestamp && (
                    <p className="text-xs text-gray-500 mt-1">{step.timestamp}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};