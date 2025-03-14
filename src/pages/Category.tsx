
import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { products } = useStore();
  
  // Filter products by the current category
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === category?.toLowerCase()
  );
  
  // Get category display name with proper capitalization
  const displayCategory = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : '';

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{displayCategory}</h1>
        <p className="text-muted-foreground">
          {filteredProducts.length} products found in this category
        </p>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground">
            We couldn't find any products in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
