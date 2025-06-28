import React, { useState, useEffect } from 'react';
import { 
  DocumentTextIcon, 
  ChartBarIcon,
  PlusIcon,
  SunIcon,
  MoonIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import CreateQuote from './pages/CreateQuote';
import BillingDashboard from './pages/BillingDashboard';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  // Load quotes and theme from localStorage on component mount
  useEffect(() => {
    const savedQuotes = localStorage.getItem('billingQuotes');
    const savedTheme = localStorage.getItem('billingTheme');
    
    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    }
    
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save quotes to localStorage whenever quotes change
  useEffect(() => {
    localStorage.setItem('billingQuotes', JSON.stringify(quotes));
  }, [quotes]);

  // Save theme to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem('billingTheme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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

  const exportQuotes = () => {
    const csvContent = [
      ['Quote ID', 'Customer', 'Product', 'Quantity', 'Price', 'Tax Rate', 'Total', 'Status', 'Date'],
      ...quotes.map(quote => [
        quote.id,
        quote.customerName,
        quote.productName,
        quote.quantity,
        quote.pricePerUnit,
        quote.taxRate + '%',
        quote.total.toFixed(2),
        quote.status,
        new Date(quote.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navigation Header */}
      <nav className={`transition-colors duration-200 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <DocumentTextIcon className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-primary-600'}`} />
                  <span className={`ml-2 text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
                    ? darkMode 
                      ? 'bg-blue-900 text-blue-200' 
                      : 'bg-primary-100 text-primary-700'
                    : darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700'
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

              {/* Export Button */}
              {quotes.length > 0 && (
                <button
                  onClick={exportQuotes}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                  Export
                </button>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-md transition-colors ${
                  darkMode 
                    ? 'text-yellow-400 hover:bg-gray-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {darkMode ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
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
      <footer className={`transition-colors duration-200 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-t mt-16`}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>ZenskarLite – Professional Quote & Billing System</p>
            <p className="mt-1">Built with React & TailwindCSS • Perfect for SDE Internship Demo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 