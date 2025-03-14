
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useStore();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState(products);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);
    
    if (searchQuery) {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(products);
    }
  }, [searchParams, products]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Products</h1>
        
        <form onSubmit={handleSearch} className="flex w-full max-w-lg gap-2 mb-8">
          <Input
            type="search"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </button>
        </form>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground">
            We couldn't find any products matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
