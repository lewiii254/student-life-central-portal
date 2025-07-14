
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, MessageCircle, Phone, Mail, HelpCircle, Book, Users, Truck, Home } from "lucide-react";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: "Getting Started",
      icon: Book,
      color: "from-purple-500 to-pink-500",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' on the homepage, enter your Meru University email, create a password, and verify your email. It's that simple!"
        },
        {
          question: "Do I need to pay to use Campus Connect?",
          answer: "Campus Connect is free to use! We only charge small service fees for certain premium features like priority delivery."
        },
        {
          question: "Can non-Meru University students use this platform?",
          answer: "Currently, Campus Connect is exclusively for Meru University students, staff, and approved partners."
        }
      ]
    },
    {
      title: "Rental Help",
      icon: Home,
      color: "from-green-500 to-emerald-500",
      faqs: [
        {
          question: "How does the rental search work?",
          answer: "Tell us your budget and preferences, pay the small search fee, and our agents will find suitable accommodations within 48 hours."
        },
        {
          question: "What's included in the search fee?",
          answer: "The search fee covers agent time, property verification, and personalized recommendations. You only pay once per search request."
        },
        {
          question: "Can I view properties before deciding?",
          answer: "Absolutely! Our agents arrange viewing appointments and accompany you to ensure safety and authenticity."
        }
      ]
    },
    {
      title: "Orders & Delivery",
      icon: Truck,
      color: "from-blue-500 to-cyan-500",
      faqs: [
        {
          question: "How long does delivery take?",
          answer: "Campus deliveries typically take 2-4 hours. We also offer same-day delivery for urgent orders."
        },
        {
          question: "What are the delivery charges?",
          answer: "Delivery within campus is KSh 50-100 depending on distance. Free delivery for orders above KSh 1,000."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! You'll receive WhatsApp updates with delivery status and can contact the delivery person directly."
        }
      ]
    },
    {
      title: "Payments & Safety",
      icon: Users,
      color: "from-orange-500 to-red-500",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We support M-Pesa, bank transfers, and cash payments. For safety, we recommend M-Pesa for most transactions."
        },
        {
          question: "How do I report a problem?",
          answer: "Contact us immediately via WhatsApp (+254 790 767 347) or email. We respond within 2 hours during business hours."
        },
        {
          question: "What if I receive damaged items?",
          answer: "Take photos, contact the seller first, then reach out to our support team. We'll help mediate and find a solution."
        }
      ]
    }
  ];

  const contactOptions = [
    {
      title: "WhatsApp Support",
      description: "Quick responses for urgent issues",
      icon: MessageCircle,
      contact: "+254 790 767 347",
      availability: "Daily 8AM - 8PM",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Email Support",
      description: "Detailed help for complex issues",
      icon: Mail,
      contact: "support@campusconnect.co.ke",
      availability: "Response within 24 hours",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Emergency Line",
      description: "For safety concerns only",
      icon: Phone,
      contact: "+254 700 123 456",
      availability: "24/7 Emergency",
      color: "from-red-500 to-pink-500"
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0 || searchQuery === '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Help Center
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">
            How Can We Help You? 🤝
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support team
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/95 backdrop-blur-sm border-0 shadow-lg text-lg text-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions 💡
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to the most common questions from our comrades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredFAQs.map((category, categoryIndex) => {
              const Icon = category.icon;
              return (
                <Card key={categoryIndex} className="hover:shadow-xl transition-shadow border-0 shadow-lg overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full bg-gradient-to-r ${category.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span>{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => (
                      <div key={faqIndex} className="border-l-4 border-gray-200 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {searchQuery && filteredFAQs.every(cat => cat.faqs.length === 0) && (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                Couldn't find what you're looking for? Try different keywords or contact our support team.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Contact Support
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Need Help? 📞
            </h2>
            <p className="text-lg text-gray-600">
              Our friendly support team is here to assist you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <p className="font-bold text-lg mb-2">{option.contact}</p>
                  <p className="text-sm text-gray-500">{option.availability}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Quick Tips for New Users 🚀</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Complete Your Profile</h3>
              <p className="text-white/80 text-sm">Add your course and year info to get better recommendations</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Verify Everything</h3>
              <p className="text-white/80 text-sm">Always verify items and meet in safe, public places</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Stay Connected</h3>
              <p className="text-white/80 text-sm">Join our WhatsApp group for updates and community support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
