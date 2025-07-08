
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Bike, ArrowLeft, Clock, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const BicycleRentals = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    duration: "",
    date: "",
    bikeType: ""
  });

  const bikes = [
    {
      name: "City Cruiser",
      image: "/placeholder.svg",
      description: "Perfect for campus commuting",
      hourlyRate: "KES 20",
      dailyRate: "KES 150",
      features: ["Comfortable seat", "Front basket", "LED lights"],
      available: true,
      rating: 4.5
    },
    {
      name: "Mountain Bike",
      image: "/placeholder.svg",
      description: "Great for rough terrain",
      hourlyRate: "KES 25",
      dailyRate: "KES 200",
      features: ["21-speed gears", "Suspension", "Durable tires"],
      available: true,
      rating: 4.7
    },
    {
      name: "Electric Bike",
      image: "/placeholder.svg",
      description: "Effortless riding experience",
      hourlyRate: "KES 40",
      dailyRate: "KES 300",
      features: ["Electric motor", "Long battery life", "Digital display"],
      available: false,
      rating: 4.9
    }
  ];

  const rentalOptions = [
    { duration: "1 Hour", description: "Quick campus trips" },
    { duration: "Half Day (4 hours)", description: "Morning or afternoon adventures" },
    { duration: "Full Day (8 hours)", description: "All-day exploration" },
    { duration: "Weekly", description: "Best value for regular use" }
  ];

  const whatsappNumber = "+254700000000"; // Replace with actual number

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Bicycle Rental Request:
Name: ${formData.name}
Phone: ${formData.phone}
Bike Type: ${formData.bikeType}
Duration: ${formData.duration}
Date: ${formData.date}`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const quickBook = (bikeName: string, rate: string) => {
    const message = `I'd like to rent the ${bikeName} at ${rate}. Please contact me for booking details.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

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
                <Bike className="w-8 h-8 text-cyan-500" />
                <h1 className="text-2xl font-bold text-gray-900">Bicycle Rentals</h1>
              </div>
            </div>
            
            <Button className="bg-green-500 hover:bg-green-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Support
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Eco-Friendly Campus Transport
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Rent a bicycle and explore campus in style. Affordable rates, well-maintained bikes, and flexible rental options.
          </p>
          <div className="bg-white/20 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm">
              💰 <strong>Commission-based</strong> - Earning 5-10 KES per rental hour
            </p>
          </div>
        </div>
      </section>

      {/* Available Bikes */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Available Bicycles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikes.map((bike, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="relative">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    {!bike.available && (
                      <Badge variant="destructive" className="absolute top-2 right-2">
                        Not Available
                      </Badge>
                    )}
                    {bike.available && (
                      <Badge variant="default" className="absolute top-2 right-2 bg-green-500">
                        Available
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{bike.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{bike.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{bike.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Hourly Rate:</span>
                      <span className="font-bold text-cyan-600">{bike.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Daily Rate:</span>
                      <span className="font-bold text-cyan-600">{bike.dailyRate}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {bike.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-cyan-500 hover:bg-cyan-600"
                    disabled={!bike.available}
                    onClick={() => quickBook(bike.name, bike.hourlyRate)}
                  >
                    {bike.available ? "Book Now" : "Currently Unavailable"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Options */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Rental Duration Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {rentalOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <Clock className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <CardTitle className="text-lg">{option.duration}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Book Your Bicycle
            </h2>
            <p className="text-gray-600">
              Fill out the form below to reserve your bicycle
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Bicycle Rental Form</CardTitle>
              <CardDescription>
                Complete your booking details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bikeType">Bicycle Type</Label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={formData.bikeType}
                    onChange={(e) => setFormData({...formData, bikeType: e.target.value})}
                    required
                  >
                    <option value="">Select a bicycle</option>
                    {bikes.filter(bike => bike.available).map((bike, index) => (
                      <option key={index} value={bike.name}>
                        {bike.name} - {bike.hourlyRate}/hour
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="duration">Rental Duration</Label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    required
                  >
                    <option value="">Select duration</option>
                    {rentalOptions.map((option, index) => (
                      <option key={index} value={option.duration}>
                        {option.duration}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Book via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms & Safety */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Terms of Use & Safety
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle>Safety Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Always wear a helmet (provided)</li>
                  <li>• Check brakes before riding</li>
                  <li>• Follow campus speed limits</li>
                  <li>• Return bike to designated areas</li>
                  <li>• Report any issues immediately</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Clock className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle>Rental Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• ID required for all rentals</li>
                  <li>• Late returns incur extra charges</li>
                  <li>• Damage fees apply if applicable</li>
                  <li>• Cancellations 2 hours in advance</li>
                  <li>• Student discounts available</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BicycleRentals;
