
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ScrollText, 
  Map, 
  Trophy, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import LanguageSelector from '@/components/LanguageSelector';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: t('nav.logout'),
      description: "You have been successfully logged out",
    });
  };

  const menuItems = [
    { 
      title: t('admin.dashboard'), 
      path: '/admin', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      title: t('admin.stories'), 
      path: '/admin/stories', 
      icon: <ScrollText className="h-5 w-5" /> 
    },
    { 
      title: t('admin.routes'), 
      path: '/admin/routes', 
      icon: <Map className="h-5 w-5" /> 
    },
    { 
      title: t('admin.quests'), 
      path: '/admin/quests', 
      icon: <Trophy className="h-5 w-5" /> 
    },
    { 
      title: t('admin.users'), 
      path: '/admin/users', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      title: t('admin.settings'), 
      path: '/admin/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-muted transition-all duration-300 flex flex-col z-50 shadow-md ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-4`}>
          {!isCollapsed && <span className="font-bold text-lg">Admin Panel</span>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <Separator />
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} rounded-md px-3 py-2 transition-colors ${
                    (location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))) 
                      ? 'bg-secondary text-secondary-foreground' 
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {!isCollapsed && <span className="ml-3">{item.title}</span>}
                  </div>
                  {!isCollapsed && (location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))) && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4">
          {!isCollapsed && (
            <div className="mb-3 flex justify-center">
              <LanguageSelector />
            </div>
          )}
          
          <Link to="/">
            <Button 
              variant="outline" 
              className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <>
                  <ChevronRight className="mr-2 h-4 w-4" />
                  {t('admin.backToSite')}
                </>
              )}
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            className={`w-full justify-start mt-2 text-red-500 hover:text-red-500 hover:bg-red-500/10 ${isCollapsed ? 'px-2' : ''}`}
            onClick={handleLogout}
          >
            {isCollapsed ? (
              <LogOut className="h-5 w-5" />
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                {t('nav.logout')}
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
        <main className="container mx-auto py-6 px-4 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
