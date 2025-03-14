
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';

const HomePage = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 4);
  
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const ctaRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const featuredInView = useInView(featuredRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });
  
  const heroControls = useAnimation();
  const featuredControls = useAnimation();
  const ctaControls = useAnimation();
  
  useEffect(() => {
    if (heroInView) {
      heroControls.start({ opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } });
    }
  }, [heroInView, heroControls]);
  
  useEffect(() => {
    if (featuredInView) {
      featuredControls.start({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } });
    }
  }, [featuredInView, featuredControls]);
  
  useEffect(() => {
    if (ctaInView) {
      ctaControls.start({ opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } });
    }
  }, [ctaInView, ctaControls]);
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={heroControls}
          className="container-tight"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-block mb-4 text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                Premium Quality Products
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
                Discover Modern Design Excellence
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
                Elevate your lifestyle with our carefully curated collection of premium products that combine form and function.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="rounded-full shadow-button font-medium">
                  <Link to="/shop" className="flex items-center">
                    Shop Now
                    <ShoppingBag className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full font-medium">
                  <Link to="/categories">
                    Browse Categories
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/30 blur-3xl rounded-full opacity-40"></div>
              <div className="relative z-10 aspect-square overflow-hidden rounded-xl">
                <img 
                  src="/products/headphones.jpg" 
                  alt="Featured Product" 
                  className="object-cover w-full h-full transition-all hover:scale-105 duration-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -z-10 opacity-20 overflow-hidden">
          <div className="w-[500px] h-[500px] rounded-full bg-primary/30 blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 opacity-20 overflow-hidden">
          <div className="w-[300px] h-[300px] rounded-full bg-accent/40 blur-3xl"></div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section 
        ref={featuredRef}
        className="py-16 md:py-24 bg-secondary/30"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={featuredControls}
          className="container-tight"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <span className="text-sm text-primary font-medium">Curated Selection</span>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            </div>
            <Button asChild variant="ghost" className="mt-4 md:mt-0">
              <Link to="/shop" className="flex items-center">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Categories Highlight */}
      <section className="py-16 md:py-24">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm text-primary font-medium">Browse by Category</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-4">Find What You're Looking For</h2>
            <p className="text-muted-foreground">Explore our wide range of premium products across different categories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/categories/audio" className="group">
              <div className="relative h-80 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <img 
                  src="/products/smart-speaker.jpg" 
                  alt="Audio Category" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
                  <h3 className="text-white text-xl font-bold mb-2">Audio</h3>
                  <p className="text-white/80 text-sm mb-4">Premium sound experiences</p>
                  <span className="text-sm text-white flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
                    Explore Category <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/categories/wearables" className="group">
              <div className="relative h-80 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <img 
                  src="/products/smartwatch.jpg" 
                  alt="Wearables Category" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
                  <h3 className="text-white text-xl font-bold mb-2">Wearables</h3>
                  <p className="text-white/80 text-sm mb-4">Smart technology for everyday life</p>
                  <span className="text-sm text-white flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
                    Explore Category <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
            
            <Link to="/categories/accessories" className="group">
              <div className="relative h-80 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                <img 
                  src="/products/keyboard.jpg" 
                  alt="Accessories Category" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
                  <h3 className="text-white text-xl font-bold mb-2">Accessories</h3>
                  <p className="text-white/80 text-sm mb-4">Essential add-ons for your devices</p>
                  <span className="text-sm text-white flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
                    Explore Category <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="py-16 md:py-24 bg-secondary/40"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={ctaControls}
          className="container-tight"
        >
          <div className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/20 blur-xl opacity-30"></div>
            <div className="relative z-10">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience Premium Quality Today</h2>
                <p className="text-muted-foreground mb-8">
                  Join thousands of satisfied customers who have elevated their lifestyle with our premium products.
                </p>
                <Button asChild size="lg" className="rounded-full shadow-button font-medium">
                  <Link to="/shop">Shop the Collection</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
