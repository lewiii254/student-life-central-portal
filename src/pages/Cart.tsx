
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart, 
  Phone,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice 
  } = useCart();
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    pickupLocation: '',
    notes: ''
  });

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleCustomerInfoChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = customerInfo.name && customerInfo.phone;

  const proceedToWhatsApp = () => {
    if (!isFormValid) {
      toast.error('Please fill in your name and phone number');
      return;
    }

    const orderSummary = items.map(item => 
      `${item.name} x${item.quantity} - KES ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const totalAmount = getTotalPrice();
    
    const message = `🛒 *New Order from Nerdy Cart*

👤 *Customer Details:*
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
${customerInfo.pickupLocation ? `Pickup Location: ${customerInfo.pickupLocation}` : ''}

📦 *Order Items:*
${orderSummary}

💰 *Total Amount: KES ${totalAmount.toLocaleString()}*

${customerInfo.notes ? `📝 *Additional Notes:*\n${customerInfo.notes}` : ''}

Please confirm this order and let me know when it will be ready for pickup. Thank you!`;

    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear cart after successful order
    clearCart();
    setCustomerInfo({ name: '', phone: '', pickupLocation: '', notes: '' });
    toast.success('Order sent via WhatsApp! We\'ll contact you soon.');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Link to="/study-essentials" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Shop</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link to="/study-essentials">
              <Button className="bg-green-500 hover:bg-green-600">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/study-essentials" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Shop</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Cart Items ({items.length})
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cart
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <ShoppingCart className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-lg font-bold text-green-600">
                        KES {item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700 mt-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">KES {getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                {/* Customer Information Form */}
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-gray-900">Customer Information</h3>
                  
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                      placeholder="e.g., +254700000000"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="pickup">Preferred Pickup Location</Label>
                    <Input
                      id="pickup"
                      value={customerInfo.pickupLocation}
                      onChange={(e) => handleCustomerInfoChange('pickupLocation', e.target.value)}
                      placeholder="e.g., Main Gate, Library"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => handleCustomerInfoChange('notes', e.target.value)}
                      placeholder="Any special instructions..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={proceedToWhatsApp}
                  disabled={!isFormValid}
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  size="lg"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Order via WhatsApp
                </Button>

                <div className="text-center text-sm text-gray-500">
                  <Phone className="w-4 h-4 inline mr-1" />
                  We'll contact you within 1 hour to confirm your order
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
