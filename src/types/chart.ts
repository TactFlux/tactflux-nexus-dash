
export interface ChartData {
  name: string;
  value: number;
  [key: string]: any; // For any additional properties
}

export interface SimulationData {
  id: string;
  title?: string;
  name?: string;
  date: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  score?: number;
  candidates?: number | string;
  [key: string]: any; // Für zusätzliche Flexibilität
}

export interface CandidateData {
  id: string;
  name: string;
  email: string;
  position: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected' | 'interview' | 'hired';
  score: number;
  date?: string;
  favorite?: boolean;
  moduleScores?: {
    name: string;
    score: number;
  }[];
  gptDetectionScore?: number;
  feedback?: string;
}
