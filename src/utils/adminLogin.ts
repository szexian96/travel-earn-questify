
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useAdminLogin = () => {
  const { login } = useAuth();
  const { toast } = useToast();

  const loginAsAdmin = async () => {
    try {
      await login('google');
      // Update the user in localStorage to have admin credentials
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.username = 'admin';
      user.email = 'admin@questify.com';
      localStorage.setItem('user', JSON.stringify(user));
      
      toast({
        title: "Admin Login Successful",
        description: "You are now logged in as an admin",
      });
      
      // Force a page reload to update auth state
      window.location.href = '/admin';
    } catch (error) {
      console.error("Admin login failed:", error);
      toast({
        title: "Login Failed",
        description: "Could not log in as admin",
        variant: "destructive"
      });
    }
  };

  return { loginAsAdmin };
};
