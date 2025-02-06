import React from 'react';
import { isAuthenticated } from '@/Utils/Auth';
import { redirect } from 'next/navigation';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const ScanQRLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const isAuth = isAuthenticated;

    if (!isAuth) {
        redirect("/");
    }

    return (
        <div className="h-screen flex flex-col">
                {children}
        </div>
    );
};

export default ScanQRLayout;