import React from 'react';
import BillingTable from '../components/BillingTable';

const BillingDashboard = ({ quotes, onMarkAsPaid, onDelete }) => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Invoice Dashboard
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Manage all your invoices and track your revenue with our comprehensive dashboard
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