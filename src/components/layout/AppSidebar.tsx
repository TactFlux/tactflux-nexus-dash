
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  PieChart,
  BarChart,
  Key,
  Building,
  UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useUserTier } from '@/contexts/UserTierContext';
import { useAuth } from '@/hooks/useAuth';
import PlanFeature from '@/components/tier/PlanFeature';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isEnterpriseOnly?: boolean;
  isProOnly?: boolean;
  isAdminOnly?: boolean;
}

const NavItem = ({ 
  href, 
  icon: Icon, 
  label, 
  isActive = false, 
  isEnterpriseOnly = false,
  isProOnly = false,
  isAdminOnly = false
}: NavItemProps) => {
  const { isEnterprise } = useUserTier();
  const { user } = useAuth();
  
  const userPlan = user?.company?.plan || 'free';
  const hasProAccess = userPlan === 'pro' || userPlan === 'enterprise';
  const hasEnterpriseAccess = userPlan === 'enterprise';
  const isAdmin = user?.role === 'admin';
  
  if (isEnterpriseOnly && !hasEnterpriseAccess) {
    return null;
  }
  
  if (isProOnly && !hasProAccess) {
    return null;
  }
  
  if (isAdminOnly && !isAdmin) {
    return null;
  }
  
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-200 group min-h-[44px]",
        isActive 
          ? "bg-gradient-to-r from-[var(--company-primary)]/20 to-[var(--company-accent)]/20 text-white border-l-4 border-[var(--company-primary)]" 
          : "text-muted-foreground hover:text-foreground hover:bg-[var(--company-accent)]/10"
      )}
    >
      <Icon className={cn(
        "h-5 w-5 transition-all shrink-0",
        isActive ? "text-[var(--company-primary)]" : "text-muted-foreground group-hover:text-[var(--company-primary)]"
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
  const { isEnterprise } = useUserTier();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('tactflux-admin');
    toast({
      title: "Erfolgreich abgemeldet",
      description: "Du wurdest vom Admin-Dashboard abgemeldet",
    });
    navigate('/login');
  };

  const companyLogo = user?.company?.logoUrl || "/lovable-uploads/79b93f56-97fe-416b-9625-4bf78b87f33f.png";
  const { userRole } = useUserTier();

  return (
    <aside className="h-full w-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 flex flex-col items-start justify-start">
        <div className="relative w-40 h-16 mb-2">
          <img 
            src={companyLogo} 
            alt="Company Logo" 
            className="w-full h-full object-contain object-left"
          />
        </div>
        <div className={cn(
          "text-xs font-medium uppercase px-2 py-1 rounded-md",
          userRole === 'basic' && "bg-blue-100 text-blue-800",
          userRole === 'pro' && "bg-purple-100 text-purple-800",
          userRole === 'enterprise' && "bg-green-100 text-green-800"
        )}>
          {userRole === 'basic' && 'Basic Plan'}
          {userRole === 'pro' && 'Pro Plan'}
          {userRole === 'enterprise' && 'Enterprise Plan'}
        </div>
      </div>

      <div className="px-3 py-2 overflow-y-auto flex-1">
        <nav className="flex flex-col gap-1">
          <NavItem href="/" icon={LayoutDashboard} label="Dashboard" isActive={pathname === '/'} />
          <NavItem href="/candidates" icon={Users} label="Bewerber" isActive={pathname === '/candidates'} />
          <NavItem href="/simulations" icon={FileText} label="Simulationen" isActive={pathname === '/simulations'} />
          <NavItem href="/statistics" icon={PieChart} label="Statistiken" isActive={pathname.startsWith('/statistics')} />
          
          <p className="text-xs font-medium text-muted-foreground uppercase px-3 py-2 mt-4">Administration</p>
          <NavItem 
            href="/admin/team" 
            icon={UserPlus} 
            label="Team-Verwaltung" 
            isActive={pathname === '/admin/team'} 
            isAdminOnly
          />
          <NavItem 
            href="/admin/api-keys" 
            icon={Key} 
            label="API-Zugriff" 
            isActive={pathname === '/admin/api-keys'} 
            isEnterpriseOnly 
          />
          <NavItem 
            href="/admin/report-settings" 
            icon={BarChart} 
            label="Reporting" 
            isActive={pathname === '/admin/report-settings'} 
            isEnterpriseOnly 
          />
          <NavItem 
            href="/admin/company-settings" 
            icon={Building} 
            label="Unternehmenseinstellungen" 
            isActive={pathname === '/admin/company-settings'} 
            isAdminOnly
          />
        </nav>
      </div>

      <div className="mt-auto px-3 py-4 border-t border-sidebar-border">
        <div 
          className="flex items-center gap-3 px-3 py-3 rounded-md text-muted-foreground cursor-pointer hover:bg-muted/20 hover:text-foreground transition-all duration-200 min-h-[44px]"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span>Abmelden</span>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;

