
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">About Our Store</h1>
          <p className="text-lg text-muted-foreground">
            Crafting exceptional shopping experiences since 2023
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="aspect-video rounded-lg overflow-hidden mb-12">
            <img 
              src="https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop" 
              alt="Our store" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          
          <p className="mb-6 text-muted-foreground">
            Founded in 2023, our e-commerce store was born from a passion for quality products and exceptional customer experiences. What started as a small online boutique has grown into a destination for customers seeking curated collections of the finest goods.
          </p>
          
          <p className="mb-10 text-muted-foreground">
            We believe in the power of thoughtful design, sustainable practices, and building lasting relationships with our customers. Every product in our store is carefully selected to ensure it meets our standards for quality, functionality, and style.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Quality First</h3>
              <p className="text-muted-foreground">We source only the highest quality products from trusted suppliers around the world.</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Customer Focused</h3>
              <p className="text-muted-foreground">Your satisfaction is our priority, with responsive support and hassle-free returns.</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">We're committed to reducing our environmental impact through responsible practices.</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          
          <p className="mb-8 text-muted-foreground">
            Behind every great product is a team of dedicated individuals passionate about what they do. Our diverse team brings together expertise from retail, design, technology, and customer service to create an exceptional shopping experience from browse to unbox.
          </p>
          
          <div className="text-center mb-8">
            <Button size="lg">
              Join Our Team
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
