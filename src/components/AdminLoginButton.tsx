
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useAdminLogin } from '@/utils/adminLogin';
import { motion } from 'framer-motion';

const AdminLoginButton = () => {
  const { loginAsAdmin } = useAdminLogin();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2 bg-background/80 backdrop-blur border-muted-foreground/20 hover:bg-accent"
        onClick={loginAsAdmin}
      >
        <motion.div
          animate={{ 
            rotate: [0, 0, 10, -10, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatDelay: 4,
          }}
        >
          <Shield className="h-4 w-4" />
        </motion.div>
        <span>Admin Login</span>
      </Button>
    </motion.div>
  );
};

export default AdminLoginButton;
