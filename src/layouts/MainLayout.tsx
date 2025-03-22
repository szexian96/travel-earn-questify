
import React from 'react';
import Navbar from '@/components/Navbar';
import { Toaster } from "@/components/ui/toaster";
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-grow pt-16 sm:pt-20"
      >
        {children}
      </motion.main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
