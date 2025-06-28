import React from 'react';
import { 
  UserIcon, 
  CubeIcon, 
  CurrencyDollarIcon, 
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const QuoteCard = ({ quote, onMarkAsPaid, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    if (status === 'paid') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircleIcon className="h-3 w-3 mr-1" />
          Paid
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <XCircleIcon className="h-3 w-3 mr-1" />
        Unpaid
      </span>
    );
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Quote #{quote.id.toString().slice(-6)}
          </h3>
          <p className="text-sm text-gray-500 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {formatDate(quote.createdAt)}
          </p>
        </div>
        {getStatusBadge(quote.status)}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm">
          <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-600">Customer:</span>
          <span className="font-medium ml-1">{quote.customerName}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <CubeIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-600">Product:</span>
          <span className="font-medium ml-1">{quote.productName}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <span className="text-gray-600">Quantity:</span>
          <span className="font-medium ml-1">{quote.quantity}</span>
        </div>
        
        <div className="flex items-center text-sm">
          <CurrencyDollarIcon className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-600">Price per unit:</span>
          <span className="font-medium ml-1">${parseFloat(quote.pricePerUnit).toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t pt-3 mb-4">
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span>${quote.subtotal.toFixed(2)}</span>
          </div>
          {quote.tax > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Tax ({quote.taxRate}%):</span>
              <span>${quote.tax.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold text-primary-600 border-t pt-1">
            <span>Total:</span>
            <span>${quote.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {quote.status === 'unpaid' && (
          <button
            onClick={() => onMarkAsPaid(quote.id)}
            className="btn-primary flex-1 flex items-center justify-center gap-1 text-sm"
          >
            <CheckCircleIcon className="h-4 w-4" />
            Mark as Paid
          </button>
        )}
        <button
          onClick={() => onDelete(quote.id)}
          className="btn-secondary flex items-center justify-center gap-1 text-sm px-3"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default QuoteCard; 