"use client";
import React from 'react';
import { RiTeamLine, RiFileList3Line, RiSettings4Line, RiHistoryLine } from 'react-icons/ri';
import Link from 'next/link';

const AdminDashboard: React.FC = () => {
  const cards = [
    { title: 'Feature Controls', icon: RiSettings4Line, href: '/admin/features', description: 'Enable/disable forms and other features' },
    { title: 'CSV Management', icon: RiFileList3Line, href: '/admin/csv', description: 'Download and reset submission data' },
    { title: 'Team Search', icon: RiTeamLine, href: '/admin/teams', description: 'Find and manage teams' },
    { title: 'System Logs', icon: RiHistoryLine, href: '/admin/logs', description: 'View system activity logs' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 overflow-auto">
      <div className="mb-8">
        <h1 className="text-2xl text-[#a5f0d3] font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-400">Welcome to the CSI Admin Panel. Manage your hackathon resources from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link 
            key={card.title}
            href={card.href}
            className="bg-[#1d2029] border border-gray-800 hover:border-[#a5f0d3] rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#a5f0d3]/10 no-underline"
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <card.icon className="h-8 w-8 text-[#a5f0d3]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-200 mb-2">{card.title}</h2>
              <p className="text-gray-400 text-sm mt-auto">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;