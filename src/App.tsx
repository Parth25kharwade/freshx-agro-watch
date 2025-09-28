import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import FarmerManagement from "@/pages/FarmerManagement";
import SupplyChain from "@/pages/SupplyChain";
import Analytics from "@/pages/Analytics";
import Alerts from "@/pages/Alerts";
import Policy from "@/pages/Policy";
import UserManagement from "@/pages/UserManagement";
import Support from "@/pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="farmers" element={<FarmerManagement />} />
              <Route path="supply-chain" element={<SupplyChain />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="policy" element={<Policy />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="support" element={<Support />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
