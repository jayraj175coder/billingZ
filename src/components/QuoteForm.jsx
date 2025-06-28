import React, { useState } from 'react';
import { CalculatorIcon, UserIcon, CubeIcon, CurrencyDollarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const QuoteForm = ({ onGenerateQuote }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    pricePerUnit: '',
    taxRate: '0'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }
    
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }
    
    if (!formData.pricePerUnit || parseFloat(formData.pricePerUnit) <= 0) {
      newErrors.pricePerUnit = 'Price must be greater than 0';
    }
    
    if (parseFloat(formData.taxRate) < 0 || parseFloat(formData.taxRate) > 100) {
      newErrors.taxRate = 'Tax rate must be between 0 and 100';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
    setErrors({});
    setIsSubmitting(false);
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
              className={`input-field ${errors.customerName ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter customer name"
              required
            />
            {errors.customerName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                {errors.customerName}
              </p>
            )}
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
              className={`input-field ${errors.productName ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="Enter product name"
              required
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                {errors.productName}
              </p>
            )}
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
              className={`input-field ${errors.quantity ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="0"
              min="1"
              required
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                {errors.quantity}
              </p>
            )}
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
              className={`input-field ${errors.pricePerUnit ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
            {errors.pricePerUnit && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                {errors.pricePerUnit}
              </p>
            )}
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
              className={`input-field ${errors.taxRate ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder="0"
              min="0"
              max="100"
              step="0.01"
            />
            {errors.taxRate && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                {errors.taxRate}
              </p>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CalculatorIcon className="h-5 w-5 mr-2 text-blue-600" />
            Quote Preview
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax ({formData.taxRate}%):</span>
              <span className="font-medium">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-primary-600 border-t pt-3">
              <span>Total:</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn-primary w-full flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Generating Quote...
            </>
          ) : (
            <>
              <CalculatorIcon className="h-5 w-5" />
              Generate Quote
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default QuoteForm; 