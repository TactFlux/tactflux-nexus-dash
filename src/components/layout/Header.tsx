
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Header = () => {
  return (
    <header className="h-16 w-full flex items-center justify-between animate-fade-in">
      <div className="flex-1 flex items-center">
        <div className="relative w-10 h-10">
          <img 
            src="/lovable-uploads/79b93f56-97fe-416b-9625-4bf78b87f33f.png" 
            alt="TactFlux Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-sm text-muted-foreground ml-3">Willkommen zurück bei TactFlux</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Suchen..." 
            className="bg-muted/50 border border-input rounded-full py-2 px-10 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        <ThemeToggle />

        <button className="rounded-full p-2 bg-muted/50 border border-input hover:bg-muted transition-all relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-tactflux-pink rounded-full text-[10px] flex items-center justify-center">3</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-tactflux-violet to-tactflux-pink rounded-full">
            {/* User avatar would go here */}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">admin@tactflux.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
