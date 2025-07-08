
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const whatsappNumber = "+254790767347";

  const openWhatsApp = () => {
    const message = "Hello Campus Connect! I couldn't find the page I was looking for. Can you help me?";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl text-white">😅</span>
          </div>
          <CardTitle className="text-2xl text-gray-900">
            Oops! Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Looks like this page took a detour! Don't worry comrade, let's get you back on track.
          </p>
          
          <div className="space-y-3">
            <Link to="/" className="block">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={openWhatsApp}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Need Help? WhatsApp Us
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500">
              Campus Connect - Your Student Companion
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
