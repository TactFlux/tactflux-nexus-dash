
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { LockKeyhole, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Check admin credentials (in a real app, this would be done server-side)
    if (email === 'liam.ts@icloud.com' && password === 'hesk-hueu-jrjd') {
      // Set authentication in local storage
      localStorage.setItem('tactflux-admin', JSON.stringify({ isAdmin: true }));
      
      // Show success message
      toast({
        title: "Login successful",
        description: "Welcome to TactFlux Admin Dashboard",
      });

      // Navigate to dashboard
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tactflux-black text-white flex items-center justify-center">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet w-10 h-10 rounded-md flex items-center justify-center">
              <span className="font-bold text-white text-xl">T</span>
            </div>
            <h1 className="font-bold text-3xl">TactFlux</h1>
          </div>
          <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
          <p className="text-gray-400">Enter your credentials to access the admin dashboard</p>
        </div>
        
        <div className="bg-tactflux-gray p-8 rounded-xl border border-white/5 shadow-card">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tactflux.com"
                  className="pl-10 bg-tactflux-black border-white/10 focus:border-tactflux-turquoise focus:ring-tactflux-turquoise"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="pl-10 bg-tactflux-black border-white/10 focus:border-tactflux-turquoise focus:ring-tactflux-turquoise"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet hover:opacity-90 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Log In"}
            </Button>
          </form>
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} TactFlux. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
