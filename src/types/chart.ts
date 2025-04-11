
export interface ChartData {
  name: string;
  value: number;
  [key: string]: any; // For any additional properties
}

export interface SimulationData {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  score?: number;
  candidates: number;
  chartData?: ChartData[];
}
