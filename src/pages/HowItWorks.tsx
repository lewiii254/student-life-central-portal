
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search, MessageCircle, Truck, CheckCircle, Users, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Search,
      title: "Browse & Search",
      description: "Explore our services - from rental help to study essentials, all designed for Meru University students.",
      color: "from-purple-500 to-pink-500"
    },
    {
      step: 2,
      icon: MessageCircle,
      title: "Connect via WhatsApp",
      description: "Chat with our team or partners directly through WhatsApp for instant communication and support.",
      color: "from-green-500 to-emerald-500"
    },
    {
      step: 3,
      icon: Truck,
      title: "Get Delivered",
      description: "Enjoy fast campus-wide delivery or meet up at convenient locations around Meru University.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 4,
      icon: CheckCircle,
      title: "Rate & Review",
      description: "Share your experience to help fellow comrades make better choices and improve our services.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Student Community",
      description: "Built by students, for students at Meru University"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified partners and secure payment options"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Always here when you need us most"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-purple-600 hover:text-purple-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
              How Campus Connect Works
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-green-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Simple Steps to Campus Success 🚀
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            We've made it super easy for Meru University students to access everything they need
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works in 4 Simple Steps
            </h2>
            <p className="text-lg text-gray-600">
              From browsing to delivery, we've got you covered comrade!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.step} className="text-center hover:shadow-xl transition-shadow border-0 shadow-lg relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`}></div>
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Campus Connect?
            </h2>
            <p className="text-lg text-gray-600">
              We're more than just a platform - we're your campus family
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow border-0 shadow-md">
                  <Icon className="h-16 w-16 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of Meru University students already using Campus Connect</p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
              Sign Up Now - It's Free! 🎉
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
