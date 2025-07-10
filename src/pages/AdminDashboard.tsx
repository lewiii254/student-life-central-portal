
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Home, 
  ShoppingCart, 
  Package, 
  Truck, 
  Bike, 
  Calendar, 
  MessageSquare, 
  Settings,
  LogOut,
  Bell,
  Plus,
  Eye,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { RentalManagement } from '@/components/admin/RentalManagement';
import { NerdyCart } from '@/components/admin/NerdyCart';
import { SettleBox } from '@/components/admin/SettleBox';
import { DeliveryServices } from '@/components/admin/DeliveryServices';
import { BicycleRentals } from '@/components/admin/BicycleRentals';
import { EventsAndAdverts } from '@/components/admin/EventsAndAdverts';
import { CustomerChat } from '@/components/admin/CustomerChat';
import { SiteSettings } from '@/components/admin/SiteSettings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'rental', label: 'Rental Management', icon: Home },
    { id: 'nerdy-cart', label: 'Nerdy Cart', icon: ShoppingCart },
    { id: 'settle-box', label: 'Settle Box', icon: Package },
    { id: 'delivery', label: 'Delivery Services', icon: Truck },
    { id: 'bicycles', label: 'Bicycle Rentals', icon: Bike },
    { id: 'events', label: 'Events & Adverts', icon: Calendar },
    { id: 'customers', label: 'Customers & Chat', icon: MessageSquare },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Campus Connect Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge variant="destructive" className="ml-2">3</Badge>
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm h-screen sticky top-0">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && <DashboardStats />}
          {activeTab === 'rental' && <RentalManagement />}
          {activeTab === 'nerdy-cart' && <NerdyCart />}
          {activeTab === 'settle-box' && <SettleBox />}
          {activeTab === 'delivery' && <DeliveryServices />}
          {activeTab === 'bicycles' && <BicycleRentals />}
          {activeTab === 'events' && <EventsAndAdverts />}
          {activeTab === 'customers' && <CustomerChat />}
          {activeTab === 'settings' && <SiteSettings />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
