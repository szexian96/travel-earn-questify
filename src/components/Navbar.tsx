
import type React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LanguageSelector from '@/components/LanguageSelector';
import { 
  Home, 
  Map, 
  Trophy, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  ScrollText,
  Compass,
  Shield
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const handleLogout = () => {
    logout();
    toast({
      title: t('nav.logout'),
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const isAdmin = user?.username === 'admin' || user?.email === 'admin@questify.com';

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
            <span className="font-bold text-xl">Tourii</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/quests"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.includes('/quests') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              {t('nav.quests')}
            </Link>
            <Link 
              to="/stories"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.includes('/stories') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              {t('nav.stories')}
            </Link>
            <Link 
              to="/routes"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.includes('/routes') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              {t('nav.routes')}
            </Link>
            <Link 
              to="/explore"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname.includes('/explore') ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              {t('nav.explore')}
            </Link>
            {isAuthenticated && (
              <Link 
                to="/passport"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/passport') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {t('nav.passport')}
              </Link>
            )}
            {isAdmin && (
              <Link 
                to="/admin"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes('/admin') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {t('nav.admin')}
              </Link>
            )}
          </nav>

          {/* Auth Buttons / User Menu / Language Selector */}
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            
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
                      <span>{t('nav.profile')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/quests" className="flex cursor-pointer items-center">
                      <Map className="mr-2 h-4 w-4" />
                      <span>{t('nav.myQuests')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/passport" className="flex cursor-pointer items-center">
                      <ScrollText className="mr-2 h-4 w-4" />
                      <span>{t('nav.passport')}</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex cursor-pointer items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>{t('nav.admin')}</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex cursor-pointer items-center text-red-500 focus:text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('nav.logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" size="sm" className="rounded-full">
                <Link to="/auth">{t('nav.signin')}</Link>
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
                  <span>{t('nav.home')}</span>
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
                  <span>{t('nav.quests')}</span>
                </div>
              </Link>
              <Link 
                to="/stories"
                className={`p-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${
                  location.pathname.includes('/stories') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <ScrollText className="h-5 w-5" />
                  <span>{t('nav.stories')}</span>
                </div>
              </Link>
              <Link 
                to="/routes"
                className={`p-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${
                  location.pathname.includes('/routes') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Trophy className="h-5 w-5" />
                  <span>{t('nav.routes')}</span>
                </div>
              </Link>
              <Link 
                to="/explore"
                className={`p-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${
                  location.pathname.includes('/explore') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Compass className="h-5 w-5" />
                  <span>{t('nav.explore')}</span>
                </div>
              </Link>
              {isAuthenticated && (
                <>
                  <Link 
                    to="/profile"
                    className={`p-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${
                      location.pathname.includes('/profile') ? 'text-primary' : 'text-foreground/80'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5" />
                      <span>{t('nav.profile')}</span>
                    </div>
                  </Link>
                  <Link 
                    to="/passport"
                    className={`p-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${
                      location.pathname.includes('/passport') ? 'text-primary' : 'text-foreground/80'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <ScrollText className="h-5 w-5" />
                      <span>{t('nav.passport')}</span>
                    </div>
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link 
                  to="/admin"
                  className={`p-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary ${
                    location.pathname.includes('/admin') ? 'text-primary' : 'text-foreground/80'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5" />
                    <span>{t('nav.admin')}</span>
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
