
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import UserMenu from '@/components/UserMenu';
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
  Shield
} from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      title: 'Rental Help',
      description: 'Find your perfect student accommodation with our smart search and WhatsApp integration.',
      icon: Home,
      link: '/rental-help',
      color: 'bg-blue-500',
      stats: '500+ Properties'
    },
    {
      title: 'Study Essentials',
      description: 'Get all your academic supplies delivered fast. From notebooks to tech accessories.',
      icon: ShoppingCart,
      link: '/study-essentials',
      color: 'bg-green-500',
      stats: '1000+ Products'
    },
    {
      title: 'Household Items',
      description: 'Everything you need to make your space feel like home. Furniture, kitchen, and more.',
      icon: Package,
      link: '/household-items',
      color: 'bg-purple-500',
      stats: '300+ Items'
    },
    {
      title: 'Delivery Services',
      description: 'Fast and reliable campus-wide delivery. Track your packages in real-time.',
      icon: Truck,
      link: '/delivery',
      color: 'bg-orange-500',
      stats: '24/7 Service'
    },
    {
      title: 'Bicycle Rentals',
      description: 'Eco-friendly transportation around campus. Hourly and daily rates available.',
      icon: Bike,
      link: '/bicycle-rentals',
      color: 'bg-teal-500',
      stats: '50+ Bikes'
    },
    {
      title: 'Campus Events',
      description: 'Discover exciting events, workshops, and activities happening on campus.',
      icon: Calendar,
      link: '/events',
      color: 'bg-pink-500',
      stats: 'Weekly Events'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'Student Community',
      description: 'Connect with fellow students and build lasting relationships'
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Your data and transactions are protected with enterprise-grade security'
    },
    {
      icon: Heart,
      title: '24/7 Support',
      description: 'Our dedicated support team is always here to help you'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Campus Connect</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 transition-colors">
                Admin
              </Link>
            </nav>

            <UserMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold">
              Your Ultimate Student Companion
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              From finding the perfect accommodation to getting study materials delivered, 
              Campus Connect makes student life easier and more connected.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for services, products, or events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-black"
                />
              </div>
              <Button className="h-12 px-6 bg-white text-blue-600 hover:bg-gray-100">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of services designed specifically for student life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} to={service.link}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-lg ${service.color} text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-sm font-medium text-gray-500">
                          {service.stats}
                        </span>
                      </div>
                      <CardTitle className="group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Campus Connect?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to making your student journey smooth and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center space-y-4">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">10K+</div>
              <div className="text-gray-300">Happy Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">500+</div>
              <div className="text-gray-300">Properties Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400">1K+</div>
              <div className="text-gray-300">Products Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">24/7</div>
              <div className="text-gray-300">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Computer Science Student",
                text: "Campus Connect made finding my apartment so easy! The WhatsApp integration is genius.",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Business Major",
                text: "Love the fast delivery service. Got my study materials the same day I ordered them.",
                rating: 5
              },
              {
                name: "Emma Wilson",
                role: "Engineering Student",
                text: "The bicycle rental service is perfect for getting around campus sustainably.",
                rating: 5
              }
            ].map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6" />
                <span className="text-xl font-bold">Campus Connect</span>
              </div>
              <p className="text-gray-300">
                Making student life easier, one service at a time.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/rental-help" className="hover:text-white transition-colors">Rental Help</Link></li>
                <li><Link to="/study-essentials" className="hover:text-white transition-colors">Study Essentials</Link></li>
                <li><Link to="/household-items" className="hover:text-white transition-colors">Household Items</Link></li>
                <li><Link to="/delivery" className="hover:text-white transition-colors">Delivery</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">More</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/bicycle-rentals" className="hover:text-white transition-colors">Bicycle Rentals</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Campus Events</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/admin" className="hover:text-white transition-colors">Admin</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>support@campusconnect.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Mon-Fri 9AM-6PM</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Campus Connect. Built with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
