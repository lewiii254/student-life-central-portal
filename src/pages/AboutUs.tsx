
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ArrowLeft, Heart, Target, Users, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const whatsappNumber = "+254700000000"; // Replace with actual number

  const teamMembers = [
    {
      name: "Alex Mwangi",
      role: "Founder & CEO",
      description: "Computer Science student passionate about solving campus life challenges",
      image: "/placeholder.svg"
    },
    {
      name: "Sarah Wanjiku",
      role: "Operations Manager",
      description: "Business student focused on streamlining campus services",
      image: "/placeholder.svg"
    },
    {
      name: "David Kiprotich",
      role: "Tech Lead",
      description: "Engineering student building the future of campus connectivity",
      image: "/placeholder.svg"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Everything we do is designed with students' needs and budgets in mind"
    },
    {
      icon: Target,
      title: "Reliability",
      description: "Dependable services you can count on throughout your campus journey"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building connections and supporting local businesses within the campus ecosystem"
    }
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">About Campus Connect</h1>
            </div>
            
            <Button className="bg-green-500 hover:bg-green-600">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            About Campus Connect
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We're a team of students building solutions for students. Campus Connect was born from our own 
            experiences navigating campus life and recognizing the need for a centralized platform that 
            makes student life easier, more affordable, and more connected.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Campus Connect started as a simple idea: what if there was one place where 
              students could find everything they need?
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg"
                alt="Campus Connect founders"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">The Beginning</h3>
                <p className="text-gray-600">
                  As students ourselves, we experienced firsthand the challenges of finding affordable 
                  accommodation, buying study materials, getting reliable delivery services, and 
                  staying updated with campus events. We realized these weren't just our problems – 
                  they were shared by thousands of students across the campus.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">The Solution</h3>
                <p className="text-gray-600">
                  In 2024, we launched Campus Connect as your ultimate student companion. We've created 
                  a platform that brings together essential services – from rental help and study 
                  essentials to delivery services and event updates – all in one convenient place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  To simplify and enhance the campus experience by providing students with easy access 
                  to essential services, affordable solutions, and a connected community that supports 
                  their academic and personal growth.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Heart className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  To become the leading student services platform that transforms campus life by making 
                  it more convenient, affordable, and connected for every student, while supporting 
                  local businesses and fostering a thriving campus ecosystem.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Campus Connect
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <value.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Students building solutions for students
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Get in Touch
          </h2>
          
          <div className="space-y-6 mb-8">
            <Card>
              <CardContent className="flex items-center justify-center space-x-4 p-6">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold">WhatsApp Support</p>
                  <p className="text-gray-600">Available 24/7 for all your needs</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="flex items-center justify-center space-x-4 p-6">
                <Mail className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">info@campusconnect.co.ke</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 w-full md:w-auto"
              onClick={() => {
                const message = "Hello! I'd like to know more about Campus Connect.";
                const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                window.open(url, '_blank');
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Us on WhatsApp
            </Button>
            
            <p className="text-sm text-gray-500">
              We'd love to hear from you! Whether you have questions, suggestions, or want to partner with us.
            </p>
          </div>
        </div>
      </section>

      {/* Join Our Community */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Join the Campus Connect Community
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Be part of a growing community of students who are making campus life better for everyone.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Explore Our Services
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
