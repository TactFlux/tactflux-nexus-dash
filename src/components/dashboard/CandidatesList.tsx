
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useUserTier } from '@/contexts/UserTierContext';

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  score: number;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    position: 'UX Designer',
    status: 'completed',
    score: 87
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    position: 'Frontend Developer',
    status: 'in-progress',
    score: 62
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    position: 'Product Manager',
    status: 'pending',
    score: 0
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    position: 'Data Scientist',
    status: 'completed',
    score: 92
  },
  {
    id: '5',
    name: 'David Park',
    email: 'david@example.com',
    position: 'Backend Developer',
    status: 'rejected',
    score: 45
  }
];

const statusVariants = {
  'pending': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20',
  'in-progress': 'bg-blue-500/20 text-blue-500 border-blue-500/20',
  'completed': 'bg-green-500/20 text-green-500 border-green-500/20',
  'rejected': 'bg-red-500/20 text-red-500 border-red-500/20'
};

const statusLabels = {
  'pending': 'Ausstehend',
  'in-progress': 'In Bearbeitung',
  'completed': 'Abgeschlossen',
  'rejected': 'Abgelehnt'
};

const CandidatesList = () => {
  const { isProOrHigher } = useUserTier();

  return (
    <div className="bg-tactflux-gray rounded-xl shadow-card border border-white/5 animate-slide-up">
      <div className="p-6 border-b border-white/5">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Aktuelle Kandidaten</h3>
          <Link to="/candidates" className="text-sm text-tactflux-turquoise hover:underline">
            Alle ansehen
          </Link>
        </div>
      </div>
      
      <div className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-white/5">
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ergebnis</TableHead>
              {isProOrHigher && <TableHead></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCandidates.map((candidate) => (
              <TableRow key={candidate.id} className="border-white/5 hover:bg-white/5">
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
                <TableCell className="text-right">
                  <span className={`font-mono font-medium ${
                    candidate.score > 80 ? 'text-green-500' : 
                    candidate.score > 60 ? 'text-yellow-500' : 
                    candidate.score > 0 ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {candidate.score > 0 ? candidate.score : '-'}
                  </span>
                </TableCell>
                {isProOrHigher && (
                  <TableCell className="text-right">
                    {candidate.status !== 'pending' && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        asChild
                      >
                        <Link to={`/candidates/${candidate.id}/report`}>
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Report</span>
                        </Link>
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CandidatesList;
