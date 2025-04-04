
import React from 'react';
import AppSidebar from './AppSidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-tactflux-black text-white">
      <div className="flex">
        <AppSidebar />
        
        <main className="flex-1 min-h-screen md:ml-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <Header />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
