import { useEffect, useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FilterSidebar from './components/FilterSidebar';
import ReleaseGrid from './components/ReleaseGrid';
import type { ReleaseSort } from './components/ReleaseGrid';
import Footer from './components/Footer';
import SubpageContent from './components/SubpageContent';
import type { SubpageKey } from './components/SubpageContent';
import type { CartItem, CartItemInput } from './components/SubpageContent';
import { Toaster, toast } from 'sonner';
import { HandMetal } from 'lucide-react';

type AppPage = 'releases' | SubpageKey;
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>('releases');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [releaseSort, setReleaseSort] = useState<ReleaseSort>('newest');
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (item: CartItemInput) => {
    const existingLine = cartItems.find((line) => line.id === item.id);
    setCartItems((prev) => {
      const existing = prev.find((line) => line.id === item.id);
      if (existing) {
        return prev.map((line) => (line.id === item.id ? { ...line, qty: line.qty + 1 } : line));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    toast.warning('Added to cart', {
      icon: <HandMetal size={16} color="#00FF5A" />,
      description: existingLine
        ? `${item.artist} - ${item.name} (qty increased)`
        : `${item.artist} - ${item.name}`,
      duration: 1800,
    });
  };

  const updateCartQty = (id: string, qty: number) => {
    setCartItems((prev) => prev.map((line) => (line.id === id ? { ...line, qty: Math.max(1, qty) } : line)));
  };

  const removeCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((line) => line.id !== id));
  };
  const clearCart = () => setCartItems([]);
  const navigateTo = (page: AppPage) => {
    setActivePage(page);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileFiltersOpen(false);
  }, [activePage]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            `linear-gradient(rgba(6, 10, 6, 0.56), rgba(6, 10, 6, 0.68)), url('${asset('/bg1.png')}')`,
        }}
      />
      <Header onHome={() => navigateTo('releases')} />
      <Navigation activePage={activePage} onNavigate={navigateTo} cartCount={cartCount} />
      {activePage === 'releases' ? (
        <>
          <Hero onEnterStore={() => navigateTo('distro')} />

          <main id="releases-catalog" className="container mx-auto px-4 py-8 sm:py-12">
            <div className="mb-4 lg:hidden">
              <button
                onClick={() => setMobileFiltersOpen((prev) => !prev)}
                className="border border-[#00FF5A]/70 px-4 py-2 text-[#00FF5A] uppercase hover:bg-[#00FF5A] hover:text-[#131e13]"
                style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em' }}
              >
                {mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
              </button>
              <p
                className="mt-3"
                style={{
                  fontSize: '0.75rem',
                  color: '#769a75',
                  letterSpacing: '0.05em'
                }}
              >
                Showing 31 releases
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
              <div className={`${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
                <FilterSidebar />
              </div>

              <div className="flex-1 rounded-sm border border-[#769a75]/35 bg-[#0c130ce0] p-6">
                <div className="mb-8 flex items-center justify-between">
                  <h2
                    className="uppercase"
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: '#f4fbf3'
                    }}
                  >
                    LABEL CATALOG
                  </h2>

                  <div className="flex gap-4 items-center">
                    <span
                      className="hidden lg:inline"
                      style={{
                        fontSize: '0.75rem',
                        color: '#769a75',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Showing 31 releases
                    </span>

                    <select
                      value={releaseSort}
                      onChange={(event) => setReleaseSort(event.target.value as ReleaseSort)}
                      className="bg-[#101910b3] border border-[#769a75] text-[#f4fbf3] px-4 py-2 uppercase cursor-pointer hover:border-[#00FF5A] focus:border-[#00FF5A] focus:outline-none transition-colors"
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em'
                      }}
                    >
                      <option value="newest" className="bg-[#131e13]">Newest First</option>
                      <option value="oldest" className="bg-[#131e13]">Oldest First</option>
                      <option value="price-low" className="bg-[#131e13]">Price: Low to High</option>
                      <option value="price-high" className="bg-[#131e13]">Price: High to Low</option>
                      <option value="artist" className="bg-[#131e13]">Artist A-Z</option>
                    </select>
                  </div>
                </div>

                <ReleaseGrid sortBy={releaseSort} onAddToCart={addToCart} />
              </div>
            </div>
          </main>
        </>
      ) : (
        <SubpageContent
          page={activePage}
          onNavigate={navigateTo}
          cartItems={cartItems}
          onAddToCart={addToCart}
          onUpdateCartQty={updateCartQty}
          onRemoveCartItem={removeCartItem}
          onClearCart={clearCart}
        />
      )}

      <Footer onNavigate={navigateTo} />
      <Toaster
        position="top-center"
        closeButton
        toastOptions={{
          style: {
            background: '#131e13',
            border: '1px solid #769a75',
            color: '#f4fbf3',
          },
          className: 'uppercase',
          descriptionClassName: '!text-[#f4fbf3] !opacity-90',
        }}
      />
    </div>
  );
}
