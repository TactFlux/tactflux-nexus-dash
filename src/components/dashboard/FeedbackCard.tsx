
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface FeedbackItem {
  id: string;
  candidate: string;
  module: string;
  date: string;
  rating: number;
  comment: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    candidate: 'Emma Wilson',
    module: 'Problemlösung',
    date: '2025-04-02',
    rating: 5,
    comment: 'Exzellenter Ansatz bei schwierigen Problemen. Kreative Lösungen.'
  },
  {
    id: '2',
    candidate: 'Michael Chen',
    module: 'Teamzusammenarbeit',
    date: '2025-04-01',
    rating: 3,
    comment: 'Gute Kommunikation, könnte aber Delegationsstrategien verbessern.'
  }
];

const FeedbackCard = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="bg-card rounded-xl shadow-card border border-border h-full animate-fade-in transition-all duration-300 hover:shadow-md">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Aktuelles Feedback</h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {mockFeedback.map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-all duration-300 hover:shadow-md group cursor-pointer"
              onClick={() => setExpandedId(expandedId === feedback.id ? null : feedback.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium group-hover:text-tactflux-turquoise transition-colors duration-300">{feedback.candidate}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-tactflux-violet/20 text-tactflux-violet rounded-full transition-all duration-300 group-hover:bg-tactflux-violet/30">
                      {feedback.module}
                    </span>
                    <span className="text-xs text-muted-foreground">{feedback.date}</span>
                  </div>
                </div>
                
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className={cn(
                        "text-sm transition-all duration-300 transform",
                        star <= feedback.rating 
                          ? "text-yellow-500 group-hover:scale-110 group-hover:rotate-[5deg]" 
                          : "text-gray-600"
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <p className={cn(
                "text-sm text-muted-foreground mt-3 transition-all duration-300",
                expandedId === feedback.id ? "line-clamp-none" : "line-clamp-2"
              )}>
                {feedback.comment}
              </p>
              
              {expandedId === feedback.id && (
                <div className="mt-2 pt-2 border-t border-border animate-fade-in">
                  <button className="text-xs flex items-center text-tactflux-violet hover:text-tactflux-pink transition-colors">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Feedback im Detail ansehen
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 text-center border-t border-border">
        <button className="text-sm text-tactflux-turquoise hover:text-tactflux-violet transition-all duration-300 hover:underline relative inline-block overflow-hidden group">
          <span>Alle Feedbacks anzeigen</span>
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-tactflux-turquoise transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
