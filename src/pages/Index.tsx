
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ShoppingCart, Home, Truck, Bike, Calendar, MessageCircle, Search, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [showNotification, setShowNotification] = useState(true);

  const services = [
    {
      title: "Rental Help",
      description: "Find your perfect room near campus",
      icon: MapPin,
      href: "/rental-help",
      color: "bg-blue-500 hover:bg-blue-600",
      emoji: "📍"
    },
    {
      title: "Nerdy Cart",
      description: "Study essentials & lab equipment",
      icon: ShoppingCart,
      href: "/study-essentials",
      color: "bg-green-500 hover:bg-green-600",
      emoji: "🛍️"
    },
    {
      title: "Settle Box",
      description: "Household items for your new place",
      icon: Home,
      href: "/household-items",
      color: "bg-purple-500 hover:bg-purple-600",
      emoji: "🛏️"
    },
    {
      title: "Delivery Services",
      description: "Fast delivery to your doorstep",
      icon: Truck,
      href: "/delivery",
      color: "bg-orange-500 hover:bg-orange-600",
      emoji: "🚚"
    },
    {
      title: "Bicycle Rentals",
      description: "Eco-friendly campus transport",
      icon: Bike,
      href: "/bicycle-rentals",
      color: "bg-cyan-500 hover:bg-cyan-600",
      emoji: "🚴♂️"
    },
    {
      title: "Campus Events",
      description: "Never miss what's happening",
      icon: Calendar,
      href: "/events",
      color: "bg-pink-500 hover:bg-pink-600",
      emoji: "🗓️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CC</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Campus Connect
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {showNotification && (
        <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 text-center animate-fade-in">
          <div className="flex items-center justify-center space-x-2">
            <Bell className="w-4 h-4" />
            <span className="text-sm">🎉 Welcome to Campus Connect! New bicycle rentals available now!</span>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Campus Connect
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Your ultimate student companion for rentals, shopping, delivery, and campus life essentials
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.href}
                className="group transform hover:scale-105 transition-all duration-200"
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-200 border-2 hover:border-blue-200">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <span className="text-2xl">{service.emoji}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button 
                      className={`w-full ${service.color} text-white group-hover:shadow-lg transition-shadow duration-200`}
                    >
                      Explore Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Happy Students</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Rental Locations</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Products Available</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">CC</span>
                </div>
                <h3 className="text-xl font-bold">Campus Connect</h3>
              </div>
              <p className="text-gray-400">Your ultimate student companion for all campus needs.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/rental-help" className="hover:text-white">Rental Help</Link></li>
                <li><Link to="/study-essentials" className="hover:text-white">Study Essentials</Link></li>
                <li><Link to="/household-items" className="hover:text-white">Household Items</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">More Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/delivery" className="hover:text-white">Delivery</Link></li>
                <li><Link to="/bicycle-rentals" className="hover:text-white">Bicycle Rentals</Link></li>
                <li><Link to="/events" className="hover:text-white">Events</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>WhatsApp Support</p>
                <p>Email: info@campusconnect.co.ke</p>
                <div className="flex space-x-4 mt-4">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Campus Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
