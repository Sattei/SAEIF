import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCreditCard, FaQrcode, FaUniversity, FaLock, FaCheckCircle } from 'react-icons/fa';

const API = process.env.REACT_APP_API || '';

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchPlanDetails = useCallback(async (planType) => {
    try {
      const response = await fetch(`${API}/api/membership/plans`);
      const plans = await response.json();
      const plan = plans.find(p => p.planType === planType);
      if (plan) {
        setSelectedPlan(plan);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching plan details:', error);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    if (plan) {
      fetchPlanDetails(plan);
    } else {
      navigate('/login');
    }
  }, [location, navigate, fetchPlanDetails]);

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        throw new Error('Authentication required');
      }

      // Update user membership
      const response = await fetch(`${API}/api/membership/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          membershipPlan: selectedPlan.planType,
          paymentStatus: 'completed',
          paymentAmount: selectedPlan.price
        })
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/members');
      }, 3000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-green-800 mb-4">Payment Successful!</h1>
          <p className="text-green-600 mb-6">Your membership has been activated. Redirecting to member dashboard...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Complete Your Payment</h1>
          <p className="text-gray-600">You're just one step away from accessing exclusive content</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Plan Summary</h2>
            
            <div className="bg-gradient-to-r from-primary to-darkblue rounded-xl p-6 text-white mb-6">
              <h3 className="text-xl font-semibold mb-2">{selectedPlan.name}</h3>
              <p className="text-white/80 mb-4">
                {selectedPlan.duration === 0 ? 'Lifetime access' : `${selectedPlan.duration} months access`}
              </p>
              <div className="text-3xl font-bold">{formatPrice(selectedPlan.price)}</div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">What's included:</h4>
              <ul className="space-y-2">
                {selectedPlan.features.slice(0, 5).map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
                {selectedPlan.features.length > 5 && (
                  <li className="text-accent text-sm font-medium">
                    +{selectedPlan.features.length - 5} more features
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Payment Method</h2>

            <div className="space-y-4 mb-6">
              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-accent transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-accent focus:ring-accent"
                />
                <div className="ml-4 flex items-center">
                  <FaCreditCard className="text-2xl text-accent mr-3" />
                  <div>
                    <div className="font-semibold text-gray-800">Online Payment</div>
                    <div className="text-sm text-gray-600">Credit/Debit Card, UPI, Net Banking</div>
                  </div>
                </div>
              </label>

              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-accent transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="qr"
                  checked={paymentMethod === 'qr'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-accent focus:ring-accent"
                />
                <div className="ml-4 flex items-center">
                  <FaQrcode className="text-2xl text-accent mr-3" />
                  <div>
                    <div className="font-semibold text-gray-800">QR Code Payment</div>
                    <div className="text-sm text-gray-600">Scan QR code with any UPI app</div>
                  </div>
                </div>
              </label>

              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-accent transition">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-accent focus:ring-accent"
                />
                <div className="ml-4 flex items-center">
                  <FaUniversity className="text-2xl text-accent mr-3" />
                  <div>
                    <div className="font-semibold text-gray-800">Bank Transfer</div>
                    <div className="text-sm text-gray-600">Direct bank transfer details</div>
                  </div>
                </div>
              </label>
            </div>

            {paymentMethod === 'qr' && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-center">
                <div className="bg-white p-4 rounded-lg inline-block mb-4">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">QR Code Placeholder</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Scan this QR code with any UPI app to pay {formatPrice(selectedPlan.price)}
                </p>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">Bank Transfer Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Name:</span>
                    <span className="font-medium">SAEIF SKILL AID EMPOWER INDIA FOUNDATION</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Account Number:</span>
                    <span className="font-medium">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IFSC Code:</span>
                    <span className="font-medium">SBIN0001234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank Name:</span>
                    <span className="font-medium">State Bank of India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium text-accent">{formatPrice(selectedPlan.price)}</span>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-accent text-white py-4 px-6 rounded-xl font-semibold hover:bg-accent/90 transition disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <FaLock className="text-sm" />
                  <span>Pay {formatPrice(selectedPlan.price)}</span>
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Your payment is secured with SSL encryption
              </p>
            </div>
          </div>
        </div>

        {/* Trust and Responsibility Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Trust & Responsibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-2xl text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">All transactions are encrypted and secure</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-2xl text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Instant Access</h3>
              <p className="text-gray-600 text-sm">Get immediate access after payment confirmation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-2xl text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Money Back Guarantee</h3>
              <p className="text-gray-600 text-sm">30-day money-back guarantee if not satisfied</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 