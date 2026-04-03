import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm your AI Donation Guide. How can I help you fight food waste today?", sender: 'ai' }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSuggestionClick = (suggestion) => {
        // Add user message
        setMessages(prev => [...prev, { text: suggestion, sender: 'user' }]);

        // Simulate AI thinking and typing
        setIsTyping(true);

        setTimeout(() => {
            let aiResponse = "";
            if (suggestion.includes("donate")) {
                aiResponse = "Great! You can donate food by clicking on the 'Dashboard' and filling out our Smart Donation Form. I can auto-detect your location to match you with nearby NGOs.";
            } else if (suggestion.includes("volunteer")) {
                aiResponse = "Volunteers are heroes! Sign up and visit the Volunteer Dashboard to see a live map of available food pickups near you.";
            } else if (suggestion.includes("NGO")) {
                aiResponse = "If you represent an NGO, create a Receiver account to post food requests. Our AI will alert nearby donors automatically.";
            } else {
                aiResponse = "I'm still learning, but you can explore the platform to see how we redistribute surplus food!";
            }

            setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4 w-80 sm:w-96 glass-card overflow-hidden shadow-2xl flex flex-col h-96"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primaryGreen to-primaryGreen-dark p-4 text-white flex justify-between items-center rounded-t-2xl">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🤖</span>
                                <span className="font-bold">AI Donation Guide</span>
                            </div>
                            <button onClick={toggleChat} className="text-white hover:text-gray-200 focus:outline-none">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 dark:bg-darkBg/50 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.sender === 'user'
                                            ? 'bg-primaryGreen text-white rounded-tr-none'
                                            : 'bg-white dark:bg-darkCard text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none shadow-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-darkCard border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-none p-4 flex space-x-1 shadow-sm">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Suggestions Footer */}
                        <div className="p-3 bg-white dark:bg-darkCard border-t border-gray-100 dark:border-gray-700 rounded-b-2xl">
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => handleSuggestionClick("How do I donate food?")} className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-1 px-3 rounded-full transition">
                                    How to donate?
                                </button>
                                <button onClick={() => handleSuggestionClick("I want to volunteer")} className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-1 px-3 rounded-full transition">
                                    I want to volunteer
                                </button>
                                <button onClick={() => handleSuggestionClick("Registering an NGO")} className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-1 px-3 rounded-full transition">
                                    Registering an NGO
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <button
                onClick={toggleChat}
                className="w-14 h-14 bg-gradient-to-r from-primaryGreen to-accentOrange rounded-full text-white shadow-[0_0_20px_10px_rgba(16,185,129,0.3)] animate-pulse hover:shadow-[0_0_30px_15px_rgba(16,185,129,0.6)] hover:scale-110 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primaryGreen/30"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                    <span className="text-2xl animate-pulse">🤖</span>
                )}
            </button>
        </div>
    );
};

export default AIChatbot;
