import React from 'react';
import { Bell, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
const Header = () => {
  const isMobile = useIsMobile();
  const {
    user
  } = useAuth();
  const companyLogo = user?.company?.logoUrl || "/lovable-uploads/79b93f56-97fe-416b-9625-4bf78b87f33f.png";
  const userEmail = user?.email || 'admin@tactflux.com';
  const userRole = user?.role || 'admin';

  // Search functionality
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const [showResults, setShowResults] = React.useState(false);

  // Mock search results - in a real app, this would call an API
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 1) {
      // Simulate search results
      const mockResults = [{
        id: 1,
        name: 'Sarah Johnson',
        type: 'Kandidat',
        path: '/candidates/1'
      }, {
        id: 2,
        name: 'Michael Chen',
        type: 'Kandidat',
        path: '/candidates/2'
      }, {
        id: 3,
        name: 'API Schlüssel',
        type: 'Seite',
        path: '/admin/api-keys'
      }, {
        id: 4,
        name: 'Reporting',
        type: 'Seite',
        path: '/admin/report-settings'
      }].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(mockResults);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };
  return <header className="h-16 w-full flex items-center justify-between animate-fade-in">
      <div className="flex-1 flex items-center">
        
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Suchen..." className="bg-muted/50 border border-input rounded-full py-2 px-10 w-64 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" value={searchQuery} onChange={e => handleSearch(e.target.value)} onFocus={() => searchQuery.length > 1 && setShowResults(true)} onBlur={() => setTimeout(() => setShowResults(false), 200)} />
          </div>
          
          {showResults && searchResults.length > 0 && <div className="absolute top-full mt-1 w-full z-50 bg-card rounded-md border border-border shadow-lg py-2">
              {searchResults.map(result => <a key={result.id} href={result.path} className="flex items-center px-4 py-2 hover:bg-muted text-sm">
                  <div>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-xs text-muted-foreground">{result.type}</p>
                  </div>
                </a>)}
            </div>}
        </div>

        {isMobile && <Button size="icon" variant="ghost" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>}

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full p-2 bg-muted/50 border border-input hover:bg-muted transition-all relative" style={{
            borderColor: 'var(--company-primary)'
          }}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center" style={{
              background: 'var(--company-accent)'
            }}>
                3
              </span>
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
          <div className="w-8 h-8 rounded-full" style={{
          background: `linear-gradient(to right, var(--company-primary), var(--company-accent))`
        }}>
            {/* User avatar would go here */}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{userRole === 'admin' ? 'Admin' : 'User'}</p>
            <p className="text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;