import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  features?: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type StoreContextType = {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  addProduct: (product: Product) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Load products
  useEffect(() => {
    // Try to load from localStorage first
    const savedProducts = localStorage.getItem('luxelane-products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Use default products if none exist in localStorage
      const defaultProducts = [
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          description: 'Immersive sound quality with noise cancellation technology and premium build quality.',
          price: 349.99,
          image: '/products/headphones.jpg',
          category: 'audio',
          features: ['Active Noise Cancellation', '30-hour Battery Life', 'Premium Sound Quality']
        },
        {
          id: '2',
          name: 'Ultra-thin Smartwatch',
          description: 'Stay connected with this elegant smartwatch featuring health monitoring and seamless notifications.',
          price: 299.99,
          image: '/products/smartwatch.jpg',
          category: 'wearables',
          features: ['Heart Rate Monitor', 'Sleep Tracking', 'Water Resistant']
        },
        {
          id: '3',
          name: 'Professional Camera Lens',
          description: 'Capture stunning photos with this high-quality professional camera lens with vibrance enhancement.',
          price: 1299.99,
          image: '/products/camera-lens.jpg',
          category: 'photography',
          features: ['Ultra-wide Angle', 'Weather Sealed', 'Fast Autofocus']
        },
        {
          id: '4',
          name: 'Minimalist Desk Lamp',
          description: 'Elegant desk lamp with adjustable brightness and color temperature for your workspace.',
          price: 129.99,
          image: '/products/desk-lamp.jpg',
          category: 'home',
          features: ['Touch Controls', 'Adjustable Brightness', 'USB Charging Port']
        },
        {
          id: '5',
          name: 'Portable Power Bank',
          description: 'High-capacity power bank for charging your devices on the go with fast charging capability.',
          price: 79.99,
          image: '/products/power-bank.jpg',
          category: 'accessories',
          features: ['20,000mAh Capacity', 'Fast Charging', 'Multiple Ports']
        },
        {
          id: '6',
          name: 'Wireless Earbuds',
          description: 'True wireless earbuds with exceptional sound quality and long battery life.',
          price: 199.99,
          image: '/products/earbuds.jpg',
          category: 'audio',
          features: ['Noise Isolation', '24-hour Battery Life', 'Touch Controls']
        },
        {
          id: '7',
          name: 'Smart Home Speaker',
          description: 'Voice-controlled smart speaker with premium sound and virtual assistant.',
          price: 249.99,
          image: '/products/smart-speaker.jpg',
          category: 'audio',
          features: ['Voice Control', 'Multi-room Audio', 'Smart Home Integration']
        },
        {
          id: '8',
          name: 'Ergonomic Keyboard',
          description: 'Comfortable ergonomic keyboard with customizable backlighting and programmable keys.',
          price: 149.99,
          image: '/products/keyboard.jpg',
          category: 'accessories',
          features: ['Mechanical Switches', 'Ergonomic Design', 'Programmable Keys']
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('luxelane-products', JSON.stringify(defaultProducts));
    }
  }, []);

  // Calculate cart total and count whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    setCartTotal(total);
    setCartCount(count);
  }, [cart]);

  // Add product to cart
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        toast.success(`Updated quantity for ${product.name}`);
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`Added ${product.name} to cart`);
        return [...prevCart, { product, quantity }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.product.id === productId);
      if (product) {
        toast.info(`Removed ${product.product.name} from cart`);
      }
      return prevCart.filter(item => item.product.id !== productId);
    });
  };

  // Update quantity of product in cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared");
  };

  // Add new product to the store
  const addProduct = (product: Product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    localStorage.setItem('luxelane-products', JSON.stringify(newProducts));
    toast.success(`Added new product: ${product.name}`);
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      addProduct
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
