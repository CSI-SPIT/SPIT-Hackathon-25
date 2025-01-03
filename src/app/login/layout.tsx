import React from 'react';
interface AdminLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<AdminLayoutProps> = ({ children }) => {

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto">
                    <h1 className="text-2xl">Admin Dashboard</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex container mx-auto p-4 w-full justify-center min-h-full items-center">
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

export default PageLayout;