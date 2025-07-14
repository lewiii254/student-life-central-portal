
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  GraduationCap,
  Edit3,
  Save,
  Star,
  Heart,
  Sparkles,
  Trophy,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    course: '',
    year: '',
    location: ''
  });

  useEffect(() => {
    if (user?.user_metadata) {
      setProfileData({
        firstName: user.user_metadata.first_name || '',
        lastName: user.user_metadata.last_name || '',
        phone: user.user_metadata.phone || '',
        course: user.user_metadata.course || '',
        year: user.user_metadata.year || '',
        location: user.user_metadata.location || ''
      });
    }
  }, [user]);

  const handleSave = () => {
    // In a real app, you'd update the user profile here
    toast({
      title: "Profile Updated! ✨",
      description: "Your comrade profile has been updated successfully!",
    });
    setIsEditing(false);
  };

  const userInitials = user?.email 
    ? user.email.substring(0, 2).toUpperCase()
    : 'CC';

  const stats = [
    { label: 'Orders', value: '12', icon: Trophy, color: 'text-purple-600' },
    { label: 'Rentals', value: '3', icon: Heart, color: 'text-green-600' },
    { label: 'Events', value: '8', icon: Star, color: 'text-yellow-600' },
    { label: 'Reviews', value: '25', icon: Sparkles, color: 'text-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-purple-600 hover:text-purple-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-purple-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                Comrade Profile
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <Card className="mb-8 overflow-hidden border-0 shadow-xl bg-gradient-to-r from-purple-600 to-green-600 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white/20">
                  <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">
                  {profileData.firstName || profileData.lastName 
                    ? `${profileData.firstName} ${profileData.lastName}` 
                    : 'Comrade Student'} 🎓
                </h2>
                <p className="text-white/80 text-lg mb-1">{user?.email}</p>
                {profileData.course && (
                  <p className="text-white/70">
                    {profileData.course} {profileData.year && `• Year ${profileData.year}`}
                  </p>
                )}
                <div className="flex justify-center md:justify-start mt-4">
                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                    ⭐ Active Comrade
                  </span>
                </div>
              </div>

              <Button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                size="lg"
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="text-center p-4 hover:shadow-lg transition-shadow border-0 shadow-md">
                <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-purple-600" />
                <span>Personal Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Label>
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-50"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone</span>
                </Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                  placeholder="+254 7XX XXX XXX"
                />
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                <span>Academic Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="course">Course/Program</Label>
                <Input
                  id="course"
                  value={profileData.course}
                  onChange={(e) => setProfileData({...profileData, course: e.target.value})}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                  placeholder="e.g., Computer Science"
                />
              </div>
              
              <div>
                <Label htmlFor="year" className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Year of Study</span>
                </Label>
                <Input
                  id="year"
                  value={profileData.year}
                  onChange={(e) => setProfileData({...profileData, year: e.target.value})}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                  placeholder="e.g., 3"
                />
              </div>
              
              <div>
                <Label htmlFor="location" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Campus Location</span>
                </Label>
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  disabled={!isEditing}
                  className={!isEditing ? "bg-gray-50" : ""}
                  placeholder="e.g., Hostels A-Block"
                />
              </div>

              <div className="pt-4">
                <div className="bg-gradient-to-r from-purple-100 to-green-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Campus Connect Member Since</h4>
                  <p className="text-gray-700">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently joined'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {isEditing && (
          <div className="mt-8 flex justify-center space-x-4">
            <Button onClick={handleSave} size="lg" className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline" size="lg">
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
