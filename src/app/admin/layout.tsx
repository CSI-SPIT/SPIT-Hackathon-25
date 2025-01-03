import React from 'react';
import { isAuthenticated } from '@/Utils/Auth';
import { redirect } from 'next/navigation';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const isAuth = isAuthenticated;

    if (!isAuth) {
        redirect("/");
    }

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto">
                    <h1 className="text-2xl">Admin Dashboard</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                <div className="container mx-auto">
                    <p>&copy; {new Date().getFullYear()} CSI-SPIT. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default AdminLayout;