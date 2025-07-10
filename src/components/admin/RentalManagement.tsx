
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
  Home, 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign,
  MapPin,
  User,
  Phone,
  Download,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const RentalManagement = () => {
  const [newLocation, setNewLocation] = useState({ name: '', description: '' });
  const [searchFee, setSearchFee] = useState(200);
  const [showAddLocationDialog, setShowAddLocationDialog] = useState(false);
  const queryClient = useQueryClient();

  // Fetch rental requests
  const { data: rentalRequests, isLoading: loadingRequests } = useQuery({
    queryKey: ['rental-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rental_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch rental locations
  const { data: locations, isLoading: loadingLocations } = useQuery({
    queryKey: ['rental-locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rental_locations')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch rental settings
  const { data: settings } = useQuery({
    queryKey: ['rental-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rental_settings')
        .select('*')
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  // Update request status
  const updateRequestStatus = useMutation({
    mutationFn: async ({ id, status, assigned_agent }: { id: string, status: string, assigned_agent?: string }) => {
      const { error } = await supabase
        .from('rental_requests')
        .update({ status, assigned_agent, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rental-requests'] });
      toast.success('Request updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update request');
      console.error('Error updating request:', error);
    }
  });

  // Add new location
  const addLocation = useMutation({
    mutationFn: async (location: { name: string, description: string }) => {
      const { error } = await supabase
        .from('rental_locations')
        .insert([location]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rental-locations'] });
      setNewLocation({ name: '', description: '' });
      setShowAddLocationDialog(false);
      toast.success('Location added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add location');
      console.error('Error adding location:', error);
    }
  });

  // Delete location
  const deleteLocation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('rental_locations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rental-locations'] });
      toast.success('Location deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete location');
      console.error('Error deleting location:', error);
    }
  });

  // Update search fee
  const updateSearchFeeMutation = useMutation({
    mutationFn: async (fee: number) => {
      const { error } = await supabase
        .from('rental_settings')
        .update({ search_fee: fee, updated_at: new Date().toISOString() })
        .eq('id', settings?.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rental-settings'] });
      toast.success('Search fee updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update search fee');
      console.error('Error updating search fee:', error);
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportData = () => {
    if (!rentalRequests) return;
    
    const csvContent = [
      ['Name', 'Contact', 'Location', 'Budget', 'Status', 'Agent', 'Date'],
      ...rentalRequests.map(request => [
        request.name,
        request.contact,
        request.preferred_location || '',
        request.budget || '',
        request.status,
        request.assigned_agent || '',
        new Date(request.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rental-requests.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Initialize search fee from settings
  React.useEffect(() => {
    if (settings?.search_fee) {
      setSearchFee(settings.search_fee);
    }
  }, [settings]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Rental Management</h2>
        <Button onClick={exportData} variant="outline" disabled={!rentalRequests?.length}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Search Fee Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Current Search Fee (KES)</label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    type="number"
                    value={searchFee}
                    onChange={(e) => setSearchFee(Number(e.target.value))}
                    className="w-32"
                    min="0"
                  />
                  <Button 
                    onClick={() => updateSearchFeeMutation.mutate(searchFee)}
                    disabled={updateSearchFeeMutation.isPending}
                  >
                    {updateSearchFeeMutation.isPending ? 'Updating...' : 'Update Fee'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Add New Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog open={showAddLocationDialog} onOpenChange={setShowAddLocationDialog}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Location
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Rental Location</DialogTitle>
                  <DialogDescription>
                    Add a new location where students can find rentals.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Location name (e.g., Westlands)"
                    value={newLocation.name}
                    onChange={(e) => setNewLocation(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    placeholder="Description (e.g., Near shopping centers)"
                    value={newLocation.description}
                    onChange={(e) => setNewLocation(prev => ({ ...prev, description: e.target.value }))}
                  />
                  <Button 
                    onClick={() => addLocation.mutate(newLocation)}
                    disabled={!newLocation.name || addLocation.isPending}
                    className="w-full"
                  >
                    {addLocation.isPending ? 'Adding...' : 'Add Location'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Rental Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Rental Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingRequests ? (
            <div className="text-center py-8">Loading requests...</div>
          ) : rentalRequests?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No rental requests yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Preferred Location</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentalRequests?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.name}</TableCell>
                    <TableCell>{request.contact}</TableCell>
                    <TableCell>{request.preferred_location || 'Any'}</TableCell>
                    <TableCell>KES {request.budget?.toLocaleString() || 'Not specified'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </TableCell>
                    <TableCell>{request.assigned_agent || 'Unassigned'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {request.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateRequestStatus.mutate({
                                id: request.id,
                                status: 'in_progress',
                                assigned_agent: 'Admin'
                              })}
                              disabled={updateRequestStatus.isPending}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              Assign
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateRequestStatus.mutate({
                                id: request.id,
                                status: 'completed',
                                assigned_agent: 'Admin'
                              })}
                              disabled={updateRequestStatus.isPending}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Found
                            </Button>
                          </>
                        )}
                        {request.status === 'in_progress' && (
                          <Button
                            size="sm"
                            onClick={() => updateRequestStatus.mutate({
                              id: request.id,
                              status: 'completed'
                            })}
                            disabled={updateRequestStatus.isPending}
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

      {/* Available Locations */}
      <Card>
        <CardHeader>
          <CardTitle>Available Locations</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingLocations ? (
            <div className="text-center py-8">Loading locations...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations?.map((location) => (
                <div key={location.id} className="p-4 border rounded-lg">
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{location.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge variant={location.available ? "default" : "secondary"}>
                      {location.available ? 'Available' : 'Unavailable'}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteLocation.mutate(location.id)}
                      disabled={deleteLocation.isPending}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
