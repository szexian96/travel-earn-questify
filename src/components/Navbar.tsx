
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  Map, 
  Trophy, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm dark:bg-background/80' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-opacity hover:opacity-90"
          >
            <Sparkles className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl">Questify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/quests"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.includes('/quests') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Quests
            </Link>
            <Link 
              to="/rewards"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.includes('/rewards') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Rewards
            </Link>
            <Link 
              to="/explore"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.includes('/explore') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Explore
            </Link>
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full p-0">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarImage src={user?.avatar} alt={user?.username} />
                        <AvatarFallback>{user?.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:inline font-medium">{user?.username}</span>
                      <ChevronDown className="h-4 w-4 opacity-60" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 backdrop-blur-lg bg-white/90 dark:bg-background/90">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.points} points
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex cursor-pointer items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/quests" className="flex cursor-pointer items-center">
                      <Map className="mr-2 h-4 w-4" />
                      <span>My Quests</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/rewards" className="flex cursor-pointer items-center">
                      <Trophy className="mr-2 h-4 w-4" />
                      <span>Rewards</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex cursor-pointer items-center text-red-500 focus:text-red-500"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" size="sm" className="rounded-full">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-background shadow-md animate-slide-down">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3 pb-3">
              <Link 
                to="/"
                className={`p-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${
                  location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </div>
              </Link>
              <Link 
                to="/quests"
                className={`p-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${
                  location.pathname.includes('/quests') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Map className="h-5 w-5" />
                  <span>Quests</span>
                </div>
              </Link>
              <Link 
                to="/rewards"
                className={`p-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${
                  location.pathname.includes('/rewards') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Trophy className="h-5 w-5" />
                  <span>Rewards</span>
                </div>
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/profile"
                  className={`p-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${
                    location.pathname.includes('/profile') ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </div>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
