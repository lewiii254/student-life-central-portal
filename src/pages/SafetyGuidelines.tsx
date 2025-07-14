
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, AlertTriangle, Phone, MessageCircle, Eye, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const SafetyGuidelines = () => {
  const guidelines = [
    {
      icon: Shield,
      title: "Verify Before You Buy",
      description: "Always verify the seller's identity and check product authenticity before making payments.",
      tips: [
        "Ask for clear photos of items",
        "Request to see items before payment",
        "Use our verified partner shops when possible",
        "Check seller ratings and reviews"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lock,
      title: "Secure Payment Methods",
      description: "Use safe payment methods and never share sensitive financial information.",
      tips: [
        "Prefer M-Pesa or bank transfers",
        "Avoid cash payments to strangers",
        "Never share PIN or passwords",
        "Keep payment receipts"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Eye,
      title: "Meet in Safe Places",
      description: "Choose public, well-lit locations for meetups and exchanges.",
      tips: [
        "Meet during daylight hours",
        "Choose busy campus locations",
        "Bring a friend when possible",
        "Trust your instincts"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageCircle,
      title: "Communication Best Practices",
      description: "Keep all communications within our platform or official WhatsApp channels.",
      tips: [
        "Use Campus Connect WhatsApp",
        "Don't share personal details early",
        "Report suspicious behavior",
        "Keep conversation records"
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  const emergencyContacts = [
    { title: "Campus Security", number: "+254 700 123 456", available: "24/7" },
    { title: "Campus Connect Support", number: "+254 790 767 347", available: "Daily 8AM-8PM" },
    { title: "Emergency Services", number: "999", available: "24/7" },
    { title: "Meru University Admin", number: "+254 600 000 000", available: "Mon-Fri 8AM-5PM" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-red-600 hover:text-red-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Safety Guidelines
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto text-center">
          <Shield className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            Your Safety is Our Priority 🛡️
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Essential safety guidelines to keep you secure while using Campus Connect services
          </p>
        </div>
      </section>

      {/* Guidelines Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Safe, Stay Smart 🧠
            </h2>
            <p className="text-lg text-gray-600">
              Follow these guidelines to ensure a safe experience for all comrades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guidelines.map((guideline, index) => {
              const Icon = guideline.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow border-0 shadow-lg overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${guideline.color}`}></div>
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${guideline.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{guideline.title}</CardTitle>
                    </div>
                    <CardDescription className="text-gray-600 text-base">
                      {guideline.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {guideline.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Emergency Contacts 📞
            </h2>
            <p className="text-lg text-gray-600">
              Keep these numbers handy - your safety network at Meru University
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{contact.title}</h3>
                    <p className="text-2xl font-bold text-red-600 mt-1">{contact.number}</p>
                    <p className="text-sm text-gray-600 mt-1">Available: {contact.available}</p>
                  </div>
                  <Phone className="h-8 w-8 text-red-600" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Report Suspicious Activity</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            If you encounter any suspicious behavior or feel unsafe, report it immediately. 
            We take all reports seriously and act quickly to protect our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <MessageCircle className="w-5 h-5 mr-2" />
              Report via WhatsApp
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <Phone className="w-5 h-5 mr-2" />
              Call Support
            </Button>
          </div>
          <p className="mt-6 text-white/80">
            Remember: It's better to be safe than sorry. Trust your instincts! 🙏
          </p>
        </div>
      </section>
    </div>
  );
};

export default SafetyGuidelines;
