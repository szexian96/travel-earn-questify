
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const AuthButtons: React.FC = () => {
  const { login, isLoading } = useAuth();

  const handleAuth = async (provider: 'discord' | 'twitter' | 'google' | 'wallet') => {
    await login(provider);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3 w-full max-w-sm">
        <Button disabled className="w-full py-6">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3 w-full max-w-sm animate-fade-in">
      <Button 
        variant="outline" 
        className="w-full py-6 flex items-center justify-center gap-3 border-2 hover:bg-secondary hover:border-primary/20"
        onClick={() => handleAuth('google')}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="w-5 h-5"
        >
          <path 
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="#4285F4"
          />
        </svg>
        <span>Continue with Google</span>
      </Button>

      <Button 
        variant="outline" 
        className="w-full py-6 flex items-center justify-center gap-3 border-2 hover:bg-secondary hover:border-primary/20"
        onClick={() => handleAuth('discord')}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="w-5 h-5"
        >
          <path 
            d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"
            fill="#5865F2"
          />
        </svg>
        <span>Continue with Discord</span>
      </Button>

      <Button 
        variant="outline" 
        className="w-full py-6 flex items-center justify-center gap-3 border-2 hover:bg-secondary hover:border-primary/20"
        onClick={() => handleAuth('twitter')}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          className="w-5 h-5"
        >
          <path 
            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
            fill="#1DA1F2"
          />
        </svg>
        <span>Continue with Twitter</span>
      </Button>

      <Button 
        variant="outline" 
        className="w-full py-6 flex items-center justify-center gap-3 border-2 hover:bg-secondary hover:border-primary/20"
        onClick={() => handleAuth('wallet')}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-5 h-5"
        >
          <path d="M19 7H9c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
          <path d="M3 5a2 2 0 0 1 2-2h2v4H5a2 2 0 0 1-2-2z" />
          <path d="M7 11h.01" />
        </svg>
        <span>Continue with Wallet</span>
      </Button>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        By continuing, you agree to our
        <a href="#" className="text-foreground hover:text-primary ml-1 underline">Terms of Service</a>
        {' and '}
        <a href="#" className="text-foreground hover:text-primary underline">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default AuthButtons;
