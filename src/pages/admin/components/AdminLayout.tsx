
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Route, 
  ScrollText, 
  Users, 
  MessageSquare, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu
} from 'lucide-react';

import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';

const AdminLayout: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const { logout } = useAuth();

  const navItems = [
    { label: t('admin.dashboard'), path: '/admin', icon: LayoutDashboard },
    { label: t('admin.routes'), path: '/admin/routes', icon: Route },
    { label: t('admin.stories'), path: '/admin/stories', icon: ScrollText },
    { label: t('admin.users'), path: '/admin/users', icon: Users },
    { label: t('admin.social'), path: '/admin/social', icon: MessageSquare },
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const Sidebar = () => (
    <aside className={cn(
      "h-screen bg-card border-r flex flex-col transition-all duration-300 z-20",
      isCollapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className={cn("font-semibold transition-opacity", 
          isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
        )}>
          {t('admin.title')}
        </h1>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50",
                )}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className={cn(
                  "ml-3 transition-opacity duration-200",
                  isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                )}>
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t mt-auto">
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start text-muted-foreground hover:text-foreground",
            isCollapsed && "justify-center px-0"
          )}
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className={cn(
            "ml-3", 
            isCollapsed ? "hidden" : "block"
          )}>
            {t('admin.logout')}
          </span>
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {isMobile ? (
        <>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[240px]">
              <Sidebar />
            </SheetContent>
          </Sheet>
          <main className="flex-1 overflow-y-auto pt-16 px-4 pb-4">
            <div className="absolute top-4 right-4">
              <LanguageSelector />
            </div>
            <Outlet />
          </main>
        </>
      ) : (
        <>
          <Sidebar />
          <main className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 relative",
            isCollapsed ? "ml-[70px]" : "ml-[240px]"
          )}>
            <div className="p-6">
              <div className="absolute top-6 right-6">
                <LanguageSelector />
              </div>
              <Outlet />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default AdminLayout;
