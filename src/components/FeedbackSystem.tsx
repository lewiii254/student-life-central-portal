import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Star, MessageSquare, ThumbsUp, Send, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface FeedbackFormData {
  rating: number;
  category: string;
  message: string;
  suggestion: string;
}

export const FeedbackSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackFormData>({
    rating: 0,
    category: '',
    message: '',
    suggestion: ''
  });
  const { user } = useAuth();

  const categories = [
    'Rental Help',
    'Study Essentials',
    'Delivery Service',
    'Bicycle Rentals',
    'Campus Events',
    'Customer Support',
    'App Experience',
    'Other'
  ];

  const handleRatingClick = (rating: number) => {
    setFeedback(prev => ({ ...prev, rating }));
  };

  const handleSubmit = () => {
    if (!feedback.rating || !feedback.category || !feedback.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In real app, submit to database
    toast.success('Thank you for your feedback! 🙏');
    setIsOpen(false);
    setFeedback({ rating: 0, category: '', message: '', suggestion: '' });
  };

  const recentFeedback = [
    {
      user: 'Anonymous Student',
      rating: 5,
      message: 'Amazing service! Found my perfect room in just 2 days.',
      category: 'Rental Help',
      date: '2 days ago'
    },
    {
      user: 'Engineering Student',
      rating: 4,
      message: 'Fast delivery but could use more product variety.',
      category: 'Study Essentials',
      date: '1 week ago'
    },
    {
      user: 'Business Student',
      rating: 5,
      message: 'Love the bicycle rental service! So convenient.',
      category: 'Bicycle Rentals',
      date: '2 weeks ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Feedback Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-20 right-4 z-40 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-xl">
            <MessageSquare className="h-5 w-5 mr-2" />
            Feedback
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Share Your Feedback</span>
            </DialogTitle>
            <DialogDescription>
              Help us improve Campus Connect for all comrades
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Rating */}
            <div>
              <label className="text-sm font-medium mb-2 block">Rate your experience</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    className="p-1"
                  >
                    <Star 
                      className={`h-6 w-6 ${
                        star <= feedback.rating 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select
                className="w-full p-2 border rounded-md"
                value={feedback.category}
                onChange={(e) => setFeedback(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium mb-2 block">Your feedback</label>
              <Textarea
                placeholder="Tell us about your experience..."
                value={feedback.message}
                onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Suggestion */}
            <div>
              <label className="text-sm font-medium mb-2 block">Suggestions (optional)</label>
              <Textarea
                placeholder="Any suggestions for improvement?"
                value={feedback.suggestion}
                onChange={(e) => setFeedback(prev => ({ ...prev, suggestion: e.target.value }))}
                rows={2}
              />
            </div>

            <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-yellow-500 to-orange-500">
              <Send className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recent Feedback Display */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ThumbsUp className="h-5 w-5 text-green-500" />
            <span>What Comrades Are Saying</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{item.user}</span>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star}
                        className={`h-4 w-4 ${
                          star <= item.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-2">{item.message}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};