
import React from 'react';
import Navbar from '@/components/Navbar';
import { Toaster } from "@/components/ui/toaster";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Github, Twitter } from 'lucide-react';

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
      
      <footer className="py-6 border-t border-border/40 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tourii. All rights reserved.
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" />
                <span>Terms & Privacy</span>
              </Link>
              
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Github className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
              
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Twitter className="h-3.5 w-3.5" />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default MainLayout;
