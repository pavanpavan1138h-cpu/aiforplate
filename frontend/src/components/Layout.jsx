import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIChatbot from './AIChatbot';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow bg-gray-50 dark:bg-darkBg transition-colors duration-300">
                {children}
            </main>
            <Footer />
            <AIChatbot />
        </div>
    );
};

export default Layout;
