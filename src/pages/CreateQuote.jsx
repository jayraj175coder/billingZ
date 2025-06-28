import React from 'react';
import QuoteForm from '../components/QuoteForm';

const CreateQuote = ({ onGenerateQuote }) => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Create New Invoice
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Generate professional invoices for your customers with our elegant, easy-to-use form
          </p>
        </div>
        
        <QuoteForm onGenerateQuote={onGenerateQuote} />
      </div>
    </div>
  );
};

export default CreateQuote; 