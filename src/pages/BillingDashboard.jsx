import React from 'react';
import BillingTable from '../components/BillingTable';

const BillingDashboard = ({ quotes, onMarkAsPaid, onDelete }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Billing Dashboard
          </h1>
          <p className="text-gray-600">
            Manage all your quotes and track your revenue
          </p>
        </div>
        
        <BillingTable 
          quotes={quotes}
          onMarkAsPaid={onMarkAsPaid}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};

export default BillingDashboard; 