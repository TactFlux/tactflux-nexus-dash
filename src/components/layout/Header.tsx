
import React from 'react';
import { Bell, Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 w-full flex items-center justify-between animate-fade-in">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-400">Welcome back to TactFlux</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-tactflux-gray/50 border border-white/5 rounded-full py-2 px-10 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-tactflux-turquoise/50"
          />
        </div>

        <button className="rounded-full p-2 bg-tactflux-gray/50 border border-white/5 hover:bg-tactflux-gray transition-all relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-tactflux-pink rounded-full text-[10px] flex items-center justify-center">3</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-tactflux-violet to-tactflux-pink rounded-full">
            {/* User avatar would go here */}
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">admin@tactflux.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
