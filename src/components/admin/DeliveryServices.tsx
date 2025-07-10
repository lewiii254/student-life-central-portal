
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
  Truck, 
  User, 
  MapPin, 
  Clock,
  DollarSign,
  TrendingUp,
  Package
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const DeliveryServices = () => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [riderName, setRiderName] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
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

  // Update delivery request
  const updateDeliveryRequest = useMutation({
    mutationFn: async ({ id, status, assigned_rider, delivery_fee }: { 
      id: string, 
      status: string, 
      assigned_rider?: string,
      delivery_fee?: number 
    }) => {
      const updateData: any = { status, updated_at: new Date().toISOString() };
      if (assigned_rider) updateData.assigned_rider = assigned_rider;
      if (delivery_fee !== undefined) updateData.delivery_fee = delivery_fee;

      const { error } = await supabase
        .from('delivery_requests')
        .update(updateData)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-requests'] });
      setSelectedRequest(null);
      setRiderName('');
      setDeliveryFee(0);
      toast.success('Delivery request updated successfully');
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'picked': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType.toLowerCase()) {
      case 'laundry': return '👕';
      case 'gas': return '🔥';
      case 'water': return '💧';
      case 'food': return '🍕';
      case 'grocery': return '🛒';
      default: return '📦';
    }
  };

  // Calculate stats
  const totalRequests = deliveryRequests?.length || 0;
  const pendingRequests = deliveryRequests?.filter(r => r.status === 'pending').length || 0;
  const completedRequests = deliveryRequests?.filter(r => r.status === 'delivered').length || 0;
  const totalEarnings = deliveryRequests?.reduce((sum, r) => sum + (r.delivery_fee || 0), 0) || 0;

  // Group by service type
  const serviceStats = deliveryRequests?.reduce((acc: any, request) => {
    const service = request.service_type;
    if (!acc[service]) {
      acc[service] = 0;
    }
    acc[service]++;
    return acc;
  }, {}) || {};

  const assignRider = (requestId: string) => {
    if (!riderName) {
      toast.error('Please enter rider name');
      return;
    }
    updateDeliveryRequest.mutate({
      id: requestId,
      status: 'assigned',
      assigned_rider: riderName,
      delivery_fee: deliveryFee
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Delivery Services</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="px-3 py-1">
            {pendingRequests} Pending
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            KES {totalEarnings.toLocaleString()} Earned
          </Badge>
        </div>
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
              <Truck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Earnings</p>
                <p className="text-3xl font-bold text-gray-900">KES {totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Types Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Service Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(serviceStats).map(([service, count]) => (
              <div key={service} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">{getServiceIcon(service)}</div>
                <div className="font-semibold capitalize">{service}</div>
                <div className="text-sm text-gray-600">{count} requests</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading delivery requests...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Addresses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rider</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryRequests?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getServiceIcon(request.service_type)}</span>
                        <span className="capitalize font-medium">{request.service_type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.customer_name}</div>
                        <div className="text-sm text-gray-500">{request.customer_contact}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div><strong>From:</strong> {request.pickup_address || 'Not specified'}</div>
                        <div><strong>To:</strong> {request.delivery_address || 'Not specified'}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.assigned_rider || 'Unassigned'}</TableCell>
                    <TableCell>KES {request.delivery_fee || 0}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {request.status === 'pending' && (
                          <div className="flex space-x-2">
                            {selectedRequest === request.id ? (
                              <div className="flex space-x-1">
                                <Input
                                  placeholder="Rider name"
                                  value={riderName}
                                  onChange={(e) => setRiderName(e.target.value)}
                                  className="w-24 h-8"
                                />
                                <Input
                                  type="number"
                                  placeholder="Fee"
                                  value={deliveryFee}
                                  onChange={(e) => setDeliveryFee(Number(e.target.value))}
                                  className="w-20 h-8"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => assignRider(request.id)}
                                >
                                  Assign
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setSelectedRequest(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => setSelectedRequest(request.id)}
                              >
                                Assign Rider
                              </Button>
                            )}
                          </div>
                        )}
                        {request.status === 'assigned' && (
                          <Button
                            size="sm"
                            onClick={() => updateDeliveryRequest.mutate({
                              id: request.id,
                              status: 'picked'
                            })}
                          >
                            Mark Picked
                          </Button>
                        )}
                        {request.status === 'picked' && (
                          <Button
                            size="sm"
                            onClick={() => updateDeliveryRequest.mutate({
                              id: request.id,
                              status: 'delivered'
                            })}
                          >
                            Mark Delivered
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
