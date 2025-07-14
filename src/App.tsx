
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import RentalHelp from "./pages/RentalHelp";
import StudyEssentials from "./pages/StudyEssentials";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
