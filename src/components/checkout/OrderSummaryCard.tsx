
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface OrderSummaryCardProps {
  orderId: string;
  paymentMethod: string;
  email: string;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ 
  orderId, 
  paymentMethod, 
  email 
}) => {
  return (
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
  );
};
