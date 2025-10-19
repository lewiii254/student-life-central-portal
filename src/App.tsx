
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/contexts/CartContext";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import RentalHelp from "./pages/RentalHelp";
import StudyEssentials from "./pages/StudyEssentials";
import Cart from "./pages/Cart";
import HouseholdItems from "./pages/HouseholdItems";
import DeliveryServices from "./pages/DeliveryServices";
import BicycleRentals from "./pages/BicycleRentals";
import CampusEvents from "./pages/CampusEvents";
import AboutUs from "./pages/AboutUs";
import HowItWorks from "./pages/HowItWorks";
import SafetyGuidelines from "./pages/SafetyGuidelines";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HelpCenter from "./pages/HelpCenter";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import DashboardPreview from "./pages/DashboardPreview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/safety-guidelines" element={<SafetyGuidelines />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/profile" element={
                <AuthGuard>
                  <Profile />
                </AuthGuard>
              } />
              <Route path="/settings" element={
                <AuthGuard>
                  <Settings />
                </AuthGuard>
              } />
              <Route path="/rental-help" element={
                <AuthGuard>
                  <RentalHelp />
                </AuthGuard>
              } />
              <Route path="/study-essentials" element={
                <AuthGuard>
                  <StudyEssentials />
                </AuthGuard>
              } />
              <Route path="/cart" element={
                <AuthGuard>
                  <Cart />
                </AuthGuard>
              } />
              <Route path="/household-items" element={
                <AuthGuard>
                  <HouseholdItems />
                </AuthGuard>
              } />
              <Route path="/delivery" element={
                <AuthGuard>
                  <DeliveryServices />
                </AuthGuard>
              } />
              <Route path="/bicycle-rentals" element={
                <AuthGuard>
                  <BicycleRentals />
                </AuthGuard>
              } />
              <Route path="/events" element={
                <AuthGuard>
                  <CampusEvents />
                </AuthGuard>
              } />
              <Route path="/admin" element={
                <AuthGuard>
                  <AdminDashboard />
                </AuthGuard>
              } />
              <Route path="/dashboard" element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } />
              <Route path="/dashboard-preview" element={<DashboardPreview />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
