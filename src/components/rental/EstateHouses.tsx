
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Phone, MapPin, Bed, Bath, Wifi } from "lucide-react";

interface EstateHousesProps {
  area: string;
  subArea: string;
  onBack: () => void;
}

interface HouseListing {
  id: string;
  title: string;
  price: string;
  image: string;
  landlordName: string;
  landlordContact: string;
  features: string[];
  description: string;
}

const sampleHouses: HouseListing[] = [
  {
    id: "1",
    title: "Cozy Single Room",
    price: "KES 8,000/month",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    landlordName: "Mama Grace",
    landlordContact: "254712345678",
    features: ["Furnished", "Wi-Fi", "Water included"],
    description: "Perfect for students, close to campus with all amenities included."
  },
  {
    id: "2",
    title: "Modern Bedsitter",
    price: "KES 12,000/month",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    landlordName: "Mr. John Kamau",
    landlordContact: "254798765432",
    features: ["Private bathroom", "Kitchen", "Parking"],
    description: "Modern bedsitter with private amenities and secure parking."
  },
  {
    id: "3",
    title: "Shared 2BR Apartment",
    price: "KES 6,500/month",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop",
    landlordName: "Lucy Wanjiku",
    landlordContact: "254756789012",
    features: ["Shared kitchen", "Balcony", "24/7 Security"],
    description: "Share with one other student. Great for making comrade connections!"
  }
];

export const EstateHouses = ({ area, subArea, onBack }: EstateHousesProps) => {
  const handleWhatsAppContact = (contact: string, houseName: string) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${houseName} in ${subArea}, ${area}. Is it still available?`
    );
    const whatsappUrl = `https://wa.me/${contact}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallContact = (contact: string) => {
    window.open(`tel:+${contact}`, '_self');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Available Houses</h2>
          <p className="text-gray-600">{subArea}, {area}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleHouses.map((house) => (
          <Card key={house.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
            <div className="relative">
              <img 
                src={house.image} 
                alt={house.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <span className="text-sm font-semibold text-green-600">{house.price}</span>
              </div>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-900">{house.title}</CardTitle>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>{subArea}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{house.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {house.features.map((feature, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full flex items-center space-x-1"
                  >
                    {feature.includes('Wi-Fi') && <Wifi className="w-3 h-3" />}
                    {feature.includes('bathroom') && <Bath className="w-3 h-3" />}
                    {feature.includes('Room') && <Bed className="w-3 h-3" />}
                    <span>{feature}</span>
                  </span>
                ))}
              </div>
              
              <div className="border-t pt-3">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Landlord:</strong> {house.landlordName}
                </p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    onClick={() => handleWhatsAppContact(house.landlordContact, house.title)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    WhatsApp
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => handleCallContact(house.landlordContact)}
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Don't see what you're looking for?
          </h3>
          <p className="text-gray-600 mb-4">
            Let us help you find the perfect room in {subArea}
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Request Custom Search - KES 200
          </Button>
        </div>
      </div>
    </div>
  );
};
