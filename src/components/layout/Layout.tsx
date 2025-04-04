
import React from 'react';
import AppSidebar from './AppSidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-tactflux-black text-white">
      <AppSidebar />
      
      <main className="ml-64 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Header />
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
