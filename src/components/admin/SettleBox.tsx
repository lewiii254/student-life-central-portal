
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
  Home, 
  Plus, 
  Edit, 
  Trash2, 
  Store,
  ExternalLink,
  Package,
  DollarSign
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const SettleBox = () => {
  const [newShop, setNewShop] = useState({
    name: '',
    contact: '',
    location: '',
    commission_rate: 10,
    whatsapp_link: ''
  });
  const [newItem, setNewItem] = useState({
    partner_shop_id: '',
    name: '',
    price: 0,
    condition: 'new',
    image_url: ''
  });
  const [showAddShopDialog, setShowAddShopDialog] = useState(false);
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const queryClient = useQueryClient();

  // Fetch partner shops
  const { data: partnerShops, isLoading: loadingShops } = useQuery({
    queryKey: ['partner-shops'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partner_shops')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch household items
  const { data: householdItems, isLoading: loadingItems } = useQuery({
    queryKey: ['household-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('household_items')
        .select(`
          *,
          partner_shops (
            name
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add new partner shop
  const addShop = useMutation({
    mutationFn: async (shop: typeof newShop) => {
      const { error } = await supabase
        .from('partner_shops')
        .insert([shop]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-shops'] });
      setNewShop({
        name: '',
        contact: '',
        location: '',
        commission_rate: 10,
        whatsapp_link: ''
      });
      setShowAddShopDialog(false);
      toast.success('Partner shop added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add partner shop');
      console.error('Error adding shop:', error);
    }
  });

  // Add new household item
  const addItem = useMutation({
    mutationFn: async (item: typeof newItem) => {
      const { error } = await supabase
        .from('household_items')
        .insert([item]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['household-items'] });
      setNewItem({
        partner_shop_id: '',
        name: '',
        price: 0,
        condition: 'new',
        image_url: ''
      });
      setShowAddItemDialog(false);
      toast.success('Item added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add item');
      console.error('Error adding item:', error);
    }
  });

  // Delete partner shop
  const deleteShop = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('partner_shops')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-shops'] });
      queryClient.invalidateQueries({ queryKey: ['household-items'] });
      toast.success('Partner shop deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete partner shop');
      console.error('Error deleting shop:', error);
    }
  });

  // Delete household item
  const deleteItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('household_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['household-items'] });
      toast.success('Item deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete item');
      console.error('Error deleting item:', error);
    }
  });

  // Toggle shop active status
  const toggleShopStatus = useMutation({
    mutationFn: async ({ id, active }: { id: string, active: boolean }) => {
      const { error } = await supabase
        .from('partner_shops')
        .update({ active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partner-shops'] });
      toast.success('Shop status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update shop status');
      console.error('Error updating shop:', error);
    }
  });

  const totalShops = partnerShops?.length || 0;
  const activeShops = partnerShops?.filter(shop => shop.active).length || 0;
  const totalItems = householdItems?.length || 0;
  const availableItems = householdItems?.filter(item => item.available).length || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Settle Box - Household Items</h2>
        <div className="flex space-x-2">
          <Dialog open={showAddShopDialog} onOpenChange={setShowAddShopDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Partner Shop
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Partner Shop</DialogTitle>
                <DialogDescription>
                  Add a new partner shop to sell household items.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Shop name"
                  value={newShop.name}
                  onChange={(e) => setNewShop(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Contact (phone/email)"
                  value={newShop.contact}
                  onChange={(e) => setNewShop(prev => ({ ...prev, contact: e.target.value }))}
                />
                <Input
                  placeholder="Location"
                  value={newShop.location}
                  onChange={(e) => setNewShop(prev => ({ ...prev, location: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Commission rate (%)"
                  value={newShop.commission_rate}
                  onChange={(e) => setNewShop(prev => ({ ...prev, commission_rate: Number(e.target.value) }))}
                  min="0"
                  max="100"
                />
                <Input
                  placeholder="WhatsApp link (optional)"
                  value={newShop.whatsapp_link}
                  onChange={(e) => setNewShop(prev => ({ ...prev, whatsapp_link: e.target.value }))}
                />
                <Button 
                  onClick={() => addShop.mutate(newShop)}
                  disabled={!newShop.name || !newShop.contact || addShop.isPending}
                  className="w-full"
                >
                  {addShop.isPending ? 'Adding...' : 'Add Partner Shop'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>
                  Add a new household item to the catalog.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <select 
                  className="w-full p-2 border rounded-md"
                  value={newItem.partner_shop_id}
                  onChange={(e) => setNewItem(prev => ({ ...prev, partner_shop_id: e.target.value }))}
                >
                  <option value="">Select Partner Shop</option>
                  {partnerShops?.map(shop => (
                    <option key={shop.id} value={shop.id}>{shop.name}</option>
                  ))}
                </select>
                <Input
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Price (KES)"
                  value={newItem.price || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, price: Number(e.target.value) }))}
                  min="0"
                />
                <select 
                  className="w-full p-2 border rounded-md"
                  value={newItem.condition}
                  onChange={(e) => setNewItem(prev => ({ ...prev, condition: e.target.value }))}
                >
                  <option value="new">New</option>
                  <option value="like_new">Like New</option>
                  <option value="good">Good Condition</option>
                  <option value="fair">Fair Condition</option>
                </select>
                <Input
                  placeholder="Image URL (optional)"
                  value={newItem.image_url}
                  onChange={(e) => setNewItem(prev => ({ ...prev, image_url: e.target.value }))}
                />
                <Button 
                  onClick={() => addItem.mutate(newItem)}
                  disabled={!newItem.name || !newItem.price || !newItem.partner_shop_id || addItem.isPending}
                  className="w-full"
                >
                  {addItem.isPending ? 'Adding...' : 'Add Item'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Shops</p>
                <p className="text-3xl font-bold text-gray-900">{totalShops}</p>
              </div>
              <Store className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Shops</p>
                <p className="text-3xl font-bold text-gray-900">{activeShops}</p>
              </div>
              <Store className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Items</p>
                <p className="text-3xl font-bold text-gray-900">{availableItems}</p>
              </div>
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partner Shops */}
      <Card>
        <CardHeader>
          <CardTitle>Partner Shops</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingShops ? (
            <div className="text-center py-8">Loading partner shops...</div>
          ) : partnerShops?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No partner shops added yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shop Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partnerShops?.map((shop) => (
                  <TableRow key={shop.id}>
                    <TableCell className="font-medium">{shop.name}</TableCell>
                    <TableCell>{shop.contact}</TableCell>
                    <TableCell>{shop.location || 'Not specified'}</TableCell>
                    <TableCell>{shop.commission_rate}%</TableCell>
                    <TableCell>
                      <Badge variant={shop.active ? "default" : "secondary"}>
                        {shop.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleShopStatus.mutate({
                            id: shop.id,
                            active: !shop.active
                          })}
                          disabled={toggleShopStatus.isPending}
                        >
                          {shop.active ? 'Deactivate' : 'Activate'}
                        </Button>
                        {shop.whatsapp_link && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(shop.whatsapp_link, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteShop.mutate(shop.id)}
                          disabled={deleteShop.isPending}
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

      {/* Household Items */}
      <Card>
        <CardHeader>
          <CardTitle>Household Items Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingItems ? (
            <div className="text-center py-8">Loading items...</div>
          ) : householdItems?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No items added yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Partner Shop</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {householdItems?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {item.image_url && (
                          <img 
                            src={item.image_url} 
                            alt={item.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <div className="font-medium">{item.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{item.partner_shops?.name || 'Unknown'}</TableCell>
                    <TableCell>KES {item.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {item.condition.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.available ? "default" : "secondary"}>
                        {item.available ? 'Available' : 'Sold'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteItem.mutate(item.id)}
                        disabled={deleteItem.isPending}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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
