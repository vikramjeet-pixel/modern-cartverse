
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'T-shirts, hoodies, jeans, and more',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'shoes',
    name: 'Shoes',
    description: 'Sneakers, boots, sandals, and more',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Watches, jewelry, hats, and more',
    image: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Phones, laptops, headphones, and more',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 'home',
    name: 'Home',
    description: 'Furniture, decor, kitchenware, and more',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    description: 'Skincare, makeup, fragrance, and more',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop'
  }
];

const CategoriesPage = () => {
  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Shop by Category</h1>
        <p className="text-muted-foreground">Browse our full catalog of products by category</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div 
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link to={`/categories/${category.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
