
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Truck, 
  Clock,
  CheckCircle,
  MapPin,
  User,
  Phone,
  Package,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const DeliveryServices = () => {
  const [selectedService, setSelectedService] = useState('all');
  const queryClient = useQueryClient();

  // Fetch delivery requests
  const { data: deliveryRequests, isLoading } = useQuery({
    queryKey: ['delivery-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('delivery_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Update delivery status
  const updateDeliveryStatus = useMutation({
    mutationFn: async ({ id, status, assigned_rider }: { id: string, status: string, assigned_rider?: string }) => {
      const { error } = await supabase
        .from('delivery_requests')
        .update({ 
          status, 
          assigned_rider, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-requests'] });
      toast.success('Delivery status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update delivery status');
      console.error('Error updating delivery:', error);
    }
  });

  // Update delivery fee
  const updateDeliveryFee = useMutation({
    mutationFn: async ({ id, fee }: { id: string, fee: number }) => {
      const { error } = await supabase
        .from('delivery_requests')
        .update({ 
          delivery_fee: fee,
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-requests'] });
      toast.success('Delivery fee updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update delivery fee');
      console.error('Error updating fee:', error);
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'picked_up': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const serviceTypes = [
    'Laundry',
    'Gas Delivery',
    'Water Delivery', 
    'Food Delivery',
    'Package Delivery',
    'Shopping',
    'Other'
  ];

  // Calculate stats
  const totalRequests = deliveryRequests?.length || 0;
  const pendingRequests = deliveryRequests?.filter(r => r.status === 'pending').length || 0;
  const completedRequests = deliveryRequests?.filter(r => r.status === 'delivered').length || 0;
  const totalEarnings = deliveryRequests?.reduce((sum, r) => sum + (r.delivery_fee || 0), 0) || 0;

  // Group by service type
  const serviceStats = deliveryRequests?.reduce((acc: Record<string, number>, request) => {
    const service = request.service_type;
    if (!acc[service]) {
      acc[service] = 0;
    }
    acc[service]++;
    return acc;
  }, {}) || {};

  // Filter requests based on selected service
  const filteredRequests = selectedService === 'all' 
    ? deliveryRequests 
    : deliveryRequests?.filter(r => r.service_type === selectedService);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Delivery Services</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900">{totalRequests}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-gray-900">{pendingRequests}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{completedRequests}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">KES {totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Type Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Service Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(serviceStats).map(([service, count]) => (
              <div key={service} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{service}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedService === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedService('all')}
            >
              All Services
            </Button>
            {serviceTypes.map(service => (
              <Button
                key={service}
                variant={selectedService === service ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedService(service)}
              >
                {service}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Requests */}
      <Card>
        <CardHeader>
          <CardTitle>
            Delivery Requests 
            {selectedService !== 'all' && ` - ${selectedService}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading delivery requests...</div>
          ) : !filteredRequests?.length ? (
            <div className="text-center py-8 text-gray-500">
              No {selectedService !== 'all' ? selectedService.toLowerCase() : ''} delivery requests yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Pickup</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rider</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.customer_name}</div>
                        <div className="text-sm text-gray-500">{request.customer_contact}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{request.service_type}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {request.pickup_address || 'Not specified'}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {request.delivery_address || 'Not specified'}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            KES {request.delivery_fee || 0}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Update Delivery Fee</DialogTitle>
                            <DialogDescription>
                              Set the delivery fee for this request.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              type="number"
                              placeholder="Delivery fee (KES)"
                              defaultValue={request.delivery_fee || ''}
                              onBlur={(e) => {
                                const fee = Number(e.target.value);
                                if (fee !== request.delivery_fee) {
                                  updateDeliveryFee.mutate({ id: request.id, fee });
                                }
                              }}
                              min="0"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.assigned_rider || 'Unassigned'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {request.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => updateDeliveryStatus.mutate({
                              id: request.id,
                              status: 'assigned',
                              assigned_rider: 'Admin'
                            })}
                            disabled={updateDeliveryStatus.isPending}
                          >
                            <User className="h-3 w-3 mr-1" />
                            Assign
                          </Button>
                        )}
                        {request.status === 'assigned' && (
                          <Button
                            size="sm"
                            onClick={() => updateDeliveryStatus.mutate({
                              id: request.id,
                              status: 'picked_up'
                            })}
                            disabled={updateDeliveryStatus.isPending}
                          >
                            <Package className="h-3 w-3 mr-1" />
                            Picked
                          </Button>
                        )}
                        {request.status === 'picked_up' && (
                          <Button
                            size="sm"
                            onClick={() => updateDeliveryStatus.mutate({
                              id: request.id,
                              status: 'delivered'
                            })}
                            disabled={updateDeliveryStatus.isPending}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Delivered
                          </Button>
                        )}
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
