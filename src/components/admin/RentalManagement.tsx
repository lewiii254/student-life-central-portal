
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Clock,
  Building,
  Bed,
  Bath,
  ImageIcon,
  Eye
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NewHouseData {
  title: string;
  description: string;
  price: string;
  location: string;
  sub_area: string;
  bedrooms: string;
  bathrooms: string;
  features: string;
  image_urls: string;
  landlord_name: string;
  landlord_contact: string;
  landlord_whatsapp: string;
}

export const RentalManagement = () => {
  const [newLocation, setNewLocation] = useState({ name: '', description: '' });
  const [searchFee, setSearchFee] = useState(200);
  const [showAddLocationDialog, setShowAddLocationDialog] = useState(false);
  const [showAddHouseDialog, setShowAddHouseDialog] = useState(false);
  const [newHouse, setNewHouse] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    sub_area: '',
    bedrooms: '',
    bathrooms: '',
    features: '',
    image_urls: '',
    landlord_name: '',
    landlord_contact: '',
    landlord_whatsapp: '',
  });
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

  // Fetch houses
  const { data: houses, isLoading: loadingHouses } = useQuery({
    queryKey: ['houses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('houses')
        .select('*')
        .order('created_at', { ascending: false });
      
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

  // Add new house
  const addHouse = useMutation({
    mutationFn: async (house: NewHouseData) => {
      const houseData = {
        ...house,
        price: parseInt(house.price),
        bedrooms: house.bedrooms ? parseInt(house.bedrooms) : null,
        bathrooms: house.bathrooms ? parseInt(house.bathrooms) : null,
        features: house.features ? house.features.split(',').map((f: string) => f.trim()) : [],
        image_urls: house.image_urls ? house.image_urls.split(',').map((url: string) => url.trim()) : [],
      };
      
      const { error } = await supabase
        .from('houses')
        .insert([houseData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['houses'] });
      setNewHouse({
        title: '',
        description: '',
        price: '',
        location: '',
        sub_area: '',
        bedrooms: '',
        bathrooms: '',
        features: '',
        image_urls: '',
        landlord_name: '',
        landlord_contact: '',
        landlord_whatsapp: '',
      });
      setShowAddHouseDialog(false);
      toast.success('House added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add house');
      console.error('Error adding house:', error);
    }
  });

  // Delete house
  const deleteHouse = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('houses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['houses'] });
      toast.success('House deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete house');
      console.error('Error deleting house:', error);
    }
  });

  // Toggle house availability
  const toggleHouseAvailability = useMutation({
    mutationFn: async ({ id, available }: { id: string, available: boolean }) => {
      const { error } = await supabase
        .from('houses')
        .update({ available, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['houses'] });
      toast.success('House availability updated');
    },
    onError: (error) => {
      toast.error('Failed to update house availability');
      console.error('Error updating house availability:', error);
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
    <div className="space-y-4 sm:space-y-8 p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Rental Management</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button onClick={exportData} variant="outline" disabled={!rentalRequests?.length} className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="houses" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="houses" className="text-xs sm:text-sm">Houses</TabsTrigger>
          <TabsTrigger value="requests" className="text-xs sm:text-sm">Requests</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="houses" className="space-y-6">
          {/* Add House Section */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="flex items-center text-lg sm:text-xl">
                <Building className="h-5 w-5 mr-2" />
                Post New House
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <Dialog open={showAddHouseDialog} onOpenChange={setShowAddHouseDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New House
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New House Listing</DialogTitle>
                    <DialogDescription>
                      Add a new house available for rent to the platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      placeholder="House title"
                      value={newHouse.title}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, title: e.target.value }))}
                      className="sm:col-span-2"
                    />
                    <Textarea
                      placeholder="Description"
                      value={newHouse.description}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, description: e.target.value }))}
                      className="sm:col-span-2 min-h-[80px]"
                    />
                    <Input
                      placeholder="Price (KES)"
                      type="number"
                      value={newHouse.price}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, price: e.target.value }))}
                    />
                    <Input
                      placeholder="Location/Area"
                      value={newHouse.location}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, location: e.target.value }))}
                    />
                    <Input
                      placeholder="Sub-area (optional)"
                      value={newHouse.sub_area}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, sub_area: e.target.value }))}
                    />
                    <Input
                      placeholder="Bedrooms"
                      type="number"
                      value={newHouse.bedrooms}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, bedrooms: e.target.value }))}
                    />
                    <Input
                      placeholder="Bathrooms"
                      type="number"
                      value={newHouse.bathrooms}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, bathrooms: e.target.value }))}
                    />
                    <Input
                      placeholder="Features (comma separated)"
                      value={newHouse.features}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, features: e.target.value }))}
                      className="sm:col-span-2"
                    />
                    <Input
                      placeholder="Image URLs (comma separated)"
                      value={newHouse.image_urls}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, image_urls: e.target.value }))}
                      className="sm:col-span-2"
                    />
                    <Input
                      placeholder="Landlord name"
                      value={newHouse.landlord_name}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, landlord_name: e.target.value }))}
                    />
                    <Input
                      placeholder="Landlord contact"
                      value={newHouse.landlord_contact}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, landlord_contact: e.target.value }))}
                    />
                    <Input
                      placeholder="WhatsApp (optional)"
                      value={newHouse.landlord_whatsapp}
                      onChange={(e) => setNewHouse(prev => ({ ...prev, landlord_whatsapp: e.target.value }))}
                      className="sm:col-span-2"
                    />
                    <Button 
                      onClick={() => addHouse.mutate(newHouse)}
                      disabled={!newHouse.title || !newHouse.price || !newHouse.location || !newHouse.landlord_name || !newHouse.landlord_contact || addHouse.isPending}
                      className="sm:col-span-2 w-full"
                    >
                      {addHouse.isPending ? 'Adding...' : 'Add House'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Houses List */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Posted Houses ({houses?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              {loadingHouses ? (
                <div className="text-center py-8">Loading houses...</div>
              ) : houses?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No houses posted yet.</div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {houses?.map((house) => (
                    <Card key={house.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg truncate pr-2">{house.title}</h3>
                            <Badge variant={house.available ? "default" : "secondary"} className="flex-shrink-0">
                              {house.available ? 'Available' : 'Unavailable'}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 text-sm line-clamp-2">{house.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                              <span className="font-medium">KES {house.price?.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                              <span className="truncate">{house.location}</span>
                            </div>
                            {house.bedrooms && (
                              <div className="flex items-center">
                                <Bed className="h-4 w-4 mr-1 text-purple-500" />
                                <span>{house.bedrooms} bed{house.bedrooms > 1 ? 's' : ''}</span>
                              </div>
                            )}
                            {house.bathrooms && (
                              <div className="flex items-center">
                                <Bath className="h-4 w-4 mr-1 text-cyan-500" />
                                <span>{house.bathrooms} bath{house.bathrooms > 1 ? 's' : ''}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center text-sm text-gray-500">
                            <User className="h-4 w-4 mr-1" />
                            <span className="truncate">{house.landlord_name} - {house.landlord_contact}</span>
                          </div>

                          <div className="flex space-x-2 pt-2">
                            <Button
                              size="sm"
                              variant={house.available ? "outline" : "default"}
                              onClick={() => toggleHouseAvailability.mutate({
                                id: house.id,
                                available: !house.available
                              })}
                              disabled={toggleHouseAvailability.isPending}
                              className="flex-1"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              {house.available ? 'Hide' : 'Show'}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deleteHouse.mutate(house.id)}
                              disabled={deleteHouse.isPending}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">

          {/* Rental Requests */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Rental Requests ({rentalRequests?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              {loadingRequests ? (
                <div className="text-center py-8">Loading requests...</div>
              ) : rentalRequests?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No rental requests yet.</div>
              ) : (
                <div className="space-y-4">
                  {/* Mobile Cards */}
                  <div className="sm:hidden space-y-3">
                    {rentalRequests?.map((request) => (
                      <Card key={request.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div className="min-w-0 flex-1">
                                <h3 className="font-medium text-base">{request.name}</h3>
                                <p className="text-sm text-gray-600">{request.contact}</p>
                              </div>
                              <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Location:</span>
                                <span className="ml-1">{request.preferred_location || 'Any'}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Budget:</span>
                                <span className="ml-1">KES {request.budget?.toLocaleString() || 'N/A'}</span>
                              </div>
                            </div>

                            <div className="text-sm">
                              <span className="text-gray-500">Agent:</span>
                              <span className="ml-1">{request.assigned_agent || 'Unassigned'}</span>
                            </div>

                            <div className="flex space-x-2 pt-2">
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
                                    className="flex-1"
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
                                    className="flex-1"
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
                                  className="w-full"
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Complete
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden sm:block overflow-x-auto">
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
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Settings Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Search Fee Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Current Search Fee (KES)</label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
                      <Input
                        type="number"
                        value={searchFee}
                        onChange={(e) => setSearchFee(Number(e.target.value))}
                        className="w-full sm:w-32"
                        min="0"
                      />
                      <Button 
                        onClick={() => updateSearchFeeMutation.mutate(searchFee)}
                        disabled={updateSearchFeeMutation.isPending}
                        className="w-full sm:w-auto"
                      >
                        {updateSearchFeeMutation.isPending ? 'Updating...' : 'Update Fee'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <MapPin className="h-5 w-5 mr-2" />
                  Add New Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-0">
                <Dialog open={showAddLocationDialog} onOpenChange={setShowAddLocationDialog}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Location
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
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

          {/* Available Locations */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-lg sm:text-xl">Available Locations ({locations?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              {loadingLocations ? (
                <div className="text-center py-8">Loading locations...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {locations?.map((location) => (
                    <div key={location.id} className="p-3 sm:p-4 border rounded-lg">
                      <h3 className="font-semibold text-sm sm:text-base">{location.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{location.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <Badge variant={location.available ? "default" : "secondary"} className="text-xs">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};
