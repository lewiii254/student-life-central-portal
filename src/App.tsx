
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RentalHelp from "./pages/RentalHelp";
import StudyEssentials from "./pages/StudyEssentials";
import HouseholdItems from "./pages/HouseholdItems";
import DeliveryServices from "./pages/DeliveryServices";
import BicycleRentals from "./pages/BicycleRentals";
import CampusEvents from "./pages/CampusEvents";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rental-help" element={<RentalHelp />} />
          <Route path="/study-essentials" element={<StudyEssentials />} />
          <Route path="/household-items" element={<HouseholdItems />} />
          <Route path="/delivery" element={<DeliveryServices />} />
          <Route path="/bicycle-rentals" element={<BicycleRentals />} />
          <Route path="/events" element={<CampusEvents />} />
          <Route path="/about" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
