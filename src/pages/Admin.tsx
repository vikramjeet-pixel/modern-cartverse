
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a positive number.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  category: z.string().min(1, {
    message: 'Category is required.',
  }),
  image: z.string().default('/placeholder.svg'),
  features: z.string().optional(),
});

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { products, addProduct } = useStore();
  const [isAdmin, setIsAdmin] = useState(user?.email === 'admin@example.com');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: '',
      description: '',
      category: '',
      image: '/placeholder.svg',
      features: '',
    },
  });

  // Redirect non-admin users
  if (!user || !isAdmin) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
        <p className="mb-6">You need to be logged in as an admin to view this page.</p>
        <Button onClick={() => navigate('/auth')}>Go to Login</Button>
      </div>
    );
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      const newProduct = {
        id: `${products.length + 1}`,
        name: values.name,
        description: values.description,
        price: Number(values.price),
        image: values.image,
        category: values.category,
        features: values.features ? values.features.split(',').map(f => f.trim()) : [],
      };
      
      addProduct(newProduct);
      toast.success('Product added successfully');
      form.reset();
    } catch (error) {
      toast.error('Failed to add product');
      console.error(error);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>
              Fill out the form below to add a new product to your store.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Premium Wireless Headphones" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="299.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="audio" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a single category (e.g., audio, wearables)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Immersive sound quality with noise cancellation technology..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="/products/headphones.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a URL or path to the product image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Active Noise Cancellation, 30-hour Battery Life" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter features separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">Add Product</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
            <CardDescription>
              View, edit, or remove your existing products.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                You currently have {products.length} products in your store.
              </p>
              <Button variant="outline" className="mt-4" onClick={() => navigate('/shop')}>
                View All Products
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              More management features coming soon
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
