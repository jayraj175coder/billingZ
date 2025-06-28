import React, { useState } from 'react';
import { CalculatorIcon, UserIcon, CubeIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const QuoteForm = ({ onGenerateQuote }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    pricePerUnit: '',
    taxRate: '0'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    const quantity = parseFloat(formData.quantity) || 0;
    const price = parseFloat(formData.pricePerUnit) || 0;
    const taxRate = parseFloat(formData.taxRate) || 0;
    
    const subtotal = quantity * price;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.productName || !formData.quantity || !formData.pricePerUnit) {
      alert('Please fill in all required fields');
      return;
    }
    
    const { subtotal, tax, total } = calculateTotal();
    const quote = {
      id: Date.now(),
      ...formData,
      subtotal,
      tax,
      total,
      status: 'unpaid',
      createdAt: new Date().toISOString()
    };
    
    onGenerateQuote(quote);
    setFormData({
      customerName: '',
      productName: '',
      quantity: '',
      pricePerUnit: '',
      taxRate: '0'
    });
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <CalculatorIcon className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Create New Quote</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserIcon className="h-4 w-4 inline mr-1" />
              Customer Name *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter customer name"
              required
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CubeIcon className="h-4 w-4 inline mr-1" />
              Product Name *
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="input-field"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="input-field"
              placeholder="0"
              min="1"
              required
            />
          </div>

          {/* Price Per Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CurrencyDollarIcon className="h-4 w-4 inline mr-1" />
              Price per Unit *
            </label>
            <input
              type="number"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleInputChange}
              className="input-field"
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Tax Rate */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              name="taxRate"
              value={formData.taxRate}
              onChange={handleInputChange}
              className="input-field"
              placeholder="0"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quote Preview</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax ({formData.taxRate}%):</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-primary-600 border-t pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <CalculatorIcon className="h-5 w-5" />
          Generate Quote
        </button>
      </form>
    </div>
  );
};

export default QuoteForm; 