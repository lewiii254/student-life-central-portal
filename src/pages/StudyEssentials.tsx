
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Star, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const StudyEssentials = () => {
  const { addToCart, getTotalItems } = useCart();

  const products = [
    {
      id: "1",
      name: "Lab Coat - Standard White",
      price: 1200,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
      category: "Lab Coats",
      rating: 4.8,
      inStock: true
    },
    {
      id: "2",
      name: "Engineering Dust Coat",
      price: 800,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
      category: "Dust Coats",
      rating: 4.6,
      inStock: true
    },
    {
      id: "3",
      name: "Safety Boots - Steel Toe",
      price: 2500,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
      category: "Safety Boots",
      rating: 4.9,
      inStock: true
    },
    {
      id: "4",
      name: "Engineering Overalls",
      price: 1500,
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400",
      category: "Overalls",
      rating: 4.7,
      inStock: true
    },
    {
      id: "5",
      name: "Complete Engineering Set",
      price: 3500,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
      category: "Engineering Sets",
      rating: 4.8,
      inStock: true
    },
    {
      id: "6",
      name: "Scientific Calculator - Casio FX-991ES",
      price: 1800,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
      category: "Calculators",
      rating: 4.9,
      inStock: true
    },
    {
      id: "7",
      name: "Engineering T-Ruler Set",
      price: 400,
      image: "https://images.unsplash.com/photo-1636622433525-127afdf3662d?w=400",
      category: "T-Rulers",
      rating: 4.5,
      inStock: true
    }
  ];

  const comboDeals = [
    {
      id: "combo1",
      name: "Engineering Starter Pack",
      items: ["Dust Coat", "Safety Boots", "Scientific Calculator"],
      originalPrice: 5100,
      comboPrice: 4200,
      savings: 900,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"
    },
    {
      id: "combo2", 
      name: "Lab Essentials Bundle",
      items: ["Lab Coat", "Safety Boots", "T-Ruler Set"],
      originalPrice: 4100,
      comboPrice: 3500,
      savings: 600,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400"
    }
  ];

  const handleAddToCart = (item: any, type: 'product' | 'combo') => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: type === 'combo' ? item.comboPrice : item.price,
      image: item.image,
      category: type === 'combo' ? 'Combo Deal' : item.category,
      type
    };
    
    addToCart(cartItem);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-6 h-6 text-green-500" />
              <h1 className="text-2xl font-bold text-gray-900">Nerdy Cart</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/cart">
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nerdy Cart - Study Essentials
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Get all your study essentials and lab equipment delivered fast. Quality guaranteed!
          </p>
          
          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span>48hr max delivery</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              <span>Refund guaranteed</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
              <Star className="w-4 h-4" />
              <span>Quality products</span>
            </div>
          </div>
        </div>

        {/* Combo Deals */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            🔥 Combo Deals - Save More!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comboDeals.map((combo) => (
              <Card key={combo.id} className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900">{combo.name}</CardTitle>
                      <CardDescription>
                        Includes: {combo.items.join(", ")}
                      </CardDescription>
                    </div>
                    <Badge className="bg-orange-500 text-white">
                      Save KES {combo.savings}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-gray-500 line-through">KES {combo.originalPrice}</span>
                      <span className="text-2xl font-bold text-green-600 ml-2">KES {combo.comboPrice}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(combo, 'combo')}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    Add Combo to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Individual Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      KES {product.price}
                    </span>
                    {product.inStock ? (
                      <Badge className="bg-green-100 text-green-700">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(product, 'product')}
                    disabled={!product.inStock}
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pickup Information */}
        <section className="mt-16 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              📍 Pickup Station Information
            </h3>
            <p className="text-gray-600 mb-4">
              All orders will be processed within 48 hours. We'll notify you via SMS when your order is ready for pickup.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">Main Pickup Station</h4>
                <p className="text-gray-600">Near Campus Main Gate</p>
                <p className="text-gray-600">Open: 8AM - 6PM</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">Notification System</h4>
                <p className="text-gray-600">SMS alerts when ready</p>
                <p className="text-gray-600">WhatsApp updates available</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900">Payment Options</h4>
                <p className="text-gray-600">M-Pesa integration</p>
                <p className="text-gray-600">Cash on pickup</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudyEssentials;
