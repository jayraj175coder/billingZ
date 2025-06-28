import React, { useState, useEffect } from 'react';
import { 
  DocumentTextIcon, 
  ChartBarIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import CreateQuote from './pages/CreateQuote';
import BillingDashboard from './pages/BillingDashboard';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Load quotes from localStorage on component mount
  useEffect(() => {
    const savedQuotes = localStorage.getItem('billingQuotes');
    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    }
  }, []);

  // Save quotes to localStorage whenever quotes change
  useEffect(() => {
    localStorage.setItem('billingQuotes', JSON.stringify(quotes));
  }, [quotes]);

  const handleGenerateQuote = (newQuote) => {
    setQuotes(prev => [newQuote, ...prev]);
    setCurrentPage('dashboard');
  };

  const handleMarkAsPaid = (quoteId) => {
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? { ...quote, status: 'paid' }
        : quote
    ));
  };

  const handleDeleteQuote = (quoteId) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      setQuotes(prev => prev.filter(quote => quote.id !== quoteId));
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'create':
        return <CreateQuote onGenerateQuote={handleGenerateQuote} />;
      case 'dashboard':
      default:
        return (
          <BillingDashboard 
            quotes={quotes}
            onMarkAsPaid={handleMarkAsPaid}
            onDelete={handleDeleteQuote}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-8 w-8 text-primary-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    ZenskarLite
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'dashboard'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ChartBarIcon className="h-5 w-5 mr-1" />
                Dashboard
              </button>
              
              <button
                onClick={() => setCurrentPage('create')}
                className="btn-primary flex items-center gap-1"
              >
                <PlusIcon className="h-4 w-4" />
                New Quote
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>ZenskarLite – Professional Quote & Billing System</p>
            <p className="mt-1">Built with React & TailwindCSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 