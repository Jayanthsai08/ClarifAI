"use client"
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useMutation } from 'convex/react'
import React, { useState } from 'react'
import { FiCheckCircle, FiCreditCard, FiAlertCircle, FiInfo } from 'react-icons/fi'
import { api } from '../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'  // Correct import for Next.js 13+

function Payment() {
  // 1. Get user from Clerk
  const { user } = useUser();

  const [message, setMessage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false);  // To track payment success state

  // 2. Mutation
  const userUpgradePlan = useMutation(api.user.userUpgradePlan);

  // 3. PayPal logic
  const createOrder = (data, actions) => {
    setIsProcessing(true);
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: '4.99',
          currency_code: 'USD'
        }
      }]
    })
  }

  const onApprove = async (data, actions) => {
    try {
        if (!user || !user.primaryEmailAddress?.emailAddress) {
            setMessage({ type: 'error', text: 'No user is logged in or email is missing.' });
            return;
        }

        const details = await actions.order.capture();
        setMessage({ 
            type: 'success', 
            text: `Payment completed! Thank you, ${details.payer.name.given_name}!`
        });

        console.log("✅ Payment Success. Upgrading user plan...");

        const result = await userUpgradePlan({
            userEmail: user.primaryEmailAddress.emailAddress,
            // ✅ Ensure email is passed correctly
        });

        console.log("User Upgrade Response:", result);
        
        if (result.status === 'error') {
            setMessage({ type: 'error', text: 'User not found. Please contact support.' });
        } else {
            // Mark payment as successful and show success animation and message
            setPaymentSuccess(true);
        }
    } catch (err) {
        console.error("❌ Payment Upgrade Error:", err);
        setMessage({ type: 'error', text: `Payment failed: ${err.message}` });
    }
    toast('Plan upgraded Successfully');
    setIsProcessing(false);
  };

  const onError = (err) => {
    setMessage({ type: 'error', text: `Payment error: ${err.message}` })
    setIsProcessing(false)
  }

  const onCancel = () => {
    setMessage({
      type: 'info',
      text: 'Payment cancelled. You can try again if you wish.'
    })
    setIsProcessing(false)
  }

  const router = useRouter();  // Initialize router for navigation (from next/navigation)

  // 5. Render
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: "url('/pattern.png')" }}>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Your Purchase
          </h1>
          <p className="text-lg text-gray-600">
            Secure payment processing powered by PayPal
          </p>
        </div>

        <div className="rounded-3xl shadow-lg p-8 sm:p-12 transition-all backdrop-blur-lg bg-opacity-30">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Premium Plan</h2>
              <p className="text-gray-500 mt-1">One-time payment</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-bold text-purple-600">$4.99</span>
              <p className="text-sm text-gray-500">+ applicable taxes</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <FiCreditCard className="w-6 h-6 text-blue-600" />
                <span className="font-medium text-blue-800">
                  Secure Payment Methods
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {message && (
                <div
                  className={`p-4 rounded-xl flex items-start space-x-3 ${
                    message.type === 'success'
                      ? 'bg-green-50 border border-green-200'
                      : message.type === 'error'
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  {message.type === 'success' ? (
                    <FiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : message.type === 'error' ? (
                    <FiAlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  ) : (
                    <FiInfo className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  )}
                  <p
                    className={`text-sm ${
                      message.type === 'success'
                        ? 'text-green-700'
                        : message.type === 'error'
                        ? 'text-red-700'
                        : 'text-blue-700'
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              )}

              {isProcessing && (
                <div className="flex items-center justify-center space-x-2 text-purple-600">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <span>Processing your payment...</span>
                </div>
              )}

              {paymentSuccess && (
                <div className="text-center">
                  <div className="animate-bounce text-4xl text-green-500">
                    <FiCheckCircle className="inline-block" />
                  </div>
                  <p className="text-xl text-green-600 mt-4">Payment Completed Successfully!</p>
                  <button
                    className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-800"
                    onClick={() => router.push('/dashboard')}  // Use router.push for navigation
                  >
                    Go Back to Dashboard
                  </button>
                </div>
              )}

              {!paymentSuccess && (
                <div className="border-t border-gray-200 pt-6">
                  <PayPalButtons
                    style={{
                      layout: 'vertical',
                      color: 'gold',
                      shape: 'pill',
                      label: 'checkout',
                      height: 48,
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    onCancel={onCancel}
                  />
                </div>
              )}
            </div>

            <div className="text-center pt-6">
              <p className="text-sm text-gray-500">
                <span className="inline-block border-t border-gray-200 pt-4">
                  256-bit SSL encryption · Money-back guarantee
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Payment method logos */}
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto opacity-75">
          <div className="col-span-1 flex justify-center items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg"
              className="h-8"
              alt="PayPal"
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              className="h-8"
              alt="Mastercard"
            />
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              className="h-8"
              alt="Visa"
            />
          </div>
          <div className="col-span-1 flex justify-center items-center ml-3 mt-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/RuPay.svg/1920px-RuPay.svg.png"
              className="h-8"
              alt="Rupay"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;
