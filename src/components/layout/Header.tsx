
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="h-16 w-full flex items-center justify-between animate-fade-in">
      <div className="flex-1">
        <p className="text-sm text-muted-foreground hidden md:block">Willkommen zurück bei TactFlux</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Suchen..." 
            className="bg-muted/50 border border-input rounded-full py-2 px-10 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>

        {isMobile && (
          <Button size="icon" variant="ghost" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
        )}

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full p-2 bg-muted/50 border border-input hover:bg-muted transition-all relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-tactflux-pink rounded-full text-[10px] flex items-center justify-center">3</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Benachrichtigungen</h3>
            </div>
            <div className="py-2">
              <DropdownMenuItem className="p-3 cursor-pointer focus:bg-muted">
                <div>
                  <p className="font-medium">Neuer Bewerber</p>
                  <p className="text-xs text-muted-foreground">Sarah Johnson hat sich beworben</p>
                  <p className="text-xs text-muted-foreground mt-1">Vor 2 Stunden</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer focus:bg-muted">
                <div>
                  <p className="font-medium">Test abgeschlossen</p>
                  <p className="text-xs text-muted-foreground">Michael Chen hat den Test abgeschlossen</p>
                  <p className="text-xs text-muted-foreground mt-1">Vor 5 Stunden</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer focus:bg-muted">
                <div>
                  <p className="font-medium">Systemwartung</p>
                  <p className="text-xs text-muted-foreground">Geplante Wartung am 15.04.2025</p>
                  <p className="text-xs text-muted-foreground mt-1">Vor 1 Tag</p>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

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
