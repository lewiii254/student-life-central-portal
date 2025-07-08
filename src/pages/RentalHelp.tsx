
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Home, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const RentalHelp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    budget: ""
  });

  const locations = {
    "Maskan": [
      "Maskan near bridge",
      "Maskan Centre", 
      "Maskan near the small back gate"
    ],
    "AINA": [],
    "Tender Brains": [],
    "Alaban": [],
    "St Rita": [],
    "Neema": [],
    "Nchiru CBD": [],
    "California": [],
    "Khan": [],
    "Lower Kunene": [
      "Red Empire",
      "Kioni"
    ],
    "Upper Kunene": [
      "Around Kunene secondary",
      "Past Kunene Secondary"
    ],
    "Kwa Mathey": [],
    "Shaquille": [],
    "Kirindine": []
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-900">Rental Help</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Room Near Campus
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We help you discover the best rental locations around campus with detailed information and transparent pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* How It Works */}
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Home className="w-6 h-6 text-blue-500" />
                  <span>How It Works</span>
                </CardTitle>
                <CardDescription>Simple steps to find your ideal room</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-semibold">Fill Out Your Preferences</h3>
                      <p className="text-gray-600">Tell us your name, contact, preferred location, and budget</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-semibold">We Search For You</h3>
                      <p className="text-gray-600">Our team searches available rooms in your preferred areas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="font-semibold">Get Matched</h3>
                      <p className="text-gray-600">Receive curated options that match your criteria</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="font-semibold">Move In</h3>
                      <p className="text-gray-600">Visit, choose, and settle into your new home</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">💰 Transparent Pricing</CardTitle>
                <CardDescription>Simple, upfront costs with no hidden fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">KES 200</div>
                    <div className="text-gray-600">Per search request</div>
                    <p className="text-sm text-gray-500 mt-2">
                      Only pay when we provide you with rental options
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Comprehensive area search</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Verified landlord contacts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Room photos and details</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Price negotiation tips</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Book Your Room Search</CardTitle>
                <CardDescription>Fill out your details and we'll find the perfect room for you</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="e.g., +254 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Preferred Location</Label>
                    <Select onValueChange={(value) => setFormData({...formData, location: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred area" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(locations).map(([area, subAreas]) => (
                          <div key={area}>
                            <SelectItem value={area} className="font-semibold">
                              {area}
                            </SelectItem>
                            {subAreas.map((subArea) => (
                              <SelectItem key={subArea} value={`${area} - ${subArea}`} className="pl-6">
                                {subArea}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Monthly Budget (KES)</Label>
                    <Select onValueChange={(value) => setFormData({...formData, budget: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5000">Under KES 5,000</SelectItem>
                        <SelectItem value="5000-8000">KES 5,000 - 8,000</SelectItem>
                        <SelectItem value="8000-12000">KES 8,000 - 12,000</SelectItem>
                        <SelectItem value="12000-15000">KES 12,000 - 15,000</SelectItem>
                        <SelectItem value="15000-20000">KES 15,000 - 20,000</SelectItem>
                        <SelectItem value="above-20000">Above KES 20,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-lg py-6">
                      Start My Room Search - KES 200
                    </Button>
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-green-500 text-green-600 hover:bg-green-50"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat on WhatsApp First
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Areas */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Available Rental Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(locations).map(([area, subAreas]) => (
              <Card key={area} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>{area}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {subAreas.length > 0 ? (
                    <ul className="text-sm text-gray-600 space-y-1">
                      {subAreas.map((subArea) => (
                        <li key={subArea} className="flex items-center space-x-2">
                          <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                          <span>{subArea}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">Multiple options available</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalHelp;
