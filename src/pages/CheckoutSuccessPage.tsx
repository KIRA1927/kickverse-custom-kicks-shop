
import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Truck, Clock, ShoppingBag } from 'lucide-react';
import { Steps, Step } from '@/components/ui/steps';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

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
          {/* Success Message */}
          <div className="text-center mb-10">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase. Your order has been received.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
              <CardDescription>Here's a summary of your order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order Number</p>
                  <p className="font-medium">{orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">
                    {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tracking Information</CardTitle>
              <CardDescription>
                Your order is on its way! Estimated delivery: {formattedDeliveryDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-sm text-gray-500">Tracking Number</p>
                <p className="font-medium">{trackingNumber}</p>
              </div>

              <Steps currentStep={paymentMethod === 'cod' ? 0 : 1} orientation="horizontal">
                <Step icon={<ShoppingBag />} title="Order Placed" description="Order confirmed" />
                <Step icon={<Package />} title="Processing" description="Preparing your items" />
                <Step icon={<Truck />} title="Shipping" description="On the way" />
                <Step icon={<Clock />} title="Delivery" description="Arriving soon" />
              </Steps>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link to={`/tracking/${trackingNumber}`}>
                <Button variant="outline">Track Your Order</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Next Steps */}
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
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccessPage;
