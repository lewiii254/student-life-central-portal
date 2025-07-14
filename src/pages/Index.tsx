
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';
import { 
  GraduationCap, 
  Home, 
  ShoppingCart, 
  Package, 
  Truck, 
  Bike, 
  Calendar,
  Search,
  Star,
  Users,
  Heart,
  Shield,
  Zap,
  Award,
  Coffee,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Sparkles,
  TrendingUp,
  Clock,
  ThumbsUp
} from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleServiceClick = (link: string) => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate(link);
    }
  };

  const services = [
    {
      title: 'Rental Help',
      description: 'Find your perfect student accommodation with our smart search and WhatsApp integration.',
      icon: Home,
      link: '/rental-help',
      color: 'from-purple-500 to-pink-500',
      stats: '500+ Properties',
      emoji: '🏠'
    },
    {
      title: 'Study Essentials',
      description: 'Get all your academic supplies delivered fast. From notebooks to tech accessories.',
      icon: ShoppingCart,
      link: '/study-essentials',
      color: 'from-green-500 to-emerald-500',
      stats: '1000+ Products',
      emoji: '📚'
    },
    {
      title: 'Household Items',
      description: 'Everything you need to make your space feel like home. Furniture, kitchen, and more.',
      icon: Package,
      link: '/household-items',
      color: 'from-blue-500 to-cyan-500',
      stats: '300+ Items',
      emoji: '🛋️'
    },
    {
      title: 'Delivery Services',
      description: 'Fast and reliable campus-wide delivery. Track your packages in real-time.',
      icon: Truck,
      link: '/delivery',
      color: 'from-orange-500 to-red-500',
      stats: '24/7 Service',
      emoji: '🚚'
    },
    {
      title: 'Bicycle Rentals',
      description: 'Eco-friendly transportation around campus. Hourly and daily rates available.',
      icon: Bike,
      link: '/bicycle-rentals',
      color: 'from-teal-500 to-green-500',
      stats: '50+ Bikes',
      emoji: '🚲'
    },
    {
      title: 'Campus Events',
      description: 'Discover exciting events, workshops, and activities happening on campus.',
      icon: Calendar,
      link: '/events',
      color: 'from-pink-500 to-purple-500',
      stats: 'Weekly Events',
      emoji: '🎉'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Student Community',
      description: 'Connect with fellow comrades and build lasting friendships',
      color: 'bg-gradient-to-br from-purple-100 to-pink-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Your data and transactions are protected with top-notch security',
      color: 'bg-gradient-to-br from-green-100 to-emerald-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get what you need delivered in record time across campus',
      color: 'bg-gradient-to-br from-yellow-100 to-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  const testimonials = [
    {
      name: "Faith Wanjiku",
      course: "Computer Science Year 3",
      text: "Campus Connect is a lifesaver! Found my perfect bedsitter near campus in just 2 days. The WhatsApp integration made everything so smooth.",
      rating: 5,
      avatar: "👩🏾‍💻"
    },
    {
      name: "Brian Mwangi",
      course: "Business Administration Year 2",
      text: "Ordered my textbooks and got them delivered the same day! The delivery service is unmatched. Saved me so much time.",
      rating: 5,
      avatar: "👨🏾‍💼"
    },
    {
      name: "Grace Njeri",
      course: "Engineering Year 4",
      text: "The bicycle rental service is perfect for getting around campus. Affordable and eco-friendly. Plus, the app is super user-friendly!",
      rating: 5,
      avatar: "👷🏾‍♀️"
    }
  ];

  const quickStats = [
    { number: "15K+", label: "Happy Students", icon: ThumbsUp, color: "text-purple-600" },
    { number: "800+", label: "Properties Listed", icon: Home, color: "text-green-600" },
    { number: "2K+", label: "Products Available", icon: Package, color: "text-blue-600" },
    { number: "24/7", label: "Support Available", icon: Clock, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-600 to-green-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                Campus Connect
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
                About
              </Link>
              {!user && (
                <Link to="/auth" className="text-gray-600 hover:text-purple-600 transition-colors font-medium">
                  Sign In
                </Link>
              )}
            </nav>

            {user && <UserMenu />}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-green-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 text-6xl opacity-20">🎓</div>
        <div className="absolute top-20 right-20 text-4xl opacity-30">✨</div>
        <div className="absolute bottom-10 left-1/4 text-5xl opacity-20">🚀</div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-yellow-300" />
              <span className="text-lg font-semibold bg-white/20 px-4 py-2 rounded-full">
                Meru University's #1 Student Platform
              </span>
              <Sparkles className="h-8 w-8 text-yellow-300" />
            </div>
            
            <h1 className="text-6xl font-bold leading-tight">
              Your Ultimate <span className="text-yellow-300">Comrade</span> Companion
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              From finding the perfect hostel to getting study materials delivered, 
              Campus Connect makes student life at Meru University easier, faster, and more connected! 🎯
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex gap-4 mt-8">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for services, products, or events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-black bg-white/95 backdrop-blur-sm border-0 shadow-lg text-lg"
                />
              </div>
              <Button className="h-14 px-8 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 font-semibold text-lg shadow-lg">
                Search
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {quickStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-all">
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold">{stat.number}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place 🌟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of services designed specifically for Meru University students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} onClick={() => handleServiceClick(service.link)} className="cursor-pointer group">
                  <Card className="h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${service.color} text-white shadow-lg`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-right">
                          <span className="text-3xl">{service.emoji}</span>
                          <div className="text-sm font-medium text-gray-500 mt-1">
                            {service.stats}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-purple-600 transition-colors text-xl">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 text-base leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Campus Connect? 🚀
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to making your student journey at Meru University smooth and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className={`${feature.color} p-8 rounded-2xl text-center space-y-4 hover:scale-105 transition-transform shadow-lg`}>
                  <div className={`bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-md`}>
                    <Icon className={`h-8 w-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Meru University Students Say 💬
            </h2>
            <p className="text-xl text-gray-600">
              Real reviews from real comrades on campus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="hover:shadow-xl transition-shadow border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{testimonial.avatar}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-purple-600">{testimonial.course}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join the Campus Connect Family? 🎉</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Meru University students who are already making their campus life easier
          </p>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-full shadow-lg"
            onClick={() => navigate('/auth')}
          >
            Get Started Today 🚀
          </Button>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-600 to-green-600 p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Campus Connect</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Making student life at Meru University easier, one service at a time. Your ultimate campus companion! 🎓
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Youtube className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4 text-lg">Services</h3>
              <ul className="space-y-3 text-gray-300">
                <li><button onClick={() => handleServiceClick('/rental-help')} className="hover:text-white transition-colors text-left">🏠 Rental Help</button></li>
                <li><button onClick={() => handleServiceClick('/study-essentials')} className="hover:text-white transition-colors text-left">📚 Study Essentials</button></li>
                <li><button onClick={() => handleServiceClick('/household-items')} className="hover:text-white transition-colors text-left">🛋️ Household Items</button></li>
                <li><button onClick={() => handleServiceClick('/delivery')} className="hover:text-white transition-colors text-left">🚚 Delivery Services</button></li>
                <li><button onClick={() => handleServiceClick('/bicycle-rentals')} className="hover:text-white transition-colors text-left">🚲 Bicycle Rentals</button></li>
                <li><button onClick={() => handleServiceClick('/events')} className="hover:text-white transition-colors text-left">🎉 Campus Events</button></li>
              </ul>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            {/* Contact & Campus Info */}
            <div>
              <h3 className="font-semibold mb-4 text-lg">Get in Touch</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>support@campusconnect.co.ke</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+254 712 345 678</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Meru University Campus, Meru</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Fri 8AM-8PM</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-purple-800/50 rounded-lg">
                <div className="text-sm font-medium">📱 WhatsApp Support</div>
                <div className="text-xs text-gray-300 mt-1">Get instant help on WhatsApp</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-300 text-center md:text-left">
                &copy; 2025 Campus Connect. Built with ❤️ for Meru University students. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>🇰🇪 Proudly Kenyan</span>
                <span>•</span>
                <span>🌱 Eco-Friendly</span>
                <span>•</span>
                <span>⚡ Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
