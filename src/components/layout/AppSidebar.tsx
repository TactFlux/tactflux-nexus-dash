
import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Database,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ href, icon: Icon, label, isActive = false }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
        isActive 
          ? "bg-gradient-to-r from-tactflux-turquoise/20 to-tactflux-violet/20 text-white" 
          : "text-gray-400 hover:text-white hover:bg-white/5"
      )}
    >
      <Icon className={cn(
        "h-5 w-5 transition-all",
        isActive ? "text-tactflux-turquoise" : "text-gray-400 group-hover:text-tactflux-turquoise"
      )} />
      <span>{label}</span>
    </Link>
  );
};

const AppSidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-tactflux-black border-r border-white/5 flex flex-col z-10">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-tactflux-turquoise to-tactflux-violet w-8 h-8 rounded-md flex items-center justify-center">
            <span className="font-bold text-white text-lg">T</span>
          </div>
          <h1 className="font-bold text-xl text-white">TactFlux</h1>
        </div>
      </div>

      <div className="px-3 py-2">
        <p className="text-xs font-medium text-gray-500 uppercase px-3 py-2">Main Menu</p>
        <nav className="flex flex-col gap-1">
          <NavItem href="/" icon={LayoutDashboard} label="Dashboard" isActive />
          <NavItem href="/candidates" icon={Users} label="Candidates" />
          <NavItem href="/tests" icon={FileText} label="Test Modules" />
          <NavItem href="/analytics" icon={Database} label="Analytics" />
          <NavItem href="/settings" icon={Settings} label="Settings" />
        </nav>
      </div>

      <div className="mt-auto px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-400 cursor-pointer hover:bg-white/5 hover:text-white transition-all duration-200">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
