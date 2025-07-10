
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, 
  Save, 
  Globe,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Clock,
  Users
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const SiteSettings = () => {
  const [settings, setSettings] = useState({
    site_name: 'Campus Connect',
    contact_phone: '+254790767347',
    contact_email: 'info@campusconnect.co.ke',
    address: 'Nairobi, Kenya',
    whatsapp_number: '+254790767347',
    delivery_fee: 200,
    rental_search_fee: 200,
    operating_hours: '8:00 AM - 8:00 PM',
    about_text: 'Campus Connect is your one-stop solution for all campus needs.',
    social_media: {
      facebook: '',
      twitter: '',
      instagram: '',
      tiktok: ''
    }
  });

  const queryClient = useQueryClient();

  // Fetch current rental settings
  const { data: rentalSettings } = useQuery({
    queryKey: ['rental-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rental_settings')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    }
  });

  // Update rental settings
  const updateSettings = useMutation({
    mutationFn: async (newSettings: typeof settings) => {
      // Update rental settings
      const { error: rentalError } = await supabase
        .from('rental_settings')
        .update({ 
          search_fee: newSettings.rental_search_fee,
          updated_at: new Date().toISOString()
        })
        .eq('id', rentalSettings?.id);

      if (rentalError) throw rentalError;

      // In a real app, you'd store other settings in a dedicated settings table
      console.log('Settings updated:', newSettings);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rental-settings'] });
      toast.success('Settings updated successfully');
    }
  });

  React.useEffect(() => {
    if (rentalSettings) {
      setSettings(prev => ({
        ...prev,
        rental_search_fee: rentalSettings.search_fee || 200
      }));
    }
  }, [rentalSettings]);

  const handleSave = () => {
    updateSettings.mutate(settings);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Site Settings</h2>
        <Button onClick={handleSave} disabled={updateSettings.isPending}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Site Name</label>
              <Input
                value={settings.site_name}
                onChange={(e) => setSettings(prev => ({ ...prev, site_name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">About Text</label>
              <Textarea
                value={settings.about_text}
                onChange={(e) => setSettings(prev => ({ ...prev, about_text: e.target.value }))}
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Operating Hours</label>
              <Input
                value={settings.operating_hours}
                onChange={(e) => setSettings(prev => ({ ...prev, operating_hours: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input
                value={settings.contact_phone}
                onChange={(e) => setSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">WhatsApp Number</label>
              <Input
                value={settings.whatsapp_number}
                onChange={(e) => setSettings(prev => ({ ...prev, whatsapp_number: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Address</label>
              <Input
                value={settings.address}
                onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Pricing Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Rental Search Fee (KES)</label>
              <Input
                type="number"
                value={settings.rental_search_fee}
                onChange={(e) => setSettings(prev => ({ ...prev, rental_search_fee: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Standard Delivery Fee (KES)</label>
              <Input
                type="number"
                value={settings.delivery_fee}
                onChange={(e) => setSettings(prev => ({ ...prev, delivery_fee: Number(e.target.value) }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Social Media Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Facebook</label>
              <Input
                placeholder="https://facebook.com/campusconnect"
                value={settings.social_media.facebook}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  social_media: { ...prev.social_media, facebook: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Twitter</label>
              <Input
                placeholder="https://twitter.com/campusconnect"
                value={settings.social_media.twitter}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  social_media: { ...prev.social_media, twitter: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Instagram</label>
              <Input
                placeholder="https://instagram.com/campusconnect"
                value={settings.social_media.instagram}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  social_media: { ...prev.social_media, instagram: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">TikTok</label>
              <Input
                placeholder="https://tiktok.com/@campusconnect"
                value={settings.social_media.tiktok}
                onChange={(e) => setSettings(prev => ({ 
                  ...prev, 
                  social_media: { ...prev.social_media, tiktok: e.target.value }
                }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">v1.0.0</div>
              <div className="text-sm text-gray-600">Current Version</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
