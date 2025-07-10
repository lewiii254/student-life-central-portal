
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
  Package, 
  Plus, 
  Edit, 
  Store,
  MessageSquare,
  TrendingUp,
  ExternalLink
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
    name: '',
    price: 0,
    condition: 'new',
    partner_shop_id: ''
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
            name,
            contact,
            whatsapp_link
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add new partner shop
  const addPartnerShop = useMutation({
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
    }
  });

  // Add new household item
  const addHouseholdItem = useMutation({
    mutationFn: async (item: typeof newItem) => {
      const { error } = await supabase
        .from('household_items')
        .insert([item]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['household-items'] });
      setNewItem({
        name: '',
        price: 0,
        condition: 'new',
        partner_shop_id: ''
      });
      setShowAddItemDialog(false);
      toast.success('Household item added successfully');
    }
  });

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'used': return 'bg-yellow-100 text-yellow-800';
      case 'refurbished': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalCommission = partnerShops?.reduce((sum, shop) => sum + (shop.commission_rate || 0), 0) || 0;
  const activeShops = partnerShops?.filter(shop => shop.active).length || 0;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Settle Box - Household Essentials</h2>
        <div className="flex space-x-2">
          <Dialog open={showAddShopDialog} onOpenChange={setShowAddShopDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Store className="h-4 w-4 mr-2" />
                Add Shop
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Partner Shop</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Shop name"
                  value={newShop.name}
                  onChange={(e) => setNewShop(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Contact number"
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
                />
                <Input
                  placeholder="WhatsApp link"
                  value={newShop.whatsapp_link}
                  onChange={(e) => setNewShop(prev => ({ ...prev, whatsapp_link: e.target.value }))}
                />
                <Button 
                  onClick={() => addPartnerShop.mutate(newShop)}
                  disabled={!newShop.name || addPartnerShop.isPending}
                  className="w-full"
                >
                  Add Shop
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Household Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <select 
                  className="w-full p-2 border rounded-md"
                  value={newItem.partner_shop_id}
                  onChange={(e) => setNewItem(prev => ({ ...prev, partner_shop_id: e.target.value }))}
                >
                  <option value="">Select partner shop</option>
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
                  value={newItem.price}
                  onChange={(e) => setNewItem(prev => ({ ...prev, price: Number(e.target.value) }))}
                />
                <select 
                  className="w-full p-2 border rounded-md"
                  value={newItem.condition}
                  onChange={(e) => setNewItem(prev => ({ ...prev, condition: e.target.value }))}
                >
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="refurbished">Refurbished</option>
                </select>
                <Button 
                  onClick={() => addHouseholdItem.mutate(newItem)}
                  disabled={!newItem.name || !newItem.partner_shop_id || addHouseholdItem.isPending}
                  className="w-full"
                >
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Shops</p>
                <p className="text-3xl font-bold text-gray-900">{activeShops}</p>
              </div>
              <Store className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-3xl font-bold text-gray-900">{householdItems?.length || 0}</p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Commission</p>
                <p className="text-3xl font-bold text-gray-900">{(totalCommission / Math.max(activeShops, 1)).toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
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
            <div className="text-center py-8">Loading shops...</div>
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
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        {shop.whatsapp_link && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(shop.whatsapp_link, '_blank')}
                          >
                            <MessageSquare className="h-3 w-3" />
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

      {/* Household Items */}
      <Card>
        <CardHeader>
          <CardTitle>Household Items Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingItems ? (
            <div className="text-center py-8">Loading items...</div>
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
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.partner_shops?.name || 'Unknown'}</TableCell>
                    <TableCell>KES {item.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getConditionColor(item.condition)}>
                        {item.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.available ? "default" : "secondary"}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        {item.partner_shops?.whatsapp_link && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(item.partner_shops.whatsapp_link, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
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
