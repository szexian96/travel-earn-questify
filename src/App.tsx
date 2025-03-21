
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Quests from "./pages/Quests";
import QuestDetails from "./pages/QuestDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import ModelRoutes from "./pages/ModelRoutes";
import ModelRouteDetails from "./pages/ModelRouteDetails";
import Passport from "./pages/Passport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/quests/:id" element={<QuestDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:id" element={<StoryDetail />} />
              <Route path="/routes" element={<ModelRoutes />} />
              <Route path="/routes/:id" element={<ModelRouteDetails />} />
              <Route path="/passport" element={<Passport />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
