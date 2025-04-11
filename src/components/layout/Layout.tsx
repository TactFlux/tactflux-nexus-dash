
import React, { useState, useEffect } from 'react';
import AppSidebar from './AppSidebar';
import Header from './Header';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [cssVars, setCssVars] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (user?.company) {
      const { primaryColor, accentColor } = user.company;
      
      // Set CSS variables for dynamic theming
      document.documentElement.style.setProperty('--company-primary', primaryColor || '#6E59A5');
      document.documentElement.style.setProperty('--company-accent', accentColor || '#1EAEDB');
      
      setCssVars({
        '--company-primary': primaryColor || '#6E59A5',
        '--company-accent': accentColor || '#1EAEDB',
      });
    }
  }, [user?.company]);
  
  return (
    <div 
      className="min-h-screen bg-background text-foreground"
      style={cssVars as React.CSSProperties}
    >
      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        
        {/* Mobile sidebar with Sheet component */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <AppSidebar />
            </SheetContent>
          </Sheet>
        </div>
        
        <main className="flex-1 min-h-screen w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <Header />
            {user?.company?.welcomeMessage && (
              <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-sm text-primary">{user.company.welcomeMessage}</p>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
