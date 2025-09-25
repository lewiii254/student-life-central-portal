import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Gift, 
  Share2, 
  Copy, 
  MessageCircle,
  Trophy,
  Star,
  Coins
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const ReferralSystem = () => {
  const { user } = useAuth();
  const [referralCode] = useState(`CC${user?.id?.slice(0, 6).toUpperCase() || 'DEMO'}`);
  
  const referralStats = {
    totalReferrals: 8,
    successfulReferrals: 5,
    pendingReferrals: 3,
    totalEarnings: 250,
    currentLevel: 'Bronze Referrer'
  };

  const recentReferrals = [
    { name: 'John M.', status: 'completed', reward: 50, date: '2 days ago' },
    { name: 'Sarah K.', status: 'pending', reward: 50, date: '1 week ago' },
    { name: 'Mike O.', status: 'completed', reward: 50, date: '2 weeks ago' }
  ];

  const referralLevels = [
    { name: 'Bronze Referrer', min: 0, max: 4, reward: 50, current: true },
    { name: 'Silver Referrer', min: 5, max: 9, reward: 75, current: false },
    { name: 'Gold Referrer', min: 10, max: 19, reward: 100, current: false },
    { name: 'Campus Ambassador', min: 20, max: Infinity, reward: 150, current: false }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied to clipboard!');
  };

  const shareViaWhatsApp = () => {
    const message = `Hey! 👋 Check out Campus Connect - the ultimate student platform for Meru University! 

🎓 Find accommodation, order study materials, get fast delivery, rent bicycles, and discover campus events - all in one place!

Use my referral code: ${referralCode} when you sign up and we both get KES 50 credit! 💰

Download now: https://campusconnect.co.ke

#MeruUniversity #CampusConnect #StudentLife`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="space-y-6">
      {/* Referral Overview */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Refer & Earn! 💰</h3>
              <p className="text-purple-100 mb-4">
                Invite your comrades and earn KES 50 for each successful referral
              </p>
              <Badge className="bg-white/20 text-white">
                {referralStats.currentLevel}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎁</div>
              <div className="text-2xl font-bold">KES {referralStats.totalEarnings}</div>
              <div className="text-sm text-purple-100">Total Earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="h-5 w-5 text-blue-500" />
            <span>Your Referral Code</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input 
                value={referralCode} 
                readOnly 
                className="font-mono text-lg text-center bg-gray-50"
              />
              <Button onClick={copyReferralCode} variant="outline">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button 
                onClick={shareViaWhatsApp}
                className="bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Share via WhatsApp
              </Button>
              <Button 
                onClick={() => {
                  const url = `https://campusconnect.co.ke?ref=${referralCode}`;
                  navigator.clipboard.writeText(url);
                  toast.success('Referral link copied!');
                }}
                variant="outline"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-gray-900">{referralStats.totalReferrals}</div>
          <div className="text-sm text-gray-600">Total Referrals</div>
        </Card>
        
        <Card className="text-center p-4">
          <Trophy className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold text-gray-900">{referralStats.successfulReferrals}</div>
          <div className="text-sm text-gray-600">Successful</div>
        </Card>
        
        <Card className="text-center p-4">
          <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
          <div className="text-2xl font-bold text-gray-900">{referralStats.pendingReferrals}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </Card>
        
        <Card className="text-center p-4">
          <Coins className="h-8 w-8 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold text-gray-900">KES {referralStats.totalEarnings}</div>
          <div className="text-sm text-gray-600">Earned</div>
        </Card>
      </div>

      {/* Referral Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <span>Referral Levels</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {referralLevels.map((level, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  level.current 
                    ? 'border-yellow-300 bg-yellow-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-semibold ${level.current ? 'text-yellow-800' : 'text-gray-700'}`}>
                      {level.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {level.min}-{level.max === Infinity ? '∞' : level.max} referrals
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">KES {level.reward}</div>
                    <div className="text-xs text-gray-500">per referral</div>
                  </div>
                  {level.current && (
                    <Badge className="bg-yellow-500 text-white">Current</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReferrals.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{referral.name}</div>
                  <div className="text-sm text-gray-600">{referral.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600">+KES {referral.reward}</div>
                  <Badge className={getStatusColor(referral.status)}>
                    {referral.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};