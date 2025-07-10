
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Eye,
  CheckCircle,
  XCircle,
  Users,
  DollarSign,
  Megaphone
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const EventsAndAdverts = () => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    event_date: '',
    ticket_price: 0,
    max_attendees: 0
  });
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const queryClient = useQueryClient();

  // Fetch events
  const { data: events, isLoading: loadingEvents } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch advertisements
  const { data: advertisements, isLoading: loadingAds } = useQuery({
    queryKey: ['advertisements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('advertisements')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add new event
  const addEvent = useMutation({
    mutationFn: async (event: typeof newEvent) => {
      const { error } = await supabase
        .from('events')
        .insert([event]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setNewEvent({
        title: '',
        description: '',
        event_date: '',
        ticket_price: 0,
        max_attendees: 0
      });
      setShowAddEventDialog(false);
      toast.success('Event created successfully');
    }
  });

  // Update advertisement status
  const updateAdStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { error } = await supabase
        .from('advertisements')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
      toast.success('Advertisement status updated');
    }
  });

  const getEventStatusColor = (eventDate: string) => {
    const now = new Date();
    const event = new Date(eventDate);
    if (event < now) return 'bg-gray-100 text-gray-800';
    if (event.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getAdStatusColor = (status: string) => {
    switch (status) {
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const totalEvents = events?.length || 0;
  const upcomingEvents = events?.filter(e => new Date(e.event_date) > new Date()).length || 0;
  const totalAdvertisements = advertisements?.length || 0;
  const pendingAds = advertisements?.filter(a => a.status === 'pending_approval').length || 0;
  const adRevenue = advertisements?.reduce((sum, a) => sum + (a.amount_paid || 0), 0) || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Events & Advertisements</h2>
        <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Event title"
                value={newEvent.title}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Event description"
                value={newEvent.description}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
              />
              <Input
                type="datetime-local"
                value={newEvent.event_date}
                onChange={(e) => setNewEvent(prev => ({ ...prev, event_date: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Ticket price (KES)"
                value={newEvent.ticket_price}
                onChange={(e) => setNewEvent(prev => ({ ...prev, ticket_price: Number(e.target.value) }))}
              />
              <Input
                type="number"
                placeholder="Max attendees"
                value={newEvent.max_attendees}
                onChange={(e) => setNewEvent(prev => ({ ...prev, max_attendees: Number(e.target.value) }))}
              />
              <Button 
                onClick={() => addEvent.mutate(newEvent)}
                disabled={!newEvent.title || !newEvent.event_date || addEvent.isPending}
                className="w-full"
              >
                Create Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{totalEvents}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-3xl font-bold text-gray-900">{upcomingEvents}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Ads</p>
                <p className="text-3xl font-bold text-gray-900">{pendingAds}</p>
              </div>
              <Megaphone className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ad Revenue</p>
                <p className="text-3xl font-bold text-gray-900">KES {adRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events */}
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingEvents ? (
            <div className="text-center py-8">Loading events...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Tickets</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.map((event) => {
                  const eventDate = new Date(event.event_date);
                  const isUpcoming = eventDate > new Date();
                  const isPast = eventDate < new Date();
                  
                  return (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {eventDate.toLocaleDateString()} at {eventDate.toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {event.ticket_price > 0 ? `KES ${event.ticket_price}` : 'Free'}
                      </TableCell>
                      <TableCell>
                        {event.current_attendees || 0}/{event.max_attendees || 'Unlimited'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getEventStatusColor(event.event_date)}>
                          {isPast ? 'Past' : isUpcoming ? 'Upcoming' : 'Today'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Advertisements */}
      <Card>
        <CardHeader>
          <CardTitle>Advertisement Approval</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingAds ? (
            <div className="text-center py-8">Loading advertisements...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Advertisement</TableHead>
                  <TableHead>Advertiser</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Display Period</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {advertisements?.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{ad.title}</div>
                        <div className="text-sm text-gray-500">{ad.content}</div>
                      </div>
                    </TableCell>
                    <TableCell>{ad.advertiser_contact}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>KES {ad.amount_paid || 0}</div>
                        <Badge variant={ad.payment_status === 'paid' ? 'default' : 'secondary'}>
                          {ad.payment_status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {ad.display_start && ad.display_end ? (
                          <>
                            <div>From: {new Date(ad.display_start).toLocaleDateString()}</div>
                            <div>To: {new Date(ad.display_end).toLocaleDateString()}</div>
                          </>
                        ) : (
                          'Not set'
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getAdStatusColor(ad.status)}>
                        {ad.status?.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {ad.status === 'pending_approval' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateAdStatus.mutate({
                                id: ad.id,
                                status: 'approved'
                              })}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateAdStatus.mutate({
                                id: ad.id,
                                status: 'rejected'
                              })}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
