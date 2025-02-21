import React from 'react';
import { isAuthenticated } from '@/utils/Auth';
import { redirect } from 'next/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const isAuth = isAuthenticated;

    if (!isAuth) {
        redirect("/");
    }

    return (
        <div className="min-h-[60%] flex flex-col">
            {children}
        </div>
    );
};

export default Layout;