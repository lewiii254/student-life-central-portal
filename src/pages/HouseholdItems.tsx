
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Home, ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HouseholdItems = () => {
  const newItems = [
    {
      name: "Single Mattress",
      price: "KES 3,500",
      description: "Comfortable foam mattress, 3x6 feet",
      image: "/placeholder.svg",
      rating: 4.5,
      inStock: true
    },
    {
      name: "Window Curtains",
      price: "KES 1,200",
      description: "Beautiful printed curtains with rings",
      image: "/placeholder.svg",
      rating: 4.2,
      inStock: true
    },
    {
      name: "Gas Cylinder (6kg)",
      price: "KES 2,800",
      description: "Refillable cooking gas cylinder",
      image: "/placeholder.svg",
      rating: 4.8,
      inStock: true
    },
    {
      name: "Cotton Duvet",
      price: "KES 2,000",
      description: "Warm and comfortable cotton duvet",
      image: "/placeholder.svg",
      rating: 4.3,
      inStock: true
    },
    {
      name: "Plastic Chairs (Set of 4)",
      price: "KES 1,600",
      description: "Durable plastic chairs for dining",
      image: "/placeholder.svg",
      rating: 4.0,
      inStock: true
    },
    {
      name: "Study Table",
      price: "KES 4,500",
      description: "Wooden study table with drawer",
      image: "/placeholder.svg",
      rating: 4.6,
      inStock: true
    }
  ];

  const secondHandItems = [
    {
      name: "Single Bed Frame",
      price: "KES 1,800",
      originalPrice: "KES 3,000",
      description: "Good condition metal bed frame",
      image: "/placeholder.svg",
      rating: 4.1,
      inStock: true
    },
    {
      name: "Office Chair",
      price: "KES 1,200",
      originalPrice: "KES 2,500",
      description: "Comfortable swivel chair",
      image: "/placeholder.svg",
      rating: 3.9,
      inStock: true
    },
    {
      name: "Kitchen Table",
      price: "KES 2,200",
      originalPrice: "KES 4,000",
      description: "Wooden kitchen table, seats 4",
      image: "/placeholder.svg",
      rating: 4.2,
      inStock: true
    },
    {
      name: "Sufuria Set",
      price: "KES 800",
      originalPrice: "KES 1,500",
      description: "Set of 3 cooking pots",
      image: "/placeholder.svg",
      rating: 4.0,
      inStock: true
    },
    {
      name: "Dinner Plates Set",
      price: "KES 600",
      originalPrice: "KES 1,200",
      description: "6-piece ceramic dinner plates",
      image: "/placeholder.svg",
      rating: 4.3,
      inStock: false
    }
  ];

  const whatsappNumber = "+254700000000"; // Replace with actual number

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const ItemCard = ({ item, isSecondHand = false }: { item: any, isSecondHand?: boolean }) => (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-md"
          />
          {!item.inStock && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
          {isSecondHand && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              Second Hand
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{item.rating}</span>
          </div>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
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
            className="flex-1 bg-green-500 hover:bg-green-600"
            disabled={!item.inStock}
            onClick={() => openWhatsApp(`I'm interested in ${item.name} for ${item.price}. Is it still available?`)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Inquire
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            disabled={!item.inStock}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="flex items-center space-x-2">
                <Home className="w-8 h-8 text-purple-500" />
                <h1 className="text-2xl font-bold text-gray-900">Settle Box</h1>
              </div>
            </div>
            
            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={() => openWhatsApp("Hello! I'd like to inquire about household items.")}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Support
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Settle Box - Household Essentials
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Everything you need to make your new place feel like home. From brand new items to affordable second-hand deals.
          </p>
          <div className="bg-white/20 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm">
              💰 <strong>Commission-based pricing</strong> - Supporting local shop owners
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="new">New Items</TabsTrigger>
              <TabsTrigger value="secondhand">Second-Hand Deals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">New Items</h2>
                <p className="text-gray-600">Brand new household essentials for your comfort</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newItems.map((item, index) => (
                  <ItemCard key={index} item={item} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="secondhand">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Second-Hand Deals</h2>
                <p className="text-gray-600">Affordable options perfect for students on a budget</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondHandItems.map((item, index) => (
                  <ItemCard key={index} item={item} isSecondHand={true} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Something Specific?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Contact us directly and we'll help you find it!
          </p>
          <Button 
            size="lg" 
            className="bg-green-500 hover:bg-green-600"
            onClick={() => openWhatsApp("I'm looking for a specific household item. Can you help me find it?")}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contact Us on WhatsApp
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HouseholdItems;
