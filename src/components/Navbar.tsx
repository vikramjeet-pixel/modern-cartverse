
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, LogIn, LayoutDashboard } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useStore();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is admin based on email
    if (user) {
      setIsAdmin(user.email === 'admin@example.com');
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    } else {
      navigate('/search');
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-tight">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display font-bold text-xl md:text-2xl hover:opacity-80 transition-opacity"
          >
            Luxe<span className="text-primary">Lane</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Cart, Account, etc */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full md:w-[180px] lg:w-[250px] pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0"
                type="submit"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="w-full cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                <Link to="/auth">
                  <LogIn className="h-5 w-5" />
                  <span className="sr-only">Sign In</span>
                </Link>
              </Button>
            )}
            
            <div className="relative">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                  {cartCount > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full py-6">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display font-bold text-xl">
                      Luxe<span className="text-primary">Lane</span>
                    </span>
                  </div>
                  
                  <form onSubmit={handleSearch} className="mb-6">
                    <div className="flex items-center relative">
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pr-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0"
                        type="submit"
                      >
                        <Search className="h-5 w-5" />
                      </Button>
                    </div>
                  </form>
                  
                  <nav className="flex flex-col space-y-6 mb-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`text-lg font-medium transition-colors hover:text-primary ${
                          location.pathname === item.href ? 'text-primary' : 'text-foreground/80'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="flex flex-col space-y-4 mt-auto">
                    <div className="flex justify-between items-center px-2 py-2 border rounded-md">
                      <span>Theme</span>
                      <ThemeToggle />
                    </div>
                    
                    {user ? (
                      <>
                        <Button asChild variant="outline" className="w-full justify-start">
                          <Link to="/account" className="flex items-center">
                            <User className="mr-2 h-5 w-5" />
                            Account
                          </Link>
                        </Button>
                        
                        {isAdmin && (
                          <Button asChild variant="outline" className="w-full justify-start">
                            <Link to="/admin" className="flex items-center">
                              <LayoutDashboard className="mr-2 h-5 w-5" />
                              Admin Dashboard
                            </Link>
                          </Button>
                        )}
                        
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => signOut()}
                        >
                          <LogOut className="mr-2 h-5 w-5" />
                          Sign out
                        </Button>
                      </>
                    ) : (
                      <Button asChild variant="outline" className="w-full justify-start">
                        <Link to="/auth" className="flex items-center">
                          <LogIn className="mr-2 h-5 w-5" />
                          Sign In
                        </Link>
                      </Button>
                    )}
                    
                    <Button asChild variant="default" className="w-full justify-start">
                      <Link to="/cart" className="flex items-center">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Cart
                        {cartCount > 0 && (
                          <Badge className="ml-auto">{cartCount}</Badge>
                        )}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
