
import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { OrderSummaryCard } from '@/components/checkout/OrderSummaryCard';
import { TrackingInfoCard } from '@/components/checkout/TrackingInfoCard';

const CheckoutSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, paymentMethod, email } = location.state || {};

  useEffect(() => {
    // Redirect if no order info is available
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null; // Will redirect in useEffect
  }

  // Generate a tracking number
  const trackingNumber = `KV${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

  // Generate an estimated delivery date (7-10 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 4) + 7);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <OrderSuccessHeader />
          <OrderSummaryCard 
            orderId={orderId}
            paymentMethod={paymentMethod}
            email={email}
          />
          <TrackingInfoCard 
            trackingNumber={trackingNumber}
            deliveryDate={formattedDeliveryDate}
            paymentMethod={paymentMethod}
          />
          <ActionButtons />
        </div>
      </div>
    </Layout>
  );
};

const OrderSuccessHeader = () => (
  <div className="text-center mb-10">
    <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
      <CheckCircle size={48} className="text-green-600" />
    </div>
    <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
    <p className="text-xl text-gray-600">
      Thank you for your purchase. Your order has been received.
    </p>
  </div>
);

const ActionButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Link to="/products">
      <Button variant="outline" className="w-full">
        Continue Shopping
      </Button>
    </Link>
    <Link to="/orders">
      <Button className="w-full">
        View All Orders
      </Button>
    </Link>
  </div>
);

// Import needed components
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default CheckoutSuccessPage;
