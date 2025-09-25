
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
  ShoppingCart, 
  Plus, 
  Edit, 
  Trash2, 
  Package,
  AlertTriangle,
  Eye,
  MessageSquare,
  CheckCircle,
  Clock,
  Truck
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const NerdyCart = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    low_stock_threshold: 5,
    category: 'study_essentials',
    is_combo: false
  });
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const queryClient = useQueryClient();

  // Fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch orders
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Add new product
  const addProduct = useMutation({
    mutationFn: async (product: typeof newProduct) => {
      const { error } = await supabase
        .from('products')
        .insert([product]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        stock_quantity: 0,
        low_stock_threshold: 5,
        category: 'study_essentials',
        is_combo: false
      });
      setShowAddDialog(false);
      toast.success('Product added successfully');
    },
    onError: (error) => {
      toast.error('Failed to add product');
      console.error('Error adding product:', error);
    }
  });

  // Update product
  const updateProduct = useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: any }) => {
      const { error } = await supabase
        .from('products')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingProduct(null);
      toast.success('Product updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update product');
      console.error('Error updating product:', error);
    }
  });

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', error);
    }
  });

  // Update order status
  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated');
    },
    onError: (error) => {
      toast.error('Failed to update order status');
      console.error('Error updating order:', error);
    }
  });

  const getStockStatus = (quantity: number, threshold: number) => {
    if (quantity === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (quantity <= threshold) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const getOrderStatus = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'dispatched': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sendOrderNotification = (order: any) => {
    const message = `Hi ${order.customer_name}! Your order is ready for pickup. Order ID: ${order.id.slice(0, 8)}. Please visit Campus Connect to collect your items.`;
    const whatsappUrl = `https://wa.me/${order.customer_contact.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const lowStockProducts = products?.filter(p => p.stock_quantity <= p.low_stock_threshold) || [];
  const outOfStockProducts = products?.filter(p => p.stock_quantity === 0) || [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Nerdy Cart - Study Essentials</h2>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your Nerdy Cart inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
              />
              <Textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Price (KES)"
                value={newProduct.price || ''}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                min="0"
              />
              <Input
                type="number"
                placeholder="Stock quantity"
                value={newProduct.stock_quantity || ''}
                onChange={(e) => setNewProduct(prev => ({ ...prev, stock_quantity: Number(e.target.value) }))}
                min="0"
              />
              <Input
                type="number"
                placeholder="Low stock threshold"
                value={newProduct.low_stock_threshold || ''}
                onChange={(e) => setNewProduct(prev => ({ ...prev, low_stock_threshold: Number(e.target.value) }))}
                min="1"
              />
              <select 
                className="w-full p-2 border rounded-md"
                value={newProduct.category}
                onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="study_essentials">Study Essentials</option>
                <option value="lab_coats">Lab Coats</option>
                <option value="calculators">Calculators</option>
                <option value="stationery">Stationery</option>
              </select>
              <Button 
                onClick={() => addProduct.mutate(newProduct)}
                disabled={!newProduct.name || !newProduct.price || addProduct.isPending}
                className="w-full"
              >
                {addProduct.isPending ? 'Adding...' : 'Add Product'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alerts */}
      {(lowStockProducts.length > 0 || outOfStockProducts.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {outOfStockProducts.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Out of Stock ({outOfStockProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {outOfStockProducts.slice(0, 3).map(product => (
                    <div key={product.id} className="text-sm">
                      {product.name}
                    </div>
                  ))}
                  {outOfStockProducts.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{outOfStockProducts.length - 3} more
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
          
          {lowStockProducts.length > 0 && (
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-600 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Low Stock ({lowStockProducts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lowStockProducts.slice(0, 3).map(product => (
                    <div key={product.id} className="text-sm flex justify-between">
                      <span>{product.name}</span>
                      <span className="text-yellow-600">{product.stock_quantity}</span>
                    </div>
                  ))}
                  {lowStockProducts.length > 3 && (
                    <div className="text-sm text-gray-500">
                      +{lowStockProducts.length - 3} more
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Products Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : products?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No products added yet. Add your first product!</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => {
                  const stockStatus = getStockStatus(product.stock_quantity, product.low_stock_threshold);
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>KES {product.price.toLocaleString()}</TableCell>
                      <TableCell>{product.stock_quantity}</TableCell>
                      <TableCell>
                        <Badge className={stockStatus.color}>{stockStatus.label}</Badge>
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
                                <DialogTitle>Edit Product</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Input
                                  placeholder="Product name"
                                  defaultValue={product.name}
                                  onChange={(e) => setEditingProduct({...product, name: e.target.value})}
                                />
                                <Textarea
                                  placeholder="Description"
                                  defaultValue={product.description || ''}
                                  onChange={(e) => setEditingProduct({...product, description: e.target.value})}
                                />
                                <Input
                                  type="number"
                                  placeholder="Price (KES)"
                                  defaultValue={product.price}
                                  onChange={(e) => setEditingProduct({...product, price: Number(e.target.value)})}
                                />
                                <Input
                                  type="number"
                                  placeholder="Stock quantity"
                                  defaultValue={product.stock_quantity}
                                  onChange={(e) => setEditingProduct({...product, stock_quantity: Number(e.target.value)})}
                                />
                                <Button 
                                  onClick={() => updateProduct.mutate({
                                    id: product.id,
                                    updates: editingProduct || product
                                  })}
                                  disabled={updateProduct.isPending}
                                  className="w-full"
                                >
                                  {updateProduct.isPending ? 'Updating...' : 'Update Product'}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteProduct.mutate(product.id)}
                            disabled={deleteProduct.isPending}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Orders Management */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {!orders?.length ? (
            <div className="text-center py-8 text-gray-500">No orders yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.slice(0, 10).map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">
                      {order.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer_name}</div>
                        <div className="text-sm text-gray-500">{order.customer_contact}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {Array.isArray(order.items) ? order.items.length : 0} items
                      </div>
                    </TableCell>
                    <TableCell>KES {order.total_amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getOrderStatus(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {order.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus.mutate({ id: order.id, status: 'ready' })}
                            disabled={updateOrderStatus.isPending}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Ready
                          </Button>
                        )}
                        {order.status === 'ready' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => sendOrderNotification(order)}
                            >
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Notify
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus.mutate({ id: order.id, status: 'delivered' })}
                              disabled={updateOrderStatus.isPending}
                            >
                              <Truck className="h-3 w-3 mr-1" />
                              Delivered
                            </Button>
                          </>
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
