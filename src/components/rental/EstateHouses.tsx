
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Phone, MapPin, Bed, Bath, Wifi } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  landlordWhatsapp?: string;
  features: string[];
  description: string;
}

export const EstateHouses = ({ area, subArea, onBack }: EstateHousesProps) => {
  // Fetch real houses from database
  const { data: houses = [], isLoading } = useQuery({
    queryKey: ['houses', area, subArea],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('houses')
        .select('*')
        .eq('location', area)
        .eq('sub_area', subArea)
        .eq('available', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching houses:', error);
        return [];
      }

      return data?.map(house => ({
        id: house.id,
        title: house.title,
        price: `KES ${house.price.toLocaleString()}/month`,
        image: house.image_urls?.[0] || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
        landlordName: house.landlord_name,
        landlordContact: house.landlord_contact,
        landlordWhatsapp: house.landlord_whatsapp || house.landlord_contact,
        features: house.features || [],
        description: house.description || "Contact landlord for more details"
      })) || [];
    }
  });

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

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading available houses...</p>
        </div>
      ) : houses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house) => (
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
                
                {house.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {house.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full flex items-center space-x-1"
                      >
                        {feature.toLowerCase().includes('wi-fi') && <Wifi className="w-3 h-3" />}
                        {feature.toLowerCase().includes('bathroom') && <Bath className="w-3 h-3" />}
                        {feature.toLowerCase().includes('room') && <Bed className="w-3 h-3" />}
                        <span>{feature}</span>
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Landlord:</strong> {house.landlordName}
                  </p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      onClick={() => handleWhatsAppContact(house.landlordWhatsapp || house.landlordContact, house.title)}
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
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No houses available in {subArea} at the moment</p>
        </div>
      )}

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
