
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
  MessageSquare, 
  Reply, 
  Send,
  Users,
  Star,
  TrendingUp,
  Megaphone
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const CustomerChat = () => {
  const [selectedInquiry, setSelectedInquiry] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [showBroadcastDialog, setShowBroadcastDialog] = useState(false);
  const queryClient = useQueryClient();

  // Fetch customer inquiries
  const { data: inquiries, isLoading } = useQuery({
    queryKey: ['customer-inquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Respond to inquiry
  const respondToInquiry = useMutation({
    mutationFn: async ({ id, response }: { id: string, response: string }) => {
      const { error } = await supabase
        .from('customer_inquiries')
        .update({ 
          response, 
          status: 'responded',
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-inquiries'] });
      setSelectedInquiry(null);
      setResponse('');
      toast.success('Response sent successfully');
    }
  });

  // Mark as read
  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('customer_inquiries')
        .update({ 
          status: 'read',
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-inquiries'] });
      toast.success('Marked as read');
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sendBroadcast = () => {
    // In a real app, this would send WhatsApp/SMS messages
    console.log('Broadcasting message:', broadcastMessage);
    toast.success('Broadcast message sent to all customers!');
    setBroadcastMessage('');
    setShowBroadcastDialog(false);
  };

  const sendWhatsAppResponse = (inquiry: any) => {
    const message = response || 'Thank you for contacting Campus Connect! We\'ve received your inquiry and will get back to you soon.';
    const whatsappUrl = `https://wa.me/${inquiry.customer_contact.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Calculate stats
  const totalInquiries = inquiries?.length || 0;
  const unreadInquiries = inquiries?.filter(i => i.status === 'unread').length || 0;
  const respondedInquiries = inquiries?.filter(i => i.status === 'responded').length || 0;
  const responseRate = totalInquiries > 0 ? Math.round((respondedInquiries / totalInquiries) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Customer Chat & Feedback</h2>
        <Dialog open={showBroadcastDialog} onOpenChange={setShowBroadcastDialog}>
          <DialogTrigger asChild>
            <Button>
              <Megaphone className="h-4 w-4 mr-2" />
              Send Broadcast
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send Broadcast Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your broadcast message..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                rows={4}
              />
              <div className="text-sm text-gray-600">
                This message will be sent to all customers via WhatsApp/SMS
              </div>
              <Button 
                onClick={sendBroadcast}
                disabled={!broadcastMessage}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Broadcast
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
                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p className="text-3xl font-bold text-gray-900">{totalInquiries}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-3xl font-bold text-gray-900">{unreadInquiries}</p>
              </div>
              <Users className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Responded</p>
                <p className="text-3xl font-bold text-gray-900">{respondedInquiries}</p>
              </div>
              <Reply className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-3xl font-bold text-gray-900">{responseRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Inquiries */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading inquiries...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries?.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{inquiry.customer_name}</div>
                        <div className="text-sm text-gray-500">{inquiry.customer_contact}</div>
                      </div>
                    </TableCell>
                    <TableCell>{inquiry.subject || 'General Inquiry'}</TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">{inquiry.message}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(inquiry.status)}>
                        {inquiry.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {inquiry.status === 'unread' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead.mutate(inquiry.id)}
                          >
                            Mark Read
                          </Button>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Reply className="h-3 w-3 mr-1" />
                              Respond
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Respond to {inquiry.customer_name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="font-medium mb-2">Original Message:</div>
                                <div className="text-sm">{inquiry.message}</div>
                              </div>
                              <Textarea
                                placeholder="Type your response..."
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                rows={4}
                              />
                              <div className="flex space-x-2">
                                <Button
                                  onClick={() => {
                                    respondToInquiry.mutate({ id: inquiry.id, response });
                                  }}
                                  disabled={!response}
                                >
                                  Save Response
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => sendWhatsAppResponse(inquiry)}
                                >
                                  Send via WhatsApp
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick Response Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Response Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Order Confirmation</h4>
              <p className="text-sm text-gray-600 mb-3">Thank you for your order! We've received it and will process it shortly.</p>
              <Button size="sm" variant="outline">Use Template</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Delivery Update</h4>
              <p className="text-sm text-gray-600 mb-3">Your order is ready for pickup/delivery. Please visit our location or wait for our delivery team.</p>
              <Button size="sm" variant="outline">Use Template</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Stock Notification</h4>
              <p className="text-sm text-gray-600 mb-3">Great news! The item you inquired about is now back in stock. Order now to secure yours!</p>
              <Button size="sm" variant="outline">Use Template</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Event Reminder</h4>
              <p className="text-sm text-gray-600 mb-3">Don't forget about our upcoming event! Limited spots remaining. Register now.</p>
              <Button size="sm" variant="outline">Use Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
