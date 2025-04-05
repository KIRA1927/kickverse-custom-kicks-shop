
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Package, Truck, Clock } from 'lucide-react';
import { Steps, Step } from '@/components/ui/steps';

interface TrackingInfoCardProps {
  trackingNumber: string;
  deliveryDate: string;
  paymentMethod: string;
}

export const TrackingInfoCard: React.FC<TrackingInfoCardProps> = ({
  trackingNumber,
  deliveryDate,
  paymentMethod
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Tracking Information</CardTitle>
        <CardDescription>
          Your order is on its way! Estimated delivery: {deliveryDate}
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
  );
};
