
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ArrowLeft, Users, Target, Heart, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const whatsappNumber = "+254790767347";

  const teamValues = [
    {
      icon: Heart,
      title: "Student-First",
      description: "Every decision we make puts Meru University students at the center"
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Connecting comrades and building lasting campus relationships"
    },
    {
      icon: Target,
      title: "Affordable Solutions",
      description: "Quality services that fit every student's budget"
    }
  ];

  const openWhatsApp = () => {
    const message = "Hello Campus Connect! I'd like to know more about your services.";
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
                <Users className="w-8 h-8 text-blue-500" />
                <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
              </div>
            </div>
            
            <Button className="bg-green-500 hover:bg-green-600" onClick={openWhatsApp}>
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Campus Connect
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Your ultimate student companion, built by students, for students at Meru University
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600">
              Born from the real struggles of Meru University students
            </p>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Campus Connect was born out of the everyday challenges we faced as students at Meru University. 
                From struggling to find affordable accommodation near campus to searching for the right study materials, 
                we realized that every comrade was facing the same problems.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                What started as a simple idea to help fellow students find rooms has grown into a comprehensive platform 
                that connects students with everything they need - from study essentials to household items, 
                from delivery services to campus events.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, Campus Connect serves hundreds of students across Meru University, making campus life easier, 
                more affordable, and more connected. We're not just a service - we're part of the comrade family.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <Target className="w-12 h-12 text-blue-500 mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To simplify student life at Meru University by providing a one-stop platform 
                  for all essential services - from accommodation to academics, from household needs 
                  to campus events. We're here to make every comrade's journey smoother and more affordable.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Heart className="w-12 h-12 text-green-500 mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To become the most trusted student companion platform in Kenya, 
                  expanding our services to universities nationwide while maintaining our 
                  core values of affordability, reliability, and genuine care for student needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-lg text-gray-600">
              The values that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamValues.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <value.icon className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <Phone className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p>+254 790 767 347</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p>info@campusconnect.co.ke</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p>Meru University Campus</p>
            </div>
          </div>
          
          <div className="mt-12">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={openWhatsApp}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat with Us Now
            </Button>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Follow Us on Social Media
          </h2>
          <p className="text-gray-600 mb-8">
            Stay updated with the latest news, offers, and campus events
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="lg">
              Facebook
            </Button>
            <Button variant="outline" size="lg">
              Instagram
            </Button>
            <Button variant="outline" size="lg">
              Twitter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
