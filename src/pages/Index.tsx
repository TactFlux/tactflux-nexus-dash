
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import CandidatesList from '@/components/dashboard/CandidatesList';
import TestModulesCard from '@/components/dashboard/TestModulesCard';
import ScoreCard from '@/components/dashboard/ScoreCard';
import AccessCodeCard from '@/components/dashboard/AccessCodeCard';
import FeedbackCard from '@/components/dashboard/FeedbackCard';
import ProgressChart from '@/components/dashboard/ProgressChart';
import CTACard from '@/components/dashboard/CTACard';
import TechnologyCard from '@/components/dashboard/Technology';
import { Users, Star, Calendar, Database, FileText } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 pb-10">
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <StatCard 
            title="Total Candidates" 
            value="1,245" 
            icon={Users} 
            trend={{ value: 12, isPositive: true }} 
          />
          <StatCard 
            title="Avg. Creative Score" 
            value="78.3" 
            icon={Star} 
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard 
            title="Tests This Month" 
            value="438" 
            icon={Calendar} 
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard 
            title="Data Points" 
            value="156K" 
            icon={Database} 
            trend={{ value: 8, isPositive: true }}
          />
        </section>

        {/* Main Dashboard Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ProgressChart />
            <CandidatesList />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <ScoreCard 
              title="Creative Fit Score" 
              score={84} 
              maxScore={100} 
              description="Overall creative problem-solving aptitude" 
              color="turquoise"
            />
            <TestModulesCard />
          </div>
        </section>
        
        {/* Second Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <AccessCodeCard />
          </div>
          <div className="md:col-span-1">
            <FeedbackCard />
          </div>
          <div className="md:col-span-1">
            <CTACard 
              title="Supercharge Recruiting" 
              description="Unlock AI-powered insights to find the perfect candidates faster." 
              buttonText="Upgrade Now" 
              icon={Star} 
              gradient="violet-pink"
            />
          </div>
        </section>
        
        {/* Technology Stack Section */}
        <section className="pt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Powered By</h2>
            <p className="text-gray-400">The cutting-edge technology stack behind TactFlux</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <TechnologyCard 
              name="Next.js" 
              description="React framework for production-grade frontend" 
              icon={<span className="text-2xl">N</span>} 
              color="blue-500"
            />
            <TechnologyCard 
              name="FastAPI" 
              description="High-performance Python API framework" 
              icon={<span className="text-2xl">⚡</span>} 
              color="tactflux-turquoise"
            />
            <TechnologyCard 
              name="Docker" 
              description="Containerization for seamless deployment" 
              icon={<span className="text-2xl">🐳</span>} 
              color="tactflux-violet"
            />
            <TechnologyCard 
              name="PostgreSQL" 
              description="Advanced open source database" 
              icon={<span className="text-2xl">🐘</span>} 
              color="blue-400"
            />
            <TechnologyCard 
              name="Supabase" 
              description="Open source Firebase alternative" 
              icon={<span className="text-2xl">S</span>} 
              color="green-500"
            />
          </div>
        </section>
        
      </div>
    </Layout>
  );
};

export default Index;
