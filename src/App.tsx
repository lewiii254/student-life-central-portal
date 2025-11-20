import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/contexts/CartContext";
import AuthGuard from "@/components/AuthGuard";
import ErrorBoundary from "@/components/ErrorBoundary";

// Eager load critical pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Lazy load less critical pages for better performance
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const RentalHelp = lazy(() => import("./pages/RentalHelp"));
const StudyEssentials = lazy(() => import("./pages/StudyEssentials"));
const Cart = lazy(() => import("./pages/Cart"));
const HouseholdItems = lazy(() => import("./pages/HouseholdItems"));
const DeliveryServices = lazy(() => import("./pages/DeliveryServices"));
const BicycleRentals = lazy(() => import("./pages/BicycleRentals"));
const CampusEvents = lazy(() => import("./pages/CampusEvents"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const SafetyGuidelines = lazy(() => import("./pages/SafetyGuidelines"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardPreview = lazy(() => import("./pages/DashboardPreview"));

// Loading component for lazy-loaded routes
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <Suspense fallback={<LoadingFallback />}>
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
              </Suspense>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
