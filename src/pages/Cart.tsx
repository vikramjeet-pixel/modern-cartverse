
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/CartItem';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { cart, clearCart, cartTotal } = useStore();
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  if (cart.length === 0) {
    return (
      <div className="container-tight py-20 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="container-tight">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
          <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">
            <X className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel p-6"
            >
              <div className="divide-y">
                {cart.map((item, index) => (
                  <motion.div 
                    key={item.product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6 sticky top-24"
            >
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{cartTotal > 50 ? 'Free' : formatPrice(10)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(cartTotal * 0.08)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total</span>
                <span>{formatPrice(cartTotal + (cartTotal > 50 ? 0 : 10) + (cartTotal * 0.08))}</span>
              </div>
              
              <Button asChild className="w-full" size="lg">
                <Link to="/checkout" className="flex items-center justify-center">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <div className="mt-4 text-center">
                <Link 
                  to="/shop" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
              
              <div className="mt-6 pt-4 border-t text-xs text-muted-foreground">
                <p className="mb-2">We accept:</p>
                <div className="flex space-x-2">
                  <span className="bg-secondary py-1 px-2 rounded">Visa</span>
                  <span className="bg-secondary py-1 px-2 rounded">Mastercard</span>
                  <span className="bg-secondary py-1 px-2 rounded">PayPal</span>
                  <span className="bg-secondary py-1 px-2 rounded">Apple Pay</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
