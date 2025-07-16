
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
      {/* Mobile-optimized Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-1 sm:space-x-2 text-green-600 hover:text-green-700 min-w-0">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-sm sm:text-base truncate">Back</span>
            </Link>
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 hidden sm:block">Nerdy Cart</h1>
              <h1 className="text-lg font-bold text-gray-900 sm:hidden">Cart</h1>
            </div>
            <div className="flex items-center">
              <Link to="/cart">
                <Button variant="outline" size="sm" className="relative px-2 sm:px-4">
                  <ShoppingCart className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Cart</span>
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

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Mobile-optimized Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Nerdy Cart - Study Essentials
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto mb-4 sm:mb-6 px-2">
            Get all your study essentials and lab equipment delivered fast. Quality guaranteed!
          </p>
          
          {/* Mobile-optimized Key Benefits */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center justify-center space-x-2 bg-green-100 text-green-700 px-3 sm:px-4 py-2 rounded-full">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>48hr max delivery</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Refund guaranteed</span>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-purple-100 text-purple-700 px-3 sm:px-4 py-2 rounded-full">
              <Star className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Quality products</span>
            </div>
          </div>
        </div>

        {/* Mobile-optimized Combo Deals */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
            🔥 Combo Deals - Save More!
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {comboDeals.map((combo) => (
              <Card key={combo.id} className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
                <CardHeader className="pb-3 sm:pb-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl text-gray-900 pr-2">{combo.name}</CardTitle>
                      <CardDescription className="text-sm">
                        Includes: {combo.items.join(", ")}
                      </CardDescription>
                    </div>
                    <Badge className="bg-orange-500 text-white self-start sm:self-auto flex-shrink-0">
                      Save KES {combo.savings}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                    <div className="text-center sm:text-left">
                      <span className="text-gray-500 line-through text-sm sm:text-base">KES {combo.originalPrice}</span>
                      <span className="text-xl sm:text-2xl font-bold text-green-600 ml-2">KES {combo.comboPrice}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(combo, 'combo')}
                    className="w-full bg-orange-500 hover:bg-orange-600 h-12 sm:h-auto text-base sm:text-sm"
                  >
                    Add Combo to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mobile-optimized Products Grid */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-900">
            Individual Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <CardHeader className="pb-2 p-3 sm:p-6 sm:pb-2">
                  <div className="flex items-center justify-between mb-1 sm:mb-0">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs sm:text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-sm sm:text-lg leading-tight">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                    <span className="text-lg sm:text-2xl font-bold text-green-600">
                      KES {product.price}
                    </span>
                    {product.inStock ? (
                      <Badge className="bg-green-100 text-green-700 text-xs self-start sm:self-auto">In Stock</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs self-start sm:self-auto">Out of Stock</Badge>
                    )}
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(product, 'product')}
                    disabled={!product.inStock}
                    className="w-full bg-green-500 hover:bg-green-600 h-10 sm:h-auto text-sm"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="sm:inline">Add to Cart</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mobile-optimized Pickup Information */}
        <section className="mt-12 sm:mt-16 bg-blue-50 rounded-lg p-4 sm:p-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              📍 Pickup Station Information
            </h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              All orders will be processed within 48 hours. We'll notify you via SMS when your order is ready for pickup.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div className="bg-white p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Main Pickup Station</h4>
                <p className="text-gray-600">Near Campus Main Gate</p>
                <p className="text-gray-600">Open: 8AM - 6PM</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Notification System</h4>
                <p className="text-gray-600">SMS alerts when ready</p>
                <p className="text-gray-600">WhatsApp updates available</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-1">Payment Options</h4>
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
