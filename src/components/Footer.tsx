
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 pt-16 pb-8">
      <div className="container-tight">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h3 className="font-display font-bold text-xl">
                Luxe<span className="text-primary">Lane</span>
              </h3>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Discover premium products with modern design and exceptional quality. Elevate your lifestyle.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/categories/audio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Audio
                </Link>
              </li>
              <li>
                <Link to="/categories/wearables" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Wearables
                </Link>
              </li>
              <li>
                <Link to="/categories/accessories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/categories/home" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-muted-foreground">
                <Mail size={14} className="mr-2" />
                <span>support@luxelane.com</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Phone size={14} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium text-base mb-2">Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Subscribe for updates on new products and promotions.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/50 dark:bg-white/10 text-sm rounded-l-md border border-border px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-r-md px-3 py-2 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} LuxeLane. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
