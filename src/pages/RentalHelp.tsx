import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Home, ArrowLeft, MessageCircle, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RentalAreaCard } from "@/components/rental/RentalAreaCard";
import { SubAreaList } from "@/components/rental/SubAreaList";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(1, "Please select a preferred location"),
  budget: z.string().min(1, "Please select your budget range"),
  additionalInfo: z.string().optional(),
});

const RentalHelp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      location: "",
      budget: "",
      additionalInfo: "",
    },
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

  const handleWhatsAppChat = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in your rental help service. I'd like to discuss my room search requirements.`
    );
    const whatsappUrl = `https://wa.me/254790767347?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Convert budget range to a number for easier processing
      const budgetMapping: { [key: string]: number } = {
        "under-5000": 4000,
        "5000-8000": 6500,
        "8000-12000": 10000,
        "12000-15000": 13500,
        "15000-20000": 17500,
        "above-20000": 25000
      };

      const { data, error } = await supabase
        .from('rental_requests')
        .insert([
          {
            name: values.name,
            contact: values.phone,
            preferred_location: values.location,
            budget: budgetMapping[values.budget] || 0,
            status: 'pending',
            // Store additional info in a JSON field if needed
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      setSubmissionSuccess(true);
      toast({
        title: "Request Submitted Successfully!",
        description: "We'll contact you within 24 hours with rental options.",
      });

      // Auto-redirect to WhatsApp after successful submission
      setTimeout(() => {
        const detailedMessage = encodeURIComponent(
          `Hi! I've just submitted a rental request on your website. Here are my details:
          
Name: ${values.name}
Phone: ${values.phone}
Preferred Location: ${values.location}
Budget: ${values.budget.replace('-', ' to KES ').replace('under-', 'Under KES ').replace('above-', 'Above KES ')}
${values.additionalInfo ? `Additional Info: ${values.additionalInfo}` : ''}

Reference ID: ${data?.[0]?.id || 'N/A'}

Please help me find a suitable room. Thank you!`
        );
        const whatsappUrl = `https://wa.me/254790767347?text=${detailedMessage}`;
        window.open(whatsappUrl, '_blank');
      }, 2000);

    } catch (error) {
      console.error('Error submitting rental request:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-lg mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Request Submitted!</CardTitle>
            <CardDescription>
              Your rental search request has been successfully submitted.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              We'll contact you within 24 hours with available rental options that match your criteria.
            </p>
            <p className="text-sm text-gray-500">
              You'll be redirected to WhatsApp shortly to continue the conversation.
            </p>
            <div className="space-y-2">
              <Button onClick={handleWhatsAppChat} className="w-full bg-green-600 hover:bg-green-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Continue on WhatsApp
              </Button>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show area details if an area is selected
  if (selectedArea) {
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
          <SubAreaList 
            area={selectedArea}
            subAreas={locations[selectedArea as keyof typeof locations] || []}
            onBack={() => setSelectedArea(null)}
          />
        </div>
      </div>
    );
  }

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

          {/* Enhanced Booking Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Book Your Room Search</CardTitle>
                <CardDescription>Fill out your details and we'll find the perfect room for you</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., +254 700 000 000" {...field} />
                          </FormControl>
                          <FormDescription>
                            Include country code for WhatsApp integration
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Location</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select preferred area" />
                              </SelectTrigger>
                            </FormControl>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Budget (KES)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-5000">Under KES 5,000</SelectItem>
                              <SelectItem value="5000-8000">KES 5,000 - 8,000</SelectItem>
                              <SelectItem value="8000-12000">KES 8,000 - 12,000</SelectItem>
                              <SelectItem value="12000-15000">KES 12,000 - 15,000</SelectItem>
                              <SelectItem value="15000-20000">KES 15,000 - 20,000</SelectItem>
                              <SelectItem value="above-20000">Above KES 20,000</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Requirements (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any specific requirements? (e.g., pet-friendly, parking, utilities included)"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-lg py-6"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting Request...
                          </>
                        ) : (
                          "Start My Room Search - KES 200"
                        )}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full border-green-500 text-green-600 hover:bg-green-50"
                        onClick={handleWhatsAppChat}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat on WhatsApp First
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Areas */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Available Rental Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Object.entries(locations).map(([area, subAreas]) => (
              <RentalAreaCard
                key={area}
                area={area}
                subAreas={subAreas}
                onClick={() => setSelectedArea(area)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalHelp;
