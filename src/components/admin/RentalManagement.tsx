
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
  Download
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const RentalManagement = () => {
  const [newLocation, setNewLocation] = useState({ name: '', description: '' });
  const [searchFee, setSearchFee] = useState(200);
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
      toast.success('Location added successfully');
    }
  });

  // Update search fee
  const updateSearchFee = useMutation({
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

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Rental Management</h2>
        <Button onClick={exportData} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Settings Card */}
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
                <label className="text-sm font-medium">Current Search Fee</label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    type="number"
                    value={searchFee}
                    onChange={(e) => setSearchFee(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-sm text-gray-600">KES</span>
                </div>
              </div>
              <Button 
                onClick={() => updateSearchFee.mutate(searchFee)}
                disabled={updateSearchFee.isPending}
              >
                Update Fee
              </Button>
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
            <div className="space-y-4">
              <Input
                placeholder="Location name"
                value={newLocation.name}
                onChange={(e) => setNewLocation(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Description"
                value={newLocation.description}
                onChange={(e) => setNewLocation(prev => ({ ...prev, description: e.target.value }))}
              />
              <Button 
                onClick={() => addLocation.mutate(newLocation)}
                disabled={!newLocation.name || addLocation.isPending}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </div>
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
                        <Button
                          size="sm"
                          onClick={() => updateRequestStatus.mutate({
                            id: request.id,
                            status: 'completed',
                            assigned_agent: 'Admin'
                          })}
                        >
                          Mark Found
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRequestStatus.mutate({
                            id: request.id,
                            status: 'in_progress',
                            assigned_agent: 'Admin'
                          })}
                        >
                          Assign
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
                  <div className="mt-3 flex items-center space-x-2">
                    <Badge variant={location.available ? "default" : "secondary"}>
                      {location.available ? 'Available' : 'Unavailable'}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
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
