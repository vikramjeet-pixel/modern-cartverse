
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "@/context/StoreContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

// Pages
import HomePage from "./pages/Index";
import ShopPage from "./pages/Shop";
import ProductPage from "./pages/Product";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import AccountPage from "./pages/Account";
import CategoriesPage from "./pages/Categories";
import CategoryPage from "./pages/Category";
import AboutPage from "./pages/About";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/Search";
import AdminPage from "./pages/Admin";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <StoreProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-16 md:pt-20">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/categories/:category" element={<CategoryPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </StoreProvider>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
