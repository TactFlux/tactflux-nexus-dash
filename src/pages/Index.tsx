
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import CandidatesList from '@/components/dashboard/CandidatesList';
import TestModulesCard from '@/components/dashboard/TestModulesCard';
import ScoreCard from '@/components/dashboard/ScoreCard';
import AccessCodeCard from '@/components/dashboard/AccessCodeCard';
import FeedbackCard from '@/components/dashboard/FeedbackCard';
import ProgressChart from '@/components/dashboard/ProgressChart';
import TechnologyCard from '@/components/dashboard/Technology';
import { Users, Star, Calendar, Database } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 pb-10">
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <StatCard 
            title="Bewerber Gesamt" 
            value="1.245" 
            icon={Users} 
            trend={{ value: 12, isPositive: true }} 
          />
          <StatCard 
            title="Ø Creative Fit Score" 
            value="78,3" 
            icon={Star} 
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard 
            title="Tests diesen Monat" 
            value="438" 
            icon={Calendar} 
            trend={{ value: 2, isPositive: true }}
          />
          <StatCard 
            title="Datenpunkte" 
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AccessCodeCard />
              <FeedbackCard />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <ScoreCard 
              title="Creative Fit Score" 
              score={84} 
              maxScore={100} 
              description="Gesamte kreative Problemlösungsfähigkeit" 
              color="turquoise"
            />
            <TestModulesCard />
          </div>
        </section>
        
        {/* Technology Stack Section */}
        <section className="pt-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Technologie-Stack</h2>
            <p className="text-gray-400">Die moderne Technologie hinter TactFlux</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <TechnologyCard 
              name="Next.js" 
              description="React Framework für das Frontend" 
              icon={<span className="text-2xl">N</span>} 
              color="blue-500"
            />
            <TechnologyCard 
              name="FastAPI" 
              description="Hochperformantes Python API-Framework" 
              icon={<span className="text-2xl">⚡</span>} 
              color="tactflux-turquoise"
            />
            <TechnologyCard 
              name="Docker" 
              description="Containerisierung für einfaches Deployment" 
              icon={<span className="text-2xl">🐳</span>} 
              color="tactflux-violet"
            />
            <TechnologyCard 
              name="PostgreSQL" 
              description="Fortschrittliche Open-Source-Datenbank" 
              icon={<span className="text-2xl">🐘</span>} 
              color="blue-400"
            />
            <TechnologyCard 
              name="Supabase" 
              description="Open-Source Firebase Alternative" 
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
