import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Truck, ArrowLeft, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const DeliveryServices = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    service: "",
    details: ""
  });

  const services = [
    {
      name: "Laundry Pick-up/Drop",
      price: "KES 60",
      description: "We'll pick up your laundry and bring it back clean",
      icon: "🧺",
      time: "24-48 hours"
    },
    {
      name: "Fast Food Delivery",
      price: "KES 50",
      description: "Hot meals delivered to your doorstep",
      icon: "🍕",
      time: "30-45 minutes"
    },
    {
      name: "Grocery Shopping",
      price: "KES 50",
      description: "Small shopping and grocery delivery",
      icon: "🛒",
      time: "1-2 hours"
    },
    {
      name: "Gas Cylinder Delivery",
      price: "KES 50",
      description: "Fresh gas cylinder delivered safely",
      icon: "⛽",
      time: "2-4 hours"
    },
    {
      name: "Water Refill Delivery",
      price: "KES 50",
      description: "Clean refilled water delivered",
      icon: "💧",
      time: "1-2 hours"
    }
  ];

  const whatsappNumber = "+254790767347";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `New Delivery Request:
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
Service: ${formData.service}
Details: ${formData.details}`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const quickOrder = (serviceName: string, price: string) => {
    const message = `I'd like to order ${serviceName} for ${price}. Please contact me for details.`;
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
                <Truck className="w-8 h-8 text-orange-500" />
                <h1 className="text-2xl font-bold text-gray-900">Delivery Services</h1>
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
      <section className="py-12 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Fast & Reliable Delivery Services
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            From laundry to food delivery, we've got you covered with affordable rates and quick service.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Campus Coverage</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>WhatsApp Ordering</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Delivery Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <div className="text-2xl font-bold text-orange-500">{service.price}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    {service.description}
                  </CardDescription>
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.time}
                  </div>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => quickOrder(service.name, service.price)}
                  >
                    Order Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Book a Delivery Service
            </h2>
            <p className="text-gray-600">
              Fill out the form below and we'll contact you to confirm your delivery
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Delivery Request Form</CardTitle>
              <CardDescription>
                Provide your details and we'll get back to you quickly
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
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Building name, room number, or landmark"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="service">Service Needed</Label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service.name}>
                        {service.name} - {service.price}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="details">Additional Details</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    rows={3}
                    placeholder="Any special instructions or requirements..."
                  />
                </div>
                
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Request via WhatsApp
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Service Coverage Area
          </h2>
          <p className="text-gray-600 mb-4">
            We currently deliver to all campus areas and nearby student accommodations
          </p>
          <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              📍 Coverage includes: All campus dormitories, Maskan, AINA, Tender Brains, Alaban, St Rita, and surrounding areas
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeliveryServices;
