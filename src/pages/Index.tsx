
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ShoppingCart, Home, Truck, Bike, Calendar, MessageCircle, Search, Bell, Star, Users, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [showNotification, setShowNotification] = useState(true);
  const whatsappNumber = "+254790767347";

  const openWhatsApp = () => {
    const message = "Yoo Campus Connect! 🔥 Just saw your site and I'm interested in your services. Let's chat!";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const services = [
    {
      title: "Rental Help",
      description: "Find your perfect crib near campus 🏠",
      icon: MapPin,
      href: "/rental-help",
      color: "bg-blue-500 hover:bg-blue-600",
      emoji: "🏠"
    },
    {
      title: "Nerdy Cart",
      description: "Study essentials & lab equipment 📚",
      icon: ShoppingCart,
      href: "/study-essentials",
      color: "bg-green-500 hover:bg-green-600",
      emoji: "📚"
    },
    {
      title: "Settle Box",
      description: "Household items for your new place 🛏️",
      icon: Home,
      href: "/household-items",
      color: "bg-purple-500 hover:bg-purple-600",
      emoji: "🛏️"
    },
    {
      title: "Delivery Services",
      description: "Fast delivery to your doorstep 🚚",
      icon: Truck,
      href: "/delivery",
      color: "bg-orange-500 hover:bg-orange-600",
      emoji: "🚚"
    },
    {
      title: "Bicycle Rentals",
      description: "Eco-friendly campus transport 🚴‍♂️",
      icon: Bike,
      href: "/bicycle-rentals",
      color: "bg-cyan-500 hover:bg-cyan-600",
      emoji: "🚴‍♂️"
    },
    {
      title: "Campus Events",
      description: "Never miss what's happening 🎉",
      icon: Calendar,
      href: "/events",
      color: "bg-pink-500 hover:bg-pink-600",
      emoji: "🎉"
    }
  ];

  const testimonials = [
    {
      name: "Alex M.",
      year: "3rd Year",
      text: "Bro, Campus Connect saved me so much time! Found my room in like 2 days 🔥",
      rating: 5
    },
    {
      name: "Grace K.",
      year: "2nd Year",
      text: "The delivery service is everything! No more walking to town for groceries 👌",
      rating: 5
    },
    {
      name: "John S.",
      year: "1st Year",
      text: "As a fresher, this platform made settling in so much easier. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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
              <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={openWhatsApp}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Hit Us Up
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
            <span className="text-sm">🎉 Yoo comrades! New bicycle rentals available - grab yours now! 🚴‍♂️</span>
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
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-sm">Trusted by 500+ Meru University Students</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Your Campus,{" "}
            <span className="text-yellow-300">
              Your Rules
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in">
            The ultimate student companion for Meru University comrades. From cribs to study gear, we've got your back! 💪
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 text-lg font-semibold">
              <Zap className="w-5 h-5 mr-2" />
              Get Started
            </Button>
            <Link to="/about">
              <Button size="lg" variant="outline" className="px-8 text-lg font-semibold border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex justify-center items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>500+ Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>100% Student-Owned</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Everything You Need, <span className="text-blue-600">One Platform</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From finding your perfect room to getting your groceries delivered, we're here to make your campus life easier! 🚀
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.href}
                className="group transform hover:scale-105 transition-all duration-300"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-20 h-20 mx-auto rounded-full ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <span className="text-3xl">{service.emoji}</span>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-lg">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button 
                      className={`w-full ${service.color} text-white group-hover:shadow-lg transition-all duration-300 text-lg font-semibold`}
                    >
                      Explore Now 🔥
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              What Comrades Are Saying 💬
            </h2>
            <p className="text-xl text-gray-600">
              Real reviews from real Meru University students
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 text-lg italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.year}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Happy Comrades</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Rental Spots</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Products Available</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">We Got You</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">CC</span>
                </div>
                <h3 className="text-2xl font-bold">Campus Connect</h3>
              </div>
              <p className="text-gray-400 mb-4">Your ultimate student companion for all campus needs. By students, for students! 🎓</p>
              <div className="flex space-x-4">
                <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={openWhatsApp}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/rental-help" className="hover:text-white hover:underline">Rental Help</Link></li>
                <li><Link to="/study-essentials" className="hover:text-white hover:underline">Nerdy Cart</Link></li>
                <li><Link to="/household-items" className="hover:text-white hover:underline">Settle Box</Link></li>
                <li><Link to="/delivery" className="hover:text-white hover:underline">Delivery Services</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">More Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/bicycle-rentals" className="hover:text-white hover:underline">Bicycle Rentals</Link></li>
                <li><Link to="/events" className="hover:text-white hover:underline">Campus Events</Link></li>
                <li><Link to="/about" className="hover:text-white hover:underline">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Get In Touch</h4>
              <div className="space-y-2 text-gray-400">
                <p>📱 WhatsApp: +254 790 767 347</p>
                <p>📧 Email: info@campusconnect.co.ke</p>
                <p>📍 Location: Meru University Campus</p>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                  <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Campus Connect. All rights reserved. Made with ❤️ for Meru University students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
