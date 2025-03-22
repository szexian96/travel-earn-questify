
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useAdminLogin } from '@/utils/adminLogin';

const AdminLoginButton = () => {
  const { loginAsAdmin } = useAdminLogin();

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2 bg-background/80 border-muted-foreground/20 hover:bg-accent"
      onClick={loginAsAdmin}
    >
      <Shield className="h-4 w-4" />
      Admin Login
    </Button>
  );
};

export default AdminLoginButton;
