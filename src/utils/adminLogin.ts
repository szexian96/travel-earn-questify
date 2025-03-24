
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export const useAdminLogin = () => {
  // Get the auth context - this will throw an error if not within AuthProvider
  // so we need to handle this case properly
  let login;
  let authError = false;
  
  try {
    const auth = useAuth();
    login = auth.login;
  } catch (error) {
    authError = true;
    console.error("Auth context not available:", error);
  }

  const { toast } = useToast();

  const loginAsAdmin = async () => {
    if (authError) {
      toast({
        title: "Authentication Error",
        description: "Please refresh the page and try again",
        variant: "destructive"
      });
      return;
    }
    
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
