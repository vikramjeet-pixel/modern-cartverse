
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  ChevronLeft, 
  Check,
  Minus,
  Plus,
  Share2
} from 'lucide-react';
import { useStore, Product as ProductType } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useStore();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Find related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);
  
  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Product not found, redirect to shop
      navigate('/shop');
    }
    // Reset quantity when product changes
    setQuantity(1);
  }, [id, products, navigate]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  if (!product) {
    return (
      <div className="container-tight py-20 text-center">
        <p>Loading product...</p>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="container-tight">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/shop"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Image */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary/20">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                onLoad={() => setIsImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
              
              <Badge 
                className="absolute top-4 left-4 bg-white/90 text-foreground shadow-sm"
                variant="secondary"
              >
                {product.category}
              </Badge>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl font-medium mb-4">{formatPrice(product.price)}</p>
            
            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>
            
            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Key Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Separator className="my-6" />
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Quantity</h3>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                
                <span className="w-12 h-9 flex items-center justify-center border rounded-md">
                  {quantity}
                </span>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="lg" className="w-full">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Share */}
            <div className="mt-6 flex items-center justify-start">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Share2 className="mr-2 h-4 w-4" />
                Share Product
              </Button>
            </div>
            
            {/* Shipping & Returns */}
            <div className="mt-8 bg-secondary/40 rounded-lg p-4 text-sm">
              <p className="font-medium mb-1">Free shipping & returns</p>
              <p className="text-muted-foreground">Free shipping on orders over $50. Free returns within 30 days.</p>
            </div>
          </div>
        </div>
        
        {/* Tabs - Details, Specs, Reviews */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full max-w-md grid grid-cols-3 mx-auto mb-8">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="animate-in">
              <div className="glass-panel p-6">
                <h3 className="font-medium text-lg mb-4">Product Details</h3>
                <p className="mb-4">
                  {product.description} Designed with precision and care, this premium product offers exceptional performance and elegant design that will exceed your expectations.
                </p>
                <p>
                  Our products are crafted using high-quality materials and undergo rigorous testing to ensure they meet our standards for excellence. We believe in creating products that are not only functional but also aesthetically pleasing.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="animate-in">
              <div className="glass-panel p-6">
                <h3 className="font-medium text-lg mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">General</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between border-b pb-1">
                        <span className="text-muted-foreground">Model</span>
                        <span>MS-{product.id}-PRO</span>
                      </li>
                      <li className="flex justify-between border-b pb-1">
                        <span className="text-muted-foreground">Category</span>
                        <span className="capitalize">{product.category}</span>
                      </li>
                      <li className="flex justify-between border-b pb-1">
                        <span className="text-muted-foreground">Warranty</span>
                        <span>2 Years</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Physical</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between border-b pb-1">
                        <span className="text-muted-foreground">Dimensions</span>
                        <span>5.2 x 3.1 x 1.8 in</span>
                      </li>
                      <li className="flex justify-between border-b pb-1">
                        <span className="text-muted-foreground">Weight</span>
                        <span>320g</span>
                      </li>
                      <li className="flex justify-between border-b pb-1">
                        <span className="text-muted-foreground">Materials</span>
                        <span>Premium Blend</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="animate-in">
              <div className="glass-panel p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-medium text-lg">Customer Reviews</h3>
                  <Button variant="outline" size="sm">Write a Review</Button>
                </div>
                
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No reviews yet for this product.</p>
                  <p className="text-sm mb-4">Be the first to share your experience!</p>
                  <Button>Write a Review</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Button asChild variant="ghost">
                <Link to={`/categories/${product.category}`}>View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
