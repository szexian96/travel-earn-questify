
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MainLayout from "./layouts/MainLayout";

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
import Explore from "./pages/Explore";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminLoginButton from "./components/AdminLoginButton";

const queryClient = new QueryClient();

// AnimatedRoutes component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout><Index /></MainLayout>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/quests" element={<MainLayout><Quests /></MainLayout>} />
        <Route path="/quests/:id" element={<MainLayout><QuestDetails /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
        <Route path="/stories" element={<MainLayout><Stories /></MainLayout>} />
        <Route path="/stories/:id" element={<MainLayout><StoryDetail /></MainLayout>} />
        <Route path="/routes" element={<MainLayout><ModelRoutes /></MainLayout>} />
        <Route path="/routes/:id" element={<MainLayout><ModelRouteDetails /></MainLayout>} />
        <Route path="/passport" element={<MainLayout><Passport /></MainLayout>} />
        <Route path="/explore" element={<MainLayout><Explore /></MainLayout>} />
        <Route path="/admin/*" element={<AdminPanel />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <div className="fixed bottom-4 right-4 z-50">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.3 }}
              >
                <AdminLoginButton />
              </motion.div>
            </div>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
