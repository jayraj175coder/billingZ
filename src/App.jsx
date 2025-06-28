import React, { useState, useEffect } from 'react';
import { 
  DocumentTextIcon, 
  ChartBarIcon,
  PlusIcon,
  SunIcon,
  MoonIcon,
  ArrowDownTrayIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import CreateQuote from './pages/CreateQuote';
import BillingDashboard from './pages/BillingDashboard';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  // Demo data for initial display
  const demoData = [
    {
      id: 1001,
      customerName: "TechCorp Solutions",
      productName: "Web Development Services",
      quantity: "1",
      pricePerUnit: "2500.00",
      taxRate: "8.5",
      subtotal: 2500,
      tax: 212.5,
      total: 2712.5,
      status: "paid",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
      id: 1002,
      customerName: "Design Studio Pro",
      productName: "UI/UX Design Package",
      quantity: "2",
      pricePerUnit: "1200.00",
      taxRate: "0",
      subtotal: 2400,
      tax: 0,
      total: 2400,
      status: "unpaid",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
      id: 1003,
      customerName: "Startup Innovate",
      productName: "Mobile App Development",
      quantity: "1",
      pricePerUnit: "5000.00",
      taxRate: "10",
      subtotal: 5000,
      tax: 500,
      total: 5500,
      status: "paid",
      createdAt: new Date().toISOString() // today
    }
  ];

  // Load quotes and theme from localStorage on component mount
  useEffect(() => {
    const savedQuotes = localStorage.getItem('billingQuotes');
    const savedTheme = localStorage.getItem('billingTheme');
    
    if (savedQuotes) {
      const parsedQuotes = JSON.parse(savedQuotes);
      // Only use saved quotes if there are any, otherwise use demo data
      setQuotes(parsedQuotes.length > 0 ? parsedQuotes : demoData);
    } else {
      // First time user - show demo data
      setQuotes(demoData);
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
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setQuotes(prev => prev.filter(quote => quote.id !== quoteId));
    }
  };

  const resetToDemoData = () => {
    if (window.confirm('This will reset all data to demo invoices. Continue?')) {
      setQuotes(demoData);
    }
  };

  const exportQuotes = () => {
    const csvContent = [
      ['Invoice ID', 'Customer', 'Product', 'Quantity', 'Price', 'Tax Rate', 'Total', 'Status', 'Date'],
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
    a.download = `invoices-${new Date().toISOString().split('T')[0]}.csv`;
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
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Navigation Header */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        darkMode 
          ? 'bg-slate-800/80 border-slate-700 shadow-slate-900/20' 
          : 'bg-white/80 border-slate-200 shadow-slate-900/10'
      } shadow-lg border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
                  }`}>
                    <DocumentTextIcon className={`h-6 w-6 ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="ml-3">
                    <span className={`text-xl font-bold ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      InvoiceFlow
                    </span>
                    <p className={`text-xs ${
                      darkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Professional Billing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === 'dashboard'
                    ? darkMode 
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
                      : 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : darkMode
                      ? 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ChartBarIcon className="h-5 w-5 mr-2" />
                Dashboard
              </button>
              
              <button
                onClick={() => setCurrentPage('create')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105"
              >
                <PlusIcon className="h-4 w-4" />
                New Invoice
              </button>

              {/* Demo Data Button */}
              <button
                onClick={resetToDemoData}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  darkMode 
                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600 hover:shadow-lg' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-lg'
                }`}
              >
                <PlayIcon className="h-4 w-4 mr-2" />
                Demo Data
              </button>

              {/* Export Button */}
              {quotes.length > 0 && (
                <button
                  onClick={exportQuotes}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    darkMode 
                      ? 'bg-slate-700 text-slate-200 hover:bg-slate-600 hover:shadow-lg' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-lg'
                  }`}
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Export
                </button>
              )}

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  darkMode 
                    ? 'text-amber-400 hover:bg-slate-700 hover:shadow-lg' 
                    : 'text-slate-600 hover:bg-slate-100 hover:shadow-lg'
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
      <main className="transition-all duration-300">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className={`transition-all duration-300 ${
        darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white/50 border-slate-200'
      } border-t mt-16 backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className={`text-sm ${
              darkMode ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <p className="font-medium">InvoiceFlow – Professional Invoice Management</p>
              {/* <p className="mt-1">Built with React & TailwindCSS • Perfect for SDE Internship Demo</p> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 