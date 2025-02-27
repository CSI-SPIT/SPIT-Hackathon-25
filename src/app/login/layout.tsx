import React from 'react';
interface AdminLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<AdminLayoutProps> = ({ children }) => {

  return (
    <div className="min-h-screen flex flex-col bg-[#171923]">
      <header className="bg-[#1d2029] border-b border-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-[#a5f0d3]">CSI Admin Portal</h1>
        </div>
      </header>

      <main className="flex-grow flex container mx-auto p-4 w-full justify-center min-h-full items-center">
        {children}
      </main>

      <footer className="bg-[#1d2029] border-t border-gray-800 text-white p-4 text-center">
        <div className="container mx-auto">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} CSI-SPIT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;