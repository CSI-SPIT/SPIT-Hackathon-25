"use client"
import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '@/utils/Auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  RiDashboardLine, 
  RiTeamLine, 
  RiFileList3Line,
  RiSettings4Line,
  RiHistoryLine,
} from 'react-icons/ri';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: RiDashboardLine },
  { name: 'Features', href: '/admin/features', icon: RiSettings4Line },
  { name: 'CSV Management', href: '/admin/csv', icon: RiFileList3Line },
  { name: 'Teams', href: '/admin/teams', icon: RiTeamLine },
  { name: 'Logs', href: '/admin/logs', icon: RiHistoryLine },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = await isAuthenticated();
        if (!authStatus) redirect('/');
        setAuth(true);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#171923]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#a5f0d3]"></div>
      </div>
    );
  }

  if (!auth) return null;

  return (
    <div className="flex h-screen bg-[#171923]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1d2029] border-r border-gray-800">
        <div className="h-16 flex items-center justify-center px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-[#a5f0d3]">C.S.I. Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="flex items-center gap-3 px-4 py-3 text-md text-gray-300 hover:bg-[#a5f0d3]/10 hover:text-[#a5f0d3] rounded-lg transition-colors duration-200 no-underline"
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-[#1d2029] border-b border-gray-800 flex items-center px-6">
          <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;