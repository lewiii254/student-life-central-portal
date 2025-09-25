
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Database } from '@/integrations/supabase/types';
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
  Bike, 
  Plus, 
  Edit, 
  Calendar,
  DollarSign,
  Users,
  Wrench,
  CheckCircle,
  Clock,
  Trash2
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Bicycle = Database['public']['Tables']['bicycles']['Row'];
type BicycleUpdate = Database['public']['Tables']['bicycles']['Update'];

export const BicycleRentals = () => {
  const [newBicycle, setNewBicycle] = useState({
    name: '',
    description: '',
    hourly_rate: 0,
    daily_rate: 0,
    status: 'available'
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingBicycle, setEditingBicycle] = useState<Bicycle | null>(null);
  const queryClient = useQueryClient();

  // Fetch bicycles
  const { data: bicycles, isLoading: loadingBicycles } = useQuery({
    queryKey: ['bicycles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bicycles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch bookings
  const { data: bookings, isLoading: loadingBookings } = useQuery({
    queryKey: ['bicycle-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bicycle_bookings')
        .select(`
          *,
          bicycles (
            name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add new bicycle
  const addBicycle = useMutation({
    mutationFn: async (bicycle: typeof newBicycle) => {
      const { error } = await supabase
        .from('bicycles')
        .insert([bicycle]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bicycles'] });
      setNewBicycle({
        name: '',
        description: '',
        hourly_rate: 0,
        daily_rate: 0,
        status: 'available'
      });
      setShowAddDialog(false);
      toast.success('Bicycle added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add bicycle');
      console.error('Error adding bicycle:', error);
    }
  });

  // Update bicycle
  const updateBicycle = useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: BicycleUpdate }) => {
      const { error } = await supabase
        .from('bicycles')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bicycles'] });
      setEditingBicycle(null);
      toast.success('Bicycle updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update bicycle');
      console.error('Error updating bicycle:', error);
    }
  });

  // Delete bicycle
  const deleteBicycle = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bicycles')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bicycles'] });
      toast.success('Bicycle deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete bicycle');
      console.error('Error deleting bicycle:', error);
    }
  });

  // Update bicycle status
  const updateBicycleStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { error } = await supabase
        .from('bicycles')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bicycles'] });
      toast.success('Bicycle status updated');
    },
    onError: (error) => {
      toast.error('Failed to update bicycle status');
      console.error('Error updating status:', error);
    }
  });

  // Update booking status
  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { error } = await supabase
        .from('bicycle_bookings')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bicycle-bookings'] });
      toast.success('Booking status updated');
    },
    onError: (error) => {
      toast.error('Failed to update booking status');
      console.error('Error updating booking:', error);
    }
  });

  const getBicycleStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in_use': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_service': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const totalBicycles = bicycles?.length || 0;
  const availableBicycles = bicycles?.filter(b => b.status === 'available').length || 0;
  const activeBookings = bookings?.filter(b => b.status === 'active').length || 0;
  const totalEarnings = bookings?.reduce((sum, b) => sum + b.total_cost, 0) || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Bicycle Rentals</h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Bicycle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Bicycle</DialogTitle>
              <DialogDescription>
                Add a new bicycle to your rental fleet.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Bicycle name/model"
                value={newBicycle.name}
                onChange={(e) => setNewBicycle(prev => ({ ...prev, name: e.target.value }))}
              />
              <Textarea
                placeholder="Description"
                value={newBicycle.description}
                onChange={(e) => setNewBicycle(prev => ({ ...prev, description: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Hourly rate (KES)"
                value={newBicycle.hourly_rate || ''}
                onChange={(e) => setNewBicycle(prev => ({ ...prev, hourly_rate: Number(e.target.value) }))}
                min="0"
              />
              <Input
                type="number"
                placeholder="Daily rate (KES)"
                value={newBicycle.daily_rate || ''}
                onChange={(e) => setNewBicycle(prev => ({ ...prev, daily_rate: Number(e.target.value) }))}
                min="0"
              />
              <select 
                className="w-full p-2 border rounded-md"
                value={newBicycle.status}
                onChange={(e) => setNewBicycle(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="available">Available</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="out_of_service">Out of Service</option>
              </select>
              <Button 
                onClick={() => addBicycle.mutate(newBicycle)}
                disabled={!newBicycle.name || !newBicycle.hourly_rate || addBicycle.isPending}
                className="w-full"
              >
                {addBicycle.isPending ? 'Adding...' : 'Add Bicycle'}
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
                <p className="text-sm font-medium text-gray-600">Total Bicycles</p>
                <p className="text-3xl font-bold text-gray-900">{totalBicycles}</p>
              </div>
              <Bike className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-3xl font-bold text-gray-900">{availableBicycles}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Rentals</p>
                <p className="text-3xl font-bold text-gray-900">{activeBookings}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
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
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bicycles Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Bicycle Fleet</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingBicycles ? (
            <div className="text-center py-8">Loading bicycles...</div>
          ) : bicycles?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No bicycles added yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bicycle</TableHead>
                  <TableHead>Rates</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bicycles?.map((bicycle) => (
                  <TableRow key={bicycle.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{bicycle.name}</div>
                        <div className="text-sm text-gray-500">{bicycle.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Hourly: KES {bicycle.hourly_rate}</div>
                        <div>Daily: KES {bicycle.daily_rate}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getBicycleStatusColor(bicycle.status)}>
                        {bicycle.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Bicycle</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                placeholder="Bicycle name"
                                defaultValue={bicycle.name}
                                onChange={(e) => setEditingBicycle({...bicycle, name: e.target.value})}
                              />
                              <Textarea
                                placeholder="Description"
                                defaultValue={bicycle.description || ''}
                                onChange={(e) => setEditingBicycle({...bicycle, description: e.target.value})}
                              />
                              <Input
                                type="number"
                                placeholder="Hourly rate"
                                defaultValue={bicycle.hourly_rate}
                                onChange={(e) => setEditingBicycle({...bicycle, hourly_rate: Number(e.target.value)})}
                              />
                              <Input
                                type="number"
                                placeholder="Daily rate"
                                defaultValue={bicycle.daily_rate}
                                onChange={(e) => setEditingBicycle({...bicycle, daily_rate: Number(e.target.value)})}
                              />
                              <Button 
                                onClick={() => updateBicycle.mutate({
                                  id: bicycle.id,
                                  updates: editingBicycle || bicycle
                                })}
                                disabled={updateBicycle.isPending}
                                className="w-full"
                              >
                                {updateBicycle.isPending ? 'Updating...' : 'Update Bicycle'}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {bicycle.status === 'available' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBicycleStatus.mutate({
                              id: bicycle.id,
                              status: 'maintenance'
                            })}
                            disabled={updateBicycleStatus.isPending}
                          >
                            <Wrench className="h-3 w-3" />
                          </Button>
                        )}
                        
                        {bicycle.status === 'maintenance' && (
                          <Button
                            size="sm"
                            onClick={() => updateBicycleStatus.mutate({
                              id: bicycle.id,
                              status: 'available'
                            })}
                            disabled={updateBicycleStatus.isPending}
                          >
                            Available
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteBicycle.mutate(bicycle.id)}
                          disabled={deleteBicycle.isPending}
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

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingBookings ? (
            <div className="text-center py-8">Loading bookings...</div>
          ) : !bookings?.length ? (
            <div className="text-center py-8 text-gray-500">No bookings yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Bicycle</TableHead>
                  <TableHead>Rental Period</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings?.slice(0, 10).map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{booking.customer_name}</div>
                        <div className="text-sm text-gray-500">{booking.customer_contact}</div>
                      </div>
                    </TableCell>
                    <TableCell>{booking.bicycles?.name || 'Unknown'}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Start: {new Date(booking.rental_start).toLocaleDateString()}</div>
                        <div>End: {new Date(booking.rental_end).toLocaleDateString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>KES {booking.total_cost.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getBookingStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {booking.status === 'active' && (
                          <Button
                            size="sm"
                            onClick={() => updateBookingStatus.mutate({
                              id: booking.id,
                              status: 'completed'
                            })}
                            disabled={updateBookingStatus.isPending}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Complete
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
