
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Users,
  DollarSign,
  Eye,
  CheckCircle,
  X,
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
    max_attendees: 0,
    banner_image_url: ''
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
        max_attendees: 0,
        banner_image_url: ''
      });
      setShowAddEventDialog(false);
      toast.success('Event added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add event');
      console.error('Error adding event:', error);
    }
  });

  // Delete event
  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete event');
      console.error('Error deleting event:', error);
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
    },
    onError: (error) => {
      toast.error('Failed to update advertisement status');
      console.error('Error updating ad:', error);
    }
  });

  // Delete advertisement
  const deleteAd = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('advertisements')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['advertisements'] });
      toast.success('Advertisement deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete advertisement');
      console.error('Error deleting ad:', error);
    }
  });

  const getEventStatusColor = (eventDate: string) => {
    const now = new Date();
    const event = new Date(eventDate);
    
    if (event < now) return 'bg-gray-100 text-gray-800'; // Past
    if (event.toDateString() === now.toDateString()) return 'bg-green-100 text-green-800'; // Today
    return 'bg-blue-100 text-blue-800'; // Future
  };

  const getAdStatusColor = (status: string) => {
    switch (status) {
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const totalEvents = events?.length || 0;
  const upcomingEvents = events?.filter(e => new Date(e.event_date) > new Date()).length || 0;
  const totalAds = advertisements?.length || 0;
  const pendingAds = advertisements?.filter(a => a.status === 'pending_approval').length || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Events & Advertisements</h2>
        <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event for students to attend.
              </DialogDescription>
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
                placeholder="Event date and time"
                value={newEvent.event_date}
                onChange={(e) => setNewEvent(prev => ({ ...prev, event_date: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Ticket price (KES, 0 for free)"
                value={newEvent.ticket_price || ''}
                onChange={(e) => setNewEvent(prev => ({ ...prev, ticket_price: Number(e.target.value) }))}
                min="0"
              />
              <Input
                type="number"
                placeholder="Maximum attendees (optional)"
                value={newEvent.max_attendees || ''}
                onChange={(e) => setNewEvent(prev => ({ ...prev, max_attendees: Number(e.target.value) }))}
                min="1"
              />
              <Input
                placeholder="Banner image URL (optional)"
                value={newEvent.banner_image_url}
                onChange={(e) => setNewEvent(prev => ({ ...prev, banner_image_url: e.target.value }))}
              />
              <Button 
                onClick={() => addEvent.mutate(newEvent)}
                disabled={!newEvent.title || !newEvent.event_date || addEvent.isPending}
                className="w-full"
              >
                {addEvent.isPending ? 'Adding...' : 'Add Event'}
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
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-3xl font-bold text-gray-900">{upcomingEvents}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Ads</p>
                <p className="text-3xl font-bold text-gray-900">{totalAds}</p>
              </div>
              <Megaphone className="h-8 w-8 text-purple-600" />
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
              <Megaphone className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Management */}
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingEvents ? (
            <div className="text-center py-8">Loading events...</div>
          ) : events?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No events created yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Attendees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events?.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {event.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(event.event_date).toLocaleDateString()}
                        <br />
                        {new Date(event.event_date).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {event.ticket_price ? `KES ${event.ticket_price}` : 'Free'}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {event.current_attendees || 0}
                        {event.max_attendees && ` / ${event.max_attendees}`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getEventStatusColor(event.event_date)}>
                        {new Date(event.event_date) < new Date() ? 'Past' : 
                         new Date(event.event_date).toDateString() === new Date().toDateString() ? 'Today' : 'Upcoming'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteEvent.mutate(event.id)}
                          disabled={deleteEvent.isPending}
                        >
                          <Trash2 className="h-3 w-3" />
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

      {/* Advertisements Management */}
      <Card>
        <CardHeader>
          <CardTitle>Advertisements</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingAds ? (
            <div className="text-center py-8">Loading advertisements...</div>
          ) : advertisements?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No advertisements submitted yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ad Title</TableHead>
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
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {ad.content}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{ad.advertiser_contact}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Amount: KES {ad.amount_paid}</div>
                        <Badge variant={ad.payment_status === 'paid' ? 'default' : 'destructive'}>
                          {ad.payment_status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {ad.display_start && ad.display_end ? (
                          <>
                            <div>{new Date(ad.display_start).toLocaleDateString()}</div>
                            <div>to {new Date(ad.display_end).toLocaleDateString()}</div>
                          </>
                        ) : (
                          'Not set'
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getAdStatusColor(ad.status)}>
                        {ad.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {ad.status === 'pending_approval' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateAdStatus.mutate({ id: ad.id, status: 'approved' })}
                              disabled={updateAdStatus.isPending}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateAdStatus.mutate({ id: ad.id, status: 'rejected' })}
                              disabled={updateAdStatus.isPending}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteAd.mutate(ad.id)}
                          disabled={deleteAd.isPending}
                        >
                          <Trash2 className="h-3 w-3" />
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
