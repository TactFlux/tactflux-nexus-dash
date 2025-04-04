
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
    module: 'Problem Solving',
    date: '2025-04-02',
    rating: 5,
    comment: 'Excellent approach to the challenging problems. Creative solutions.'
  },
  {
    id: '2',
    candidate: 'Michael Chen',
    module: 'Team Collaboration',
    date: '2025-04-01',
    rating: 3,
    comment: 'Good communication but could improve on delegation strategies.'
  }
];

const FeedbackCard = () => {
  return (
    <div className="bg-tactflux-gray rounded-xl shadow-card border border-white/5 animate-fade-in">
      <div className="p-6 border-b border-white/5">
        <h3 className="text-lg font-semibold">Recent Feedback</h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {mockFeedback.map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 border border-white/5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{feedback.candidate}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 bg-tactflux-violet/20 text-tactflux-violet rounded-full">
                      {feedback.module}
                    </span>
                    <span className="text-xs text-gray-400">{feedback.date}</span>
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
              
              <p className="text-sm text-gray-300 mt-3">
                {feedback.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 text-center border-t border-white/5">
        <button className="text-sm text-tactflux-turquoise hover:underline">
          View All Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackCard;
