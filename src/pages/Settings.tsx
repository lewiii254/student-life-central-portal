
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Bell, 
  Shield, 
  Smartphone, 
  Mail, 
  Lock, 
  Trash2, 
  Save,
  Camera,
  MapPin,
  GraduationCap,
  Phone
} from 'lucide-react';

const Settings = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    email: user?.email || '',
    phone: user?.user_metadata?.phone || '',
    university: user?.user_metadata?.university || 'Meru University',
    course: user?.user_metadata?.course || '',
    year: user?.user_metadata?.year || '',
    location: user?.user_metadata?.location || ''
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    rentalAlerts: true,
    studyReminders: true,
    eventUpdates: true,
    promotions: false
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showLocation: true,
    showContact: false,
    dataCollection: true
  });

  const handleProfileUpdate = () => {
    // In a real app, this would update the user profile
    toast({
      title: "Profile Updated! 🎉",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Notification Settings Updated! 🔔",
      description: "Your notification preferences have been saved.",
    });
  };

  const handlePrivacyUpdate = () => {
    toast({
      title: "Privacy Settings Updated! 🔒",
      description: "Your privacy preferences have been updated.",
    });
  };

  const handleAccountDeletion = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Please contact support to complete account deletion.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Settings ⚙️
          </h1>
          <p className="text-gray-600">Customize your MeruConnect experience</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
              </CardTitle>
              <CardDescription className="text-purple-100">
                Manage your personal information and profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="mt-1 bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="mt-1"
                    placeholder="0712345678"
                  />
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Input
                    id="course"
                    value={profileData.course}
                    onChange={(e) => setProfileData({...profileData, course: e.target.value})}
                    className="mt-1"
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Year of Study</Label>
                  <Input
                    id="year"
                    value={profileData.year}
                    onChange={(e) => setProfileData({...profileData, year: e.target.value})}
                    className="mt-1"
                    placeholder="3rd Year"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  className="mt-1"
                  placeholder="Maskan, Meru"
                />
              </div>
              <Button onClick={handleProfileUpdate} className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Save className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-blue-100">
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-600">Browser notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, pushNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Text message alerts</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, smsNotifications: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Rental Alerts</p>
                    <p className="text-sm text-gray-600">New rental opportunities</p>
                  </div>
                  <Switch
                    checked={notifications.rentalAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, rentalAlerts: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Study Reminders</p>
                    <p className="text-sm text-gray-600">Study material updates</p>
                  </div>
                  <Switch
                    checked={notifications.studyReminders}
                    onCheckedChange={(checked) => setNotifications({...notifications, studyReminders: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Event Updates</p>
                    <p className="text-sm text-gray-600">Campus events and activities</p>
                  </div>
                  <Switch
                    checked={notifications.eventUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, eventUpdates: checked})}
                  />
                </div>
              </div>
              
              <Button onClick={handleNotificationUpdate} className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
              <CardDescription className="text-green-100">
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label>Profile Visibility</Label>
                  <div className="flex gap-2 mt-2">
                    <Badge 
                      variant={privacy.profileVisibility === 'public' ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setPrivacy({...privacy, profileVisibility: 'public'})}
                    >
                      Public
                    </Badge>
                    <Badge 
                      variant={privacy.profileVisibility === 'students' ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setPrivacy({...privacy, profileVisibility: 'students'})}
                    >
                      Students Only
                    </Badge>
                    <Badge 
                      variant={privacy.profileVisibility === 'private' ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setPrivacy({...privacy, profileVisibility: 'private'})}
                    >
                      Private
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Location</p>
                    <p className="text-sm text-gray-600">Display your location in profile</p>
                  </div>
                  <Switch
                    checked={privacy.showLocation}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showLocation: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Contact Info</p>
                    <p className="text-sm text-gray-600">Allow other students to see your contact</p>
                  </div>
                  <Switch
                    checked={privacy.showContact}
                    onCheckedChange={(checked) => setPrivacy({...privacy, showContact: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Collection</p>
                    <p className="text-sm text-gray-600">Help improve our services</p>
                  </div>
                  <Switch
                    checked={privacy.dataCollection}
                    onCheckedChange={(checked) => setPrivacy({...privacy, dataCollection: checked})}
                  />
                </div>
              </div>

              <Button onClick={handlePrivacyUpdate} className="mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <Save className="w-4 h-4 mr-2" />
                Update Privacy Settings
              </Button>
            </CardContent>
          </Card>

          {/* Account Management */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Account Management
              </CardTitle>
              <CardDescription className="text-red-100">
                Manage your account settings and security
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Account Status</h4>
                  <p className="text-yellow-700">Your account is active and verified ✅</p>
                  <p className="text-sm text-yellow-600 mt-1">Member since: {new Date(user?.created_at || '').toLocaleDateString()}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Update Email
                  </Button>
                </div>

                <Separator />

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Danger Zone</h4>
                  <p className="text-red-700 text-sm mb-3">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleAccountDeletion}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800">MeruConnect v1.0</h4>
                <p className="text-sm text-gray-600">
                  Made with ❤️ for Meru University Students
                </p>
                <div className="flex justify-center gap-4 text-sm text-gray-500">
                  <a href="/terms-of-service" className="hover:text-purple-600">Terms</a>
                  <a href="/privacy-policy" className="hover:text-purple-600">Privacy</a>
                  <a href="/help-center" className="hover:text-purple-600">Support</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
