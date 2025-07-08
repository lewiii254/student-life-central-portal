import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageCircle, Calendar, ArrowLeft, MapPin, Clock, Users, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

const CampusEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const upcomingEvents = [
    {
      id: "1",
      title: "Freshman Orientation Week",
      date: "2024-08-15",
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      description: "Welcome new students to campus life with orientation sessions, campus tours, and meet & greet activities.",
      price: "Free",
      category: "Orientation",
      attendees: 500,
      image: "/placeholder.svg",
      organizer: "Student Affairs"
    },
    {
      id: "2",
      title: "Engineering Club Fair",
      date: "2024-08-20",
      time: "2:00 PM - 6:00 PM",
      location: "Student Center Plaza",
      description: "Discover various engineering clubs and societies. Sign up for clubs that match your interests!",
      price: "Free",
      category: "Club Fair",
      attendees: 300,
      image: "/placeholder.svg",
      organizer: "Engineering Department"
    },
    {
      id: "3",
      title: "Back to School Discount Sale",
      date: "2024-08-25",
      time: "10:00 AM - 8:00 PM",
      location: "Campus Bookstore",
      description: "Huge discounts on textbooks, stationery, and campus merchandise. Don't miss out!",
      price: "Various Discounts",
      category: "Promotion",
      attendees: 200,
      image: "/placeholder.svg",
      organizer: "Campus Bookstore"
    },
    {
      id: "4",
      title: "Tech Innovation Summit",
      date: "2024-09-05",
      time: "1:00 PM - 7:00 PM",
      location: "Engineering Complex",
      description: "Industry leaders share insights on latest tech trends. Networking opportunities available.",
      price: "KES 500",
      category: "Conference",
      attendees: 150,
      image: "/placeholder.svg",
      organizer: "Tech Society"
    },
    {
      id: "5",
      title: "Cultural Night Festival",
      date: "2024-09-12",
      time: "6:00 PM - 11:00 PM",
      location: "Campus Grounds",
      description: "Celebrate diversity with music, dance, and food from different cultures represented on campus.",
      price: "KES 300",
      category: "Cultural",
      attendees: 400,
      image: "/placeholder.svg",
      organizer: "Cultural Committee"
    }
  ];

  const whatsappNumber = "+254790767347";

  const handleRSVP = (eventTitle: string, eventPrice: string) => {
    const message = `I'd like to RSVP for "${eventTitle}" (${eventPrice}). Please send me the details.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const generateTicket = (eventTitle: string) => {
    // Simulate ticket generation
    const ticketNumber = `CC-${Date.now().toString().slice(-6)}`;
    const message = `Ticket Generated!
Event: ${eventTitle}
Ticket #: ${ticketNumber}
Status: Confirmed
Please save this message as your ticket.`;
    
    alert(message);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Orientation": "bg-blue-100 text-blue-800",
      "Club Fair": "bg-green-100 text-green-800",
      "Promotion": "bg-orange-100 text-orange-800",
      "Conference": "bg-purple-100 text-purple-800",
      "Cultural": "bg-pink-100 text-pink-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
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
                <Calendar className="w-8 h-8 text-pink-500" />
                <h1 className="text-2xl font-bold text-gray-900">Campus Events</h1>
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
      <section className="py-12 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Never Miss What's Happening
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Stay updated with all campus events, from orientations to cultural festivals. RSVP easily and get your tickets!
          </p>
          <div className="bg-white/20 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm">
              💰 <strong>Revenue:</strong> 5 KES per ticket + 100 KES per advertisement
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Upcoming Events
            </h2>
            <div className="flex space-x-2">
              <Input
                placeholder="Search events..."
                className="w-64"
              />
              <Button variant="outline">Filter</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-all duration-200 overflow-hidden">
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge 
                    className={`absolute top-2 left-2 ${getCategoryColor(event.category)}`}
                  >
                    {event.category}
                  </Badge>
                  {event.price !== "Free" && (
                    <Badge variant="default" className="absolute top-2 right-2 bg-green-500">
                      {event.price}
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} expected attendees
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-pink-500 hover:bg-pink-600"
                      onClick={() => handleRSVP(event.title, event.price)}
                    >
                      RSVP Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => generateTicket(event.title)}
                      title="Generate Ticket"
                    >
                      <Ticket className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Organized by {event.organizer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Event Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Orientation", "Club Fair", "Promotion", "Conference", "Cultural"].map((category) => (
              <Card key={category} className="text-center hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mb-2">
                    {category[0]}
                  </div>
                  <CardTitle className="text-sm">{category}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-900">
            How Event Booking Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Browse Events", description: "Discover upcoming campus events" },
              { step: "2", title: "RSVP", description: "Click RSVP and confirm via WhatsApp" },
              { step: "3", title: "Get Ticket", description: "Receive your auto-generated ticket" },
              { step: "4", title: "Attend", description: "Show up and enjoy the event!" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advertise Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Want to Advertise Your Event?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Promote your event to the entire campus community. Reach hundreds of students with our advertising platform.
          </p>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <Badge variant="secondary" className="text-purple-700">
              Only KES 100 per advertisement
            </Badge>
          </div>
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => {
              const message = "I'd like to advertise my event on Campus Connect. Please send me the details.";
              const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
              window.open(url, '_blank');
            }}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Advertise Your Event
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CampusEvents;
