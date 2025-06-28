import React from 'react';
import QuoteForm from '../components/QuoteForm';

const CreateQuote = ({ onGenerateQuote }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Quote
          </h1>
          <p className="text-gray-600">
            Generate professional quotes for your customers with our easy-to-use form
          </p>
        </div>
        
        <QuoteForm onGenerateQuote={onGenerateQuote} />
      </div>
    </div>
  );
};

export default CreateQuote; 