
import React from 'react';
import { cn } from '@/lib/utils';

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
  return (
    <div className="bg-card rounded-xl shadow-card border border-border h-full animate-fade-in">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Aktuelles Feedback</h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {mockFeedback.map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{feedback.candidate}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-tactflux-violet/20 text-tactflux-violet rounded-full">
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
                        "text-sm",
                        star <= feedback.rating ? "text-yellow-500" : "text-gray-600"
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-3">
                {feedback.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 text-center border-t border-border">
        <button className="text-sm text-tactflux-turquoise hover:underline">
          Alle Feedbacks anzeigen
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
