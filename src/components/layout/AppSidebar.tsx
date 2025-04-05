
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

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
          : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
      )}
    >
      <Icon className={cn(
        "h-5 w-5 transition-all",
        isActive ? "text-tactflux-turquoise" : "text-muted-foreground group-hover:text-tactflux-turquoise"
      )} />
      <span>{label}</span>
    </Link>
  );
};

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const pathname = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('tactflux-admin');
    toast({
      title: "Erfolgreich abgemeldet",
      description: "Du wurdest vom Admin-Dashboard abgemeldet",
    });
    navigate('/login');
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-10">
      <div className="p-6 flex justify-start">
        <div className="relative w-36 h-36">
          <img 
            src="/lovable-uploads/79b93f56-97fe-416b-9625-4bf78b87f33f.png" 
            alt="TactFlux Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="px-3 py-2">
        <p className="text-xs font-medium text-muted-foreground uppercase px-3 py-2">Admin Menü</p>
        <nav className="flex flex-col gap-1">
          <NavItem href="/" icon={LayoutDashboard} label="Dashboard" isActive={pathname === '/'} />
          <NavItem href="/candidates" icon={Users} label="Bewerber" isActive={pathname === '/candidates'} />
          <NavItem href="/simulations" icon={FileText} label="Simulationen" isActive={pathname === '/simulations'} />
          <NavItem href="/statistics" icon={PieChart} label="Statistiken" isActive={pathname === '/statistics'} />
          <NavItem href="/settings" icon={Settings} label="Einstellungen" isActive={pathname === '/settings'} />
        </nav>
      </div>

      <div className="mt-auto px-3 py-4 border-t border-sidebar-border">
        <div 
          className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground cursor-pointer hover:bg-muted/20 hover:text-foreground transition-all duration-200"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Abmelden</span>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
