
import type React from 'react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronsLeft, LayoutDashboard, Map, ScrollText, Users, MessageSquare, Bell, Settings, LogOut, MenuIcon, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LanguageSelector from '@/components/LanguageSelector';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { t } = useLanguage();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const navItems = [
    { path: '/admin', label: t('admin.dashboard'), icon: <LayoutDashboard size={20} /> },
    { path: '/admin/quests', label: t('admin.quests'), icon: <Bell size={20} /> },
    { path: '/admin/stories', label: t('admin.stories'), icon: <ScrollText size={20} /> },
    { path: '/admin/routes', label: t('admin.routes'), icon: <Map size={20} /> },
    { path: '/admin/users', label: t('admin.users'), icon: <Users size={20} /> },
    { path: '/admin/social', label: t('admin.social'), icon: <Share size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for desktop */}
      <aside 
        className={cn(
          "fixed inset-y-0 z-50 bg-background border-r border-border transition-all duration-300 hidden md:flex md:flex-col",
          sidebarCollapsed ? "w-[70px]" : "w-[240px]"
        )}
      >
        <div className="flex items-center p-4 h-16 border-b border-border">
          <div className={cn("font-semibold text-lg flex items-center", sidebarCollapsed && "hidden")}>
            <span className="text-primary">Tourii</span>
            <span className="ml-1">Admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto", !sidebarCollapsed && "ml-auto")}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <ChevronsLeft 
              className={cn("transition-transform", sidebarCollapsed && "rotate-180")} 
              size={20} 
            />
          </Button>
        </div>
        
        <nav className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-secondary text-muted-foreground"
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className={cn(sidebarCollapsed && "hidden")}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="border-t border-border p-3">
          <div className={cn("flex items-center mb-3", sidebarCollapsed && "justify-center")}>
            <LanguageSelector className={cn(sidebarCollapsed && "w-full p-0")} />
          </div>
          <NavLink 
            to="/"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-600/10 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span className={cn(sidebarCollapsed && "hidden")}>Exit Admin</span>
          </NavLink>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-16 flex items-center px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-3"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon size={20} />
        </Button>
        <div className="font-semibold text-lg">
          <span className="text-primary">Tourii</span>
          <span className="ml-1">Admin</span>
        </div>
        <div className="ml-auto">
          <LanguageSelector />
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-background border-r border-border p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="font-semibold text-lg">
                <span className="text-primary">Tourii</span>
                <span className="ml-1">Admin</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <ChevronsLeft size={20} />
              </Button>
            </div>
            
            <nav>
              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => cn(
                        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-secondary text-muted-foreground"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink 
                    to="/"
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-600/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogOut size={20} className="mr-3" />
                    <span>Exit Admin</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          
          <div 
            className="fixed inset-0 bg-transparent" 
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        </div>
      )}
      
      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-auto transition-all duration-300 p-4 pb-16 md:p-8",
        "md:ml-[240px]",
        sidebarCollapsed && "md:ml-[70px]"
      )}>
        <div className="md:hidden h-16"></div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
