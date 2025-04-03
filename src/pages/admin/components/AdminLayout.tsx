
import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronsLeft, LayoutDashboard, Map, ScrollText, Users, MessageSquare, Bell, Settings, LogOut, MenuIcon, Share, Trophy, X, Home, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const { t } = useLanguage();

  // Using simple labels instead of translation keys for better readability
  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/quests', icon: <Trophy size={20} />, label: 'Quests' },
    { path: '/admin/stories', icon: <ScrollText size={20} />, label: 'Stories' },
    { path: '/admin/routes', icon: <Map size={20} />, label: 'Routes' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { path: '/admin/social', icon: <Share size={20} />, label: 'Social' },
    { path: '/admin/perks', icon: <Gift size={20} />, label: 'Perks' },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const NavItem = ({ path, label, icon }) => (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-secondary"
        )
      }
    >
      {icon}
      {!sidebarCollapsed && <span>{label}</span>}
    </NavLink>
  );

  return (
    <div className="flex h-screen bg-background">
      <aside
        className={cn(
          "hidden md:flex flex-col border-r transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="h-16 border-b flex items-center px-4">
          <h1 className={cn("font-bold", sidebarCollapsed ? "hidden" : "block")}>
            Tourii Admin
          </h1>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
            <ChevronsLeft className={cn("h-5 w-5 transition-transform", sidebarCollapsed && "rotate-180")} />
          </Button>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
          
          <Link 
            to="/"
            className="flex items-center gap-3 px-3 py-2 mt-4 rounded-md transition-colors text-primary hover:bg-secondary"
          >
            <Home size={20} />
            {!sidebarCollapsed && <span>Back to Site</span>}
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center px-4 justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={toggleMobileMenu}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <h1 className="font-bold ml-2 md:hidden">Tourii Admin</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>TA</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Back to Site</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
            <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-background shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-bold">Tourii Admin</h1>
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="space-y-2" role="navigation">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-secondary"
                      )
                    }
                    onClick={toggleMobileMenu}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                ))}
                
                <Link
                  to="/"
                  className="flex items-center gap-3 px-3 py-3 mt-4 rounded-md transition-colors text-primary hover:bg-secondary"
                  onClick={toggleMobileMenu}
                >
                  <Home size={20} />
                  <span>Back to Site</span>
                </Link>
              </nav>
            </div>
          </div>
        )}
        
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
