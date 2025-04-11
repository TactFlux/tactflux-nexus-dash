
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import ExportButtons from '@/components/export/ExportButtons';
import EnterpriseFeature from '@/components/tier/EnterpriseFeature';
import ProFeature from '@/components/tier/ProFeature';
import APIEndpoints from '@/components/tier/APIEndpoints';
import { exportToCSV, exportCandidatesToPDF } from '@/utils/exportUtils';
import { useToast } from '@/components/ui/use-toast';

const mockCandidates = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    position: 'UX Designer',
    status: 'completed',
    score: 87,
    date: '2025-03-28'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    position: 'Frontend Developer',
    status: 'in-progress',
    score: 62,
    date: '2025-04-01'
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    position: 'Product Manager',
    status: 'pending',
    score: 0,
    date: '2025-04-02'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    position: 'Data Scientist',
    status: 'completed',
    score: 92,
    date: '2025-03-25'
  },
  {
    id: '5',
    name: 'David Park',
    email: 'david@example.com',
    position: 'Backend Developer',
    status: 'rejected',
    score: 45,
    date: '2025-03-20'
  },
  {
    id: '6',
    name: 'Jana Müller',
    email: 'jana.m@example.com',
    position: 'Product Designer',
    status: 'completed',
    score: 83,
    date: '2025-04-03'
  },
  {
    id: '7',
    name: 'Lukas Schmidt',
    email: 'lukas@example.com',
    position: 'Full Stack Developer',
    status: 'in-progress',
    score: 71,
    date: '2025-04-04'
  }
];

const statusVariants = {
  'pending': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20',
  'in-progress': 'bg-blue-500/20 text-blue-500 border-blue-500/20',
  'completed': 'bg-green-500/20 text-green-500 border-green-500/20',
  'rejected': 'bg-red-500/20 text-red-500 border-red-500/20'
};

const statusLabels = {
  'pending': 'Pending',
  'in-progress': 'In Progress',
  'completed': 'Completed',
  'rejected': 'Rejected'
};

const CandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  // Filter candidates based on search term
  const filteredCandidates = mockCandidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Candidate Management</h1>
          <p className="text-gray-400 mt-1">Review and manage candidate applications</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search candidates..." 
              className="pl-10 bg-tactflux-gray/50 border-white/5"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <select className="bg-tactflux-gray/50 text-white border border-white/5 rounded-md px-3 py-2 text-sm">
              <option value="">Filter by Position</option>
              <option value="ux">UX Designer</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="product">Product Manager</option>
            </select>
            
            <select className="bg-tactflux-gray/50 text-white border border-white/5 rounded-md px-3 py-2 text-sm">
              <option value="">Filter by Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>

            <ExportButtons 
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
              label="Exportieren"
            />
          </div>
        </div>
        
        <div className="bg-tactflux-gray rounded-xl overflow-hidden border border-white/5 shadow-card">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-white/5">
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id} className="border-white/5 hover:bg-white/5">
                  <TableCell>
                    <div>
                      <p className="font-medium">{candidate.name}</p>
                      <p className="text-xs text-gray-400">{candidate.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{candidate.position}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusVariants[candidate.status as keyof typeof statusVariants]}>
                      {statusLabels[candidate.status as keyof typeof statusLabels]}
                    </Badge>
                  </TableCell>
                  <TableCell>{candidate.date}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-mono font-medium ${
                      candidate.score > 80 ? 'text-green-500' : 
                      candidate.score > 60 ? 'text-yellow-500' : 
                      candidate.score > 0 ? 'text-red-500' : 'text-gray-400'
                    }`}>
                      {candidate.score > 0 ? candidate.score : '-'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">Showing {filteredCandidates.length} of 1,245 candidates</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-white/10 rounded bg-tactflux-gray text-sm">Previous</button>
            <button className="px-3 py-1 border border-white/10 rounded bg-tactflux-gray text-sm">Next</button>
          </div>
        </div>

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
