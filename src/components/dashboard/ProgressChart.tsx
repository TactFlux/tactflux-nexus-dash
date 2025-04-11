import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Jan', candidates: 25, completionRate: 62 },
  { name: 'Feb', candidates: 40, completionRate: 58 },
  { name: 'Mar', candidates: 35, completionRate: 65 },
  { name: 'Apr', candidates: 50, completionRate: 72 },
  { name: 'May', candidates: 65, completionRate: 78 },
  { name: 'Jun', candidates: 75, completionRate: 82 },
  { name: 'Jul', candidates: 85, completionRate: 85 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-tactflux-black p-3 rounded-lg border border-white/10 shadow-lg animate-fade-in">
        <p className="text-xs font-semibold text-gray-400">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.stroke }}>
            {entry.name === 'candidates' ? 'Kandidaten' : 'Abschlussrate'}: {entry.value}
            {entry.name === 'completionRate' ? '%' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ProgressChart = () => {
  const [activeDataKey, setActiveDataKey] = useState<string | null>(null);

  const handleMouseEnter = (dataKey: string) => {
    setActiveDataKey(dataKey);
  };

  const handleMouseLeave = () => {
    setActiveDataKey(null);
  };

  return (
    <div className="bg-tactflux-gray rounded-xl shadow-card border border-white/5 animate-slide-up transition-all duration-300 hover:shadow-md hover:border-white/10">
      <div className="p-6 border-b border-white/5">
        <h3 className="text-lg font-semibold">Plattformleistung</h3>
        <p className="text-sm text-gray-400">Kandidatenvolumen und Testabschlussraten</p>
      </div>
      
      <div className="p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              yAxisId="left"
            />
            <YAxis 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              orientation="right" 
              yAxisId="right"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value: string) => (
                <span className="text-sm transition-all duration-300 cursor-pointer hover:text-white">
                  {value === 'candidates' ? 'Kandidaten' : 'Abschlussrate'}
                </span>
              )}
              onMouseEnter={(e) => handleMouseEnter(e.dataKey as string)}
              onMouseLeave={handleMouseLeave}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="candidates" 
              name="Kandidaten" 
              stroke="#00FFFF" 
              strokeWidth={activeDataKey === 'candidates' ? 3 : 2}
              dot={{ fill: '#00FFFF', strokeWidth: 0, r: 4 }} 
              activeDot={{ 
                r: 6, 
                stroke: '#00FFFF', 
                strokeWidth: 2,
                className: "animate-pulse" 
              }}
              className={cn(
                "transition-all duration-300",
                activeDataKey === 'candidates' && "filter drop-shadow(0 0 2px rgba(0, 255, 255, 0.7))"
              )}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="completionRate" 
              name="Abschlussrate" 
              stroke="#FF007F" 
              strokeWidth={activeDataKey === 'completionRate' ? 3 : 2}
              dot={{ fill: '#FF007F', strokeWidth: 0, r: 4 }} 
              activeDot={{ 
                r: 6, 
                stroke: '#FF007F', 
                strokeWidth: 2,
                className: "animate-pulse" 
              }}
              className={cn(
                "transition-all duration-300",
                activeDataKey === 'completionRate' && "filter drop-shadow(0 0 2px rgba(255, 0, 127, 0.7))"
              )}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
