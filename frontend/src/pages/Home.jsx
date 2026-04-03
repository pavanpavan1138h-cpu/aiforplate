import React from 'react';
import HeroSection from '../components/HeroSection';
import FlowDiagram from '../components/FlowDiagram';

const Home = () => {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <FlowDiagram />
        </div>
    );
};

export default Home;
