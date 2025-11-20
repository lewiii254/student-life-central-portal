import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Home, ArrowLeft, ShoppingCart, Star, Users, MapPin, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface HouseholdItem {
  name: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  inStock: boolean;
  studentFriendly: string;
  shop?: string;
  condition?: string;
}

const HouseholdItems = () => {
  const newItems = [
    {
      name: "Single Mattress",
      price: "KES 3,500",
      description: "Perfect for your hostel room - comfortable foam mattress, 3x6 feet",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.5,
      inStock: true,
      studentFriendly: "Hostel Perfect"
    },
    {
      name: "Study Curtains",
      price: "KES 1,200",
      description: "Block out distractions - beautiful printed curtains with rings",
      image: "https://images.unsplash.com/photo-1586892478025-2b5472316cfb?w=400&h=300&fit=crop",
      rating: 4.2,
      inStock: true,
      studentFriendly: "Privacy Essential"
    },
    {
      name: "Gas Cylinder (6kg)",
      price: "KES 2,800",
      description: "Cook your own meals - refillable cooking gas cylinder",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      rating: 4.8,
      inStock: true,
      studentFriendly: "Money Saver"
    },
    {
      name: "Cotton Duvet",
      price: "KES 2,000",
      description: "Stay warm during cold Meru nights - soft cotton duvet",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
      rating: 4.3,
      inStock: true,
      studentFriendly: "Comfort Essential"
    },
    {
      name: "Plastic Chairs (Set of 4)",
      price: "KES 1,600",
      description: "Host your squad - durable plastic chairs perfect for group study",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.0,
      inStock: true,
      studentFriendly: "Group Study"
    },
    {
      name: "Study Table",
      price: "KES 4,500",
      description: "Ace your exams - wooden study table with drawer for books",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      rating: 4.6,
      inStock: true,
      studentFriendly: "Grade Booster"
    }
  ];

  const secondHandItems = [
    {
      name: "Single Bed Frame",
      price: "KES 1,800",
      originalPrice: "KES 3,000",
      description: "Student budget friendly - good condition metal bed frame",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.1,
      inStock: true,
      studentFriendly: "Budget Saver"
    },
    {
      name: "Study Chair",
      price: "KES 1,200",
      originalPrice: "KES 2,500",
      description: "Long study sessions made comfortable - swivel office chair",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 3.9,
      inStock: true,
      studentFriendly: "Study Companion"
    },
    {
      name: "Kitchen Table",
      price: "KES 2,200",
      originalPrice: "KES 4,000",
      description: "Meal prep station - wooden kitchen table, seats 4 comrades",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.2,
      inStock: true,
      studentFriendly: "Squad Meals"
    },
    {
      name: "Sufuria Set",
      price: "KES 800",
      originalPrice: "KES 1,500",
      description: "Cook like home - set of 3 cooking pots for your favorite meals",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      rating: 4.0,
      inStock: true,
      studentFriendly: "Home Cooking"
    },
    {
      name: "Dinner Plates Set",
      price: "KES 600",
      originalPrice: "KES 1,200",
      description: "Dine in style - 6-piece ceramic dinner plates set",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      rating: 4.3,
      inStock: false,
      studentFriendly: "Classy Dining"
    }
  ];

  const whatsappNumber = "+254790767347";

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const ItemCard = ({ item, isSecondHand = false }: { item: HouseholdItem, isSecondHand?: boolean }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!item.inStock && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
          {isSecondHand && (
            <Badge variant="secondary" className="absolute top-2 left-2 bg-orange-100 text-orange-800">
              Second Hand Deal
            </Badge>
          )}
          <Badge className="absolute bottom-2 left-2 bg-green-500 text-white text-xs">
            {item.studentFriendly}
          </Badge>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-lg text-gray-900">{item.name}</CardTitle>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{item.rating}</span>
            </div>
          </div>
          <CardDescription className="text-gray-600">{item.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">{item.price}</span>
            {isSecondHand && item.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            className="flex-1 bg-green-500 hover:bg-green-600 shadow-lg"
            disabled={!item.inStock}
            onClick={() => openWhatsApp(`Hey! I'm a Meru University student interested in ${item.name} for ${item.price}. Is it still available?`)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            WhatsApp Inquiry
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Campus Connect
              </Link>
              <div className="flex items-center space-x-2">
                <Home className="w-8 h-8 text-purple-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                  Settle Box
                </h1>
              </div>
            </div>
            
            <Button 
              className="bg-green-500 hover:bg-green-600 shadow-lg"
              onClick={() => openWhatsApp("Hello Settle Box! I'm a Meru University student looking for household items.")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with Us
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 via-purple-500 to-green-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-8 h-8 mr-3" />
            <Badge className="bg-white/20 text-white text-sm px-3 py-1">
              For Meru University Students
            </Badge>
          </div>
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            Settle Box - Your Campus Home Essentials
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-fade-in">
            Transform your hostel room into a comfortable home away from home. 
            Everything you need to settle in at Meru University, from new essentials to budget-friendly second-hand deals.
          </p>
          
          {/* Student Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Campus Delivery</h3>
              <p className="text-sm text-purple-100">Direct delivery to your hostel or nearby pickup points</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Quick Setup</h3>
              <p className="text-sm text-purple-100">Get your room ready in 24-48 hours max</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Student Prices</h3>
              <p className="text-sm text-purple-100">Commission-based pricing supporting local shop owners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12">
              <TabsTrigger value="new" className="text-lg">✨ Brand New Items</TabsTrigger>
              <TabsTrigger value="secondhand" className="text-lg">💰 Second-Hand Deals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Brand New Essentials</h2>
                <p className="text-gray-600 text-lg">Fresh items to make your hostel room feel like home</p>
                <Badge className="mt-2 bg-green-100 text-green-800">Quality Guaranteed</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newItems.map((item, index) => (
                  <ItemCard key={index} item={item} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="secondhand">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Budget-Friendly Second-Hand</h2>
                <p className="text-gray-600 text-lg">Perfect for comrades who want to save some coins</p>
                <Badge className="mt-2 bg-orange-100 text-orange-800">Save Up to 60%</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {secondHandItems.map((item, index) => (
                  <ItemCard key={index} item={item} isSecondHand={true} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">What Fellow Comrades Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Anne - Year 3 Engineering</h4>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"Settle Box made my hostel setup so easy! Got everything I needed in one go."</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  D
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">David - Year 2 Business</h4>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"The second-hand deals saved me so much money. Perfect for student budget!"</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Mary - Year 1 Medicine</h4>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">"Quick delivery to campus and great quality items. Highly recommend!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Settle In at Meru University?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied students who've made their hostel rooms feel like home with Settle Box
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 shadow-lg px-8 py-3"
              onClick={() => openWhatsApp("Hi Settle Box! I'm ready to transform my hostel room. What packages do you recommend for new students?")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Shopping Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3"
              onClick={() => openWhatsApp("I need help choosing the right items for my room. Can you help me?")}
            >
              Get Personalized Help
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HouseholdItems;
