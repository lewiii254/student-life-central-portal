
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "@/components/AuthGuard";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import RentalHelp from "./pages/RentalHelp";
import StudyEssentials from "./pages/StudyEssentials";
import HouseholdItems from "./pages/HouseholdItems";
import DeliveryServices from "./pages/DeliveryServices";
import BicycleRentals from "./pages/BicycleRentals";
import CampusEvents from "./pages/CampusEvents";
import AboutUs from "./pages/AboutUs";
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
            <Route path="/" element={
              <AuthGuard>
                <Index />
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
            <Route path="/about" element={
              <AuthGuard>
                <AboutUs />
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
