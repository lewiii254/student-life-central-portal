import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  type: 'academic' | 'event' | 'deadline' | 'personal';
  attendees?: number;
}

export const CalendarWidget = () => {
  const [currentMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
  
  // Fetch real events from database
  const { data: upcomingEvents = [], isLoading } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const today = new Date();
      const { data: events } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', today.toISOString())
        .order('event_date', { ascending: true })
        .limit(4);

      return events?.map(event => ({
        id: event.id,
        title: event.title || 'Untitled Event',
        date: new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: event.event_time || 'TBD',
        location: event.location || undefined,
        type: (event.event_type || 'event') as 'academic' | 'event' | 'deadline' | 'personal',
        attendees: event.max_attendees || undefined
      })) || [];
    }
  });

  // Get event dates for calendar highlighting
  const { data: eventDates = [] } = useQuery({
    queryKey: ['event-dates'],
    queryFn: async () => {
      const today = new Date();
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
      const { data: events } = await supabase
        .from('events')
        .select('event_date')
        .gte('event_date', today.toISOString())
        .lte('event_date', endOfMonth.toISOString());

      return events?.map(e => new Date(e.event_date).getDate()) || [];
    }
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'personal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'academic': return '📚';
      case 'event': return '🎉';
      case 'deadline': return '⏰';
      case 'personal': return '👤';
      default: return '📅';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-blue-500" />
            <span>Calendar</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{currentMonth}</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mini Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
              <div key={idx} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => {
              const hasEvent = eventDates.includes(date);
              const isToday = date === new Date().getDate();
              
              return (
                <button
                  key={date}
                  className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-colors ${
                    isToday 
                      ? 'bg-blue-500 text-white font-bold'
                      : hasEvent
                      ? 'bg-purple-100 text-purple-800 font-medium hover:bg-purple-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>

          {/* Upcoming Events */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Upcoming Events</h4>
            {isLoading ? (
              <p className="text-center text-gray-500 py-4">Loading events...</p>
            ) : upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 text-center">
                        <div className="text-2xl mb-1">{getEventTypeIcon(event.type)}</div>
                        <div className="text-xs font-medium text-gray-600">{event.date}</div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h5 className="font-semibold text-gray-900 text-sm">{event.title}</h5>
                          <Badge className={getEventTypeColor(event.type) + ' text-xs'}>
                            {event.type}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center space-x-2 text-xs text-gray-600">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          
                          {event.attendees && (
                            <div className="flex items-center space-x-2 text-xs text-gray-600">
                              <Users className="h-3 w-3" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No upcoming events</p>
            )}
          </div>

          <Button variant="outline" className="w-full">
            View Full Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
