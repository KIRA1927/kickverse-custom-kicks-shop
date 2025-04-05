
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Package, Truck, Calendar, Eye, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: 'stripe' | 'cod';
  tracking_number?: string;
  items: any[];
}

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Filter orders by status
  const getOrdersByStatus = (status: string) => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  // Format date string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get status icon and color
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: <Calendar size={16} />, color: 'bg-blue-100 text-blue-800' };
      case 'processing':
        return { icon: <Package size={16} />, color: 'bg-amber-100 text-amber-800' };
      case 'shipped':
        return { icon: <Truck size={16} />, color: 'bg-purple-100 text-purple-800' };
      case 'delivered':
        return { icon: <Package size={16} />, color: 'bg-green-100 text-green-800' };
      case 'cancelled':
        return { icon: <Package size={16} />, color: 'bg-red-100 text-red-800' };
      default:
        return { icon: <Package size={16} />, color: 'bg-gray-100 text-gray-800' };
    }
  };

  // Order card component
  const OrderCard = ({ order }: { order: Order }) => {
    const statusDisplay = getStatusDisplay(order.status);
    
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
          <div>
            <span className="text-sm text-gray-500">Order #</span>
            <span className="font-medium ml-1">{order.id.substring(0, 8)}</span>
          </div>
          <div className={`px-3 py-1 rounded-full flex items-center text-xs font-medium ${statusDisplay.color}`}>
            {statusDisplay.icon}
            <span className="ml-1 capitalize">{order.status}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-sm text-gray-500">Date</span>
            <span className="font-medium ml-1">
              {formatDate(order.created_at)}
            </span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Total</span>
            <span className="font-medium ml-1">${order.total_amount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mb-3">
          <span className="text-sm text-gray-500">Items</span>
          <span className="font-medium ml-1">{order.items.length} products</span>
        </div>
        
        {order.tracking_number && (
          <div className="mb-3">
            <span className="text-sm text-gray-500">Tracking #</span>
            <span className="font-medium ml-1">{order.tracking_number}</span>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t">
          <Button 
            variant="ghost" 
            size="sm"
            asChild
          >
            <Link to={`/order/${order.id}`}>
              <Eye size={16} className="mr-1" />
              View Details
            </Link>
          </Button>
          
          {order.status === 'shipped' && (
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <Link to={`/tracking/${order.tracking_number}`}>
                <Truck size={16} className="mr-1" />
                Track Order
              </Link>
            </Button>
          )}
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please log in</h2>
            <p className="text-gray-600 mb-8">
              You need to log in to view your order history.
            </p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <p>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-3">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search orders by order number, product name, etc."
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <Tabs defaultValue="all">
              <TabsList className="w-full justify-start border-b mb-6 overflow-x-auto">
                <TabsTrigger value="all">
                  All Orders <span className="ml-1 text-xs bg-gray-200 px-2 py-1 rounded-full">{orders.length}</span>
                </TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {getOrdersByStatus('all').map(order => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pending">
                <div className="space-y-4">
                  {getOrdersByStatus('pending').length > 0 ? (
                    getOrdersByStatus('pending').map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <p className="text-center py-6 text-gray-500">No pending orders found.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="processing">
                <div className="space-y-4">
                  {getOrdersByStatus('processing').length > 0 ? (
                    getOrdersByStatus('processing').map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <p className="text-center py-6 text-gray-500">No processing orders found.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="shipped">
                <div className="space-y-4">
                  {getOrdersByStatus('shipped').length > 0 ? (
                    getOrdersByStatus('shipped').map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <p className="text-center py-6 text-gray-500">No shipped orders found.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="delivered">
                <div className="space-y-4">
                  {getOrdersByStatus('delivered').length > 0 ? (
                    getOrdersByStatus('delivered').map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <p className="text-center py-6 text-gray-500">No delivered orders found.</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="cancelled">
                <div className="space-y-4">
                  {getOrdersByStatus('cancelled').length > 0 ? (
                    getOrdersByStatus('cancelled').map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))
                  ) : (
                    <p className="text-center py-6 text-gray-500">No cancelled orders found.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
