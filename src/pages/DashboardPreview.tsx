import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BudgetTracker } from '@/components/BudgetTracker';
import { WalletCard } from '@/components/WalletCard';
import { UpcomingDeadlines } from '@/components/UpcomingDeadlines';
import { SavedItems } from '@/components/SavedItems';
import { PersonalAnalytics } from '@/components/PersonalAnalytics';
import { NotificationsCenter } from '@/components/NotificationsCenter';
import { CalendarWidget } from '@/components/CalendarWidget';

const DashboardPreview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent mb-2">
            Enhanced Dashboard Components
          </h1>
          <p className="text-gray-600">Preview of all new dashboard functionality</p>
        </div>

        {/* Row 1: Budget Tracker and Wallet */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BudgetTracker />
          <WalletCard />
        </div>

        {/* Row 2: Personal Analytics */}
        <PersonalAnalytics />

        {/* Row 3: Notifications and Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NotificationsCenter />
          <UpcomingDeadlines />
        </div>

        {/* Row 4: Calendar and Saved Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CalendarWidget />
          <SavedItems />
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
