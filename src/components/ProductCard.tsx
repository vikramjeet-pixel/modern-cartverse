
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useStore, Product } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useStore();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card 
        className={`overflow-hidden h-full transition-all duration-300 bg-white border-none group hover:shadow-glass-lg ${
          isHovered ? 'scale-[1.02]' : 'scale-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10 transition-opacity duration-300 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
          
          <Link to={`/product/${product.id}`}>
            <div className="image-container w-full h-full">
              <img
                ref={imageRef}
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                onLoad={handleImageLoad}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isImageLoaded ? 'image-loaded' : 'image-loading'
                } ${isHovered ? 'scale-110' : 'scale-100'}`}
              />
            </div>
          </Link>
          
          {/* Quick actions overlay */}
          <div 
            className={`absolute inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Button 
              size="icon" 
              variant="secondary" 
              className="bg-white/90 shadow-sm" 
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="bg-white/90 shadow-sm"
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          
          {/* Category badge */}
          <Badge 
            className="absolute top-2 left-2 z-20 bg-white/90 text-foreground shadow-sm"
            variant="secondary"
          >
            {product.category}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <Link to={`/product/${product.id}`} className="block group-hover:text-primary transition-colors">
            <h3 className="font-medium text-base mb-1 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="font-medium">
              {formatPrice(product.price)}
            </p>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-xs" 
              onClick={() => addToCart(product)}
            >
              Add to cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
