
import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Star, X, ArrowUp, ArrowDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ExportButtons from '@/components/export/ExportButtons';
import EnterpriseFeature from '@/components/tier/EnterpriseFeature';
import ProFeature from '@/components/tier/ProFeature';
import APIEndpoints from '@/components/tier/APIEndpoints';
import { StatusChangeDropdown } from '@/components/tier';
import { exportToCSV, exportCandidatesToPDF } from '@/utils/exportUtils';
import { formatDate, getDateRangeFilter } from '@/utils/dateUtils';
import { CandidateData } from '@/types/chart';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const mockCandidates: CandidateData[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    position: 'UX Designer',
    status: 'completed',
    score: 87,
    date: '2025-03-28',
    favorite: false
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    position: 'Frontend Developer',
    status: 'in-progress',
    score: 62,
    date: '2025-04-01',
    favorite: true
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    position: 'Product Manager',
    status: 'pending',
    score: 0,
    date: '2025-04-02',
    favorite: false
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    position: 'Data Scientist',
    status: 'completed',
    score: 92,
    date: '2025-03-25',
    favorite: false
  },
  {
    id: '5',
    name: 'David Park',
    email: 'david@example.com',
    position: 'Backend Developer',
    status: 'rejected',
    score: 45,
    date: '2025-03-20',
    favorite: false
  },
  {
    id: '6',
    name: 'Jana Müller',
    email: 'jana.m@example.com',
    position: 'Product Designer',
    status: 'interview',
    score: 83,
    date: '2025-04-03',
    favorite: true
  },
  {
    id: '7',
    name: 'Lukas Schmidt',
    email: 'lukas@example.com',
    position: 'Full Stack Developer',
    status: 'hired',
    score: 71,
    date: '2025-04-04',
    favorite: false
  },
  {
    id: '8',
    name: 'Maria Garcia',
    email: 'maria@example.com',
    position: 'UI Designer',
    status: 'completed',
    score: 89,
    date: '2025-04-05',
    favorite: false
  },
  {
    id: '9',
    name: 'Thomas Weber',
    email: 'thomas@example.com',
    position: 'Frontend Developer',
    status: 'interview',
    score: 78,
    date: '2025-04-06',
    favorite: false
  },
  {
    id: '10',
    name: 'Laura Becker',
    email: 'laura@example.com',
    position: 'Data Scientist',
    status: 'pending',
    score: 0,
    date: '2025-04-08',
    favorite: false
  }
];

const statusVariants: Record<string, string> = {
  'pending': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20',
  'in-progress': 'bg-blue-500/20 text-blue-500 border-blue-500/20',
  'completed': 'bg-green-500/20 text-green-500 border-green-500/20',
  'rejected': 'bg-red-500/20 text-red-500 border-red-500/20',
  'interview': 'bg-purple-500/20 text-purple-500 border-purple-500/20',
  'hired': 'bg-cyan-500/20 text-cyan-500 border-cyan-500/20'
};

const statusLabels: Record<string, string> = {
  'pending': 'Ausstehend',
  'in-progress': 'In Bearbeitung',
  'completed': 'Abgeschlossen',
  'rejected': 'Abgelehnt',
  'interview': 'Interview',
  'hired': 'Eingestellt'
};

const positions = [
  'UX Designer', 
  'UI Designer', 
  'Frontend Developer', 
  'Backend Developer', 
  'Full Stack Developer', 
  'Product Manager', 
  'Data Scientist'
];

const CandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState<CandidateData[]>(mockCandidates);
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateData[]>(mockCandidates);
  const [positionFilter, setPositionFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { toast } = useToast();
  
  // Effect to handle filtering and sorting
  useEffect(() => {
    let result = [...candidates];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply position filter
    if (positionFilter && positionFilter !== 'all') {
      result = result.filter(candidate => candidate.position === positionFilter);
    }
    
    // Apply status filter
    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(candidate => candidate.status === statusFilter);
    }
    
    // Apply date filter
    const dateRangeStart = getDateRangeFilter(dateFilter);
    if (dateRangeStart) {
      result = result.filter(candidate => {
        const candidateDate = new Date(candidate.date || '');
        return candidateDate >= dateRangeStart;
      });
    }
    
    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        let valueA: any = a[sortField as keyof CandidateData];
        let valueB: any = b[sortField as keyof CandidateData];
        
        if (sortField === 'date') {
          valueA = new Date(valueA || '').getTime();
          valueB = new Date(valueB || '').getTime();
        }
        
        if (valueA === valueB) return 0;
        
        if (sortDirection === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }
    
    setFilteredCandidates(result);
  }, [candidates, searchTerm, positionFilter, statusFilter, dateFilter, sortField, sortDirection]);

  // Sort handlers
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter reset handler
  const resetFilters = () => {
    setSearchTerm('');
    setPositionFilter('');
    setStatusFilter('');
    setDateFilter('all');
    setSortField('');
    setSortDirection('asc');
    toast({
      title: "Filter zurückgesetzt",
      description: "Alle Filter wurden zurückgesetzt.",
    });
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setCandidates(prevCandidates => 
      prevCandidates.map(candidate => 
        candidate.id === id 
          ? { ...candidate, favorite: !candidate.favorite } 
          : candidate
      )
    );
    toast({
      title: "Favorit aktualisiert",
      description: "Der Favoritenstatus wurde aktualisiert.",
    });
  };

  // Handle status change
  const handleStatusChange = (id: string, newStatus: string) => {
    setCandidates(prevCandidates => 
      prevCandidates.map(candidate => 
        candidate.id === id 
          ? { ...candidate, status: newStatus as CandidateData['status'] } 
          : candidate
      )
    );
  };

  // Export handlers
  const handleExportCSV = () => {
    exportToCSV(filteredCandidates, 'tactflux-kandidaten');
    toast({
      title: "Export erfolgreich",
      description: "Die Kandidatendaten wurden als CSV exportiert",
    });
  };

  const handleExportPDF = () => {
    exportCandidatesToPDF(filteredCandidates, 'tactflux-kandidaten');
    toast({
      title: "Export erfolgreich",
      description: "Die Kandidatendaten wurden als PDF exportiert",
    });
  };

  // Get total number of candidates (would be from an API in a real app)
  const totalCandidatesCount = 120;

  // Generate UI for sort indicators
  const getSortIndicator = (field: string) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <ArrowUp className="inline h-4 w-4 ml-1" /> 
      : <ArrowDown className="inline h-4 w-4 ml-1" />;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Candidate Management</h1>
          <p className="text-gray-400 mt-1">Review and manage candidate applications</p>
        </div>
        
        {/* Counter section */}
        <div className="bg-tactflux-gray rounded-xl p-4 border border-white/5 shadow-card flex justify-between items-center">
          <div className="text-sm">
            <span className="font-medium text-white">{filteredCandidates.length} von {totalCandidatesCount} Kandidaten</span> angezeigt
          </div>
          
          <div className="flex gap-2">
            <ExportButtons 
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
              label="Exportieren"
            />
          </div>
        </div>
        
        {/* Filters section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center flex-wrap">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Kandidaten suchen..." 
              className="pl-10 bg-tactflux-gray/50 border-white/5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-[200px] bg-tactflux-gray/50 border-white/5">
                <SelectValue placeholder="Position filtern" />
              </SelectTrigger>
              <SelectContent className="bg-tactflux-gray border-white/10">
                <SelectItem value="all">Alle Positionen</SelectItem>
                {positions.map(position => (
                  <SelectItem key={position} value={position}>{position}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px] bg-tactflux-gray/50 border-white/5">
                <SelectValue placeholder="Status filtern" />
              </SelectTrigger>
              <SelectContent className="bg-tactflux-gray border-white/10">
                <SelectItem value="all">Alle Status</SelectItem>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[200px] bg-tactflux-gray/50 border-white/5">
                <SelectValue placeholder="Zeitraum filtern" />
              </SelectTrigger>
              <SelectContent className="bg-tactflux-gray border-white/10">
                <SelectItem value="all">Alle Zeiten</SelectItem>
                <SelectItem value="7days">Letzte 7 Tage</SelectItem>
                <SelectItem value="30days">Letzte 30 Tage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Empty state */}
        {filteredCandidates.length === 0 && (
          <Card className="mt-6">
            <CardContent className="pt-6 flex flex-col items-center justify-center text-center gap-4">
              <p className="text-muted-foreground">Keine Kandidaten entsprechen den gewählten Filtern.</p>
              <Button onClick={resetFilters} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Filter zurücksetzen
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Candidates table */}
        {filteredCandidates.length > 0 && (
          <div className="bg-tactflux-gray rounded-xl overflow-hidden border border-white/5 shadow-card">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-white/5">
                  <TableHead className="w-8"></TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    Name {getSortIndicator('name')}
                  </TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Datum {getSortIndicator('date')}
                  </TableHead>
                  <TableHead 
                    className="text-right cursor-pointer"
                    onClick={() => handleSort('score')}
                  >
                    Score {getSortIndicator('score')}
                  </TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="border-white/5 hover:bg-white/5">
                    <TableCell className="w-8">
                      <button 
                        className="focus:outline-none"
                        onClick={() => toggleFavorite(candidate.id)}
                        aria-label={candidate.favorite ? "Von Favoriten entfernen" : "Zu Favoriten hinzufügen"}
                      >
                        <Star 
                          className={`h-5 w-5 ${candidate.favorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                        />
                      </button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-xs text-gray-400">{candidate.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{candidate.position}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusVariants[candidate.status]}>
                        {statusLabels[candidate.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{candidate.date ? formatDate(candidate.date) : '-'}</TableCell>
                    <TableCell className="text-right">
                      <span className={`font-mono font-medium ${
                        candidate.score > 80 ? 'text-green-500' : 
                        candidate.score > 60 ? 'text-yellow-500' : 
                        candidate.score > 0 ? 'text-red-500' : 'text-gray-400'
                      }`}>
                        {candidate.score > 0 ? candidate.score : '-'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <StatusChangeDropdown 
                          currentStatus={candidate.status}
                          candidateId={candidate.id}
                          onStatusChange={handleStatusChange}
                        />
                        
                        {candidate.status !== 'pending' && (
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/candidates/${candidate.id}/report`}>
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Report</span>
                            </Link>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <ProFeature>
            <div className="bg-card p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-4">Erweiterte Visualisierungen</h3>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Trends der Kandidaten-Bewertungen</h4>
                  <div className="h-40 bg-gradient-to-r from-tactflux-turquoise/20 to-tactflux-violet/20 rounded flex items-center justify-center">
                    <p className="text-sm text-center text-muted-foreground">
                      Visualisierungen der Kandidaten-Leistungstrends verfügbar<br />
                      (Pro-Feature aktiviert)
                    </p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Leistungsverteilung nach Position</h4>
                  <div className="h-40 bg-gradient-to-r from-tactflux-turquoise/20 to-tactflux-violet/20 rounded flex items-center justify-center">
                    <p className="text-sm text-center text-muted-foreground">
                      Detaillierte Leistungsverteilung nach Positionstyp<br />
                      (Pro-Feature aktiviert)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ProFeature>

          <EnterpriseFeature>
            <APIEndpoints />
          </EnterpriseFeature>
        </div>
      </div>
    </Layout>
  );
};

export default CandidatesPage;
