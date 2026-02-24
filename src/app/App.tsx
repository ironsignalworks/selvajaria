import { useEffect, useState, type FormEvent } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FilterSidebar from './components/FilterSidebar';
import type { CatalogFilters } from './components/FilterSidebar';
import ReleaseGrid, { releases } from './components/ReleaseGrid';
import type { ReleaseSort } from './components/ReleaseGrid';
import Footer from './components/Footer';
import SubpageContent from './components/SubpageContent';
import type { SubpageKey } from './components/SubpageContent';
import type { CartItem, CartItemInput } from './components/SubpageContent';
import { Toaster, toast } from 'sonner';
import { ChevronUp, HandMetal } from 'lucide-react';

type AppPage = 'releases' | 'search' | SubpageKey;
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
const EMPTY_CATALOG_FILTERS: CatalogFilters = {
  formats: [],
  genres: [],
  countries: [],
  inStockOnly: false,
};

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>('releases');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [releaseSort, setReleaseSort] = useState<ReleaseSort>('newest');
  const [catalogFilters, setCatalogFilters] = useState<CatalogFilters>(EMPTY_CATALOG_FILTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
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
      icon: <HandMetal size={16} color="#00C747" />,
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
  const handleSearchSubmit = () => {
    const query = searchQuery.trim();
    if (!query) {
      navigateTo('releases');
      return;
    }
    setSearchPanelOpen(true);
  };
  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) setSearchPanelOpen(true);
  };
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const searchResults = normalizedSearch
    ? releases.filter((release) =>
        [release.artist, release.title, release.genre].some((field) => field.toLowerCase().includes(normalizedSearch))
      )
    : [];
  const searchPreview = searchResults.slice(0, 4);
  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newsletterEmail.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!newsletterConsent) {
      toast.error('Please agree to the newsletter consent.');
      return;
    }
    toast.success('Subscribed to Selvajaria newsletter.');
    setNewsletterEmail('');
    setNewsletterConsent(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileFiltersOpen(false);
  }, [activePage]);

  useEffect(() => {
    const onScroll = () => {
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      setShowBackToTop(window.scrollY > (mobile ? 160 : 380));
      setParallaxOffset(Math.min(window.scrollY * 0.12, 220));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-[#050805] pt-24 md:pt-44">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#131e13] focus:px-4 focus:py-2 focus:text-[#f4fbf3] focus:outline focus:outline-2 focus:outline-[#00C747]"
      >
        Skip to main content
      </a>
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 top-16 z-0 bg-[#050805] bg-cover bg-no-repeat md:top-32"
        style={{
          backgroundImage: `url('${asset('/bg1.jpg')}')`,
          backgroundPosition: `center ${-parallaxOffset}px`,
          willChange: 'background-position',
        }}
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 top-16 z-[1] bg-[#050805]/80 md:top-32" />
      <div className="relative z-10">
        <Navigation
          activePage={activePage}
          onNavigate={navigateTo}
          cartCount={cartCount}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          onSearchSubmit={handleSearchSubmit}
          onSearchFocus={() => {
            if (searchQuery.trim()) setSearchPanelOpen(true);
          }}
        />
        {activePage === 'releases' ? (
          <>
            <Hero onEnterStore={() => navigateTo('distro')} />
            <main id="main-content" className="container mx-auto px-4 py-10 sm:py-14">
              <h1 className="sr-only">Selvajaria Records catalog</h1>
              <div className="mb-6 lg:hidden">
                <button
                  onClick={() => setMobileFiltersOpen((prev) => !prev)}
                  className="brutalist-border px-4 py-3 font-display text-xs font-bold uppercase tracking-[0.14em] text-[#00C747] hover:bg-[#00C747] hover:text-[#131e13]"
                  aria-expanded={mobileFiltersOpen}
                  aria-controls="catalog-filters"
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
                <div id="catalog-filters" className={`${mobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
                  <FilterSidebar value={catalogFilters} onChange={setCatalogFilters} />
                </div>

                <div className="flex-1 rounded-sm border-2 border-[#769a75] bg-[#0c130ce0] p-5 sm:p-7 brutalist-shadow">
                  <div id="label-catalog-top" className="mb-10">
                    <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-[#f4fbf3] sm:text-6xl">
                      Label <span className="text-[#00C747]">Catalog</span>
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm font-medium text-[#769a75] sm:text-base">
                      Core roster releases and selected underground cuts. Physical-first, limited stock.
                    </p>
                  </div>

                  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs uppercase tracking-[0.14em] text-[#769a75]">Showing 31 releases</span>

                      <label htmlFor="release-sort" className="sr-only">Sort releases</label>
                      <select
                        id="release-sort"
                        name="release-sort"
                        aria-label="Sort releases"
                        value={releaseSort}
                        onChange={(event) => setReleaseSort(event.target.value as ReleaseSort)}
                        className="w-full max-w-xs bg-[#101910] border-2 border-[#769a75] px-4 py-3 font-display text-xs font-bold uppercase tracking-[0.14em] text-[#f4fbf3] cursor-pointer hover:border-[#00C747] focus:border-[#00C747] focus:outline-none transition-colors"
                      >
                        <option value="newest" className="bg-[#131e13]">Newest First</option>
                        <option value="oldest" className="bg-[#131e13]">Oldest First</option>
                        <option value="price-low" className="bg-[#131e13]">Price: Low to High</option>
                        <option value="price-high" className="bg-[#131e13]">Price: High to Low</option>
                        <option value="artist" className="bg-[#131e13]">Artist A-Z</option>
                      </select>
                  </div>

                  <ReleaseGrid sortBy={releaseSort} onAddToCart={addToCart} searchQuery="" filters={catalogFilters} />
                </div>
              </div>
            </main>
          </>
        ) : activePage === 'search' ? (
          <main id="main-content" className="container mx-auto px-4 py-10 sm:py-14">
            <section className="mb-8 rounded-sm border border-[#769a75]/60 bg-[#101910cc] p-4 sm:p-6">
              <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-[#f4fbf3] sm:text-5xl">
                Search <span className="text-[#00C747]">Results</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#b7c8b5]">
                Showing results for: <span className="text-[#f4fbf3]">{searchQuery || 'all releases'}</span>
              </p>
            </section>

            <div className="rounded-sm border-2 border-[#769a75] bg-[#0c130ce0] p-5 sm:p-7 brutalist-shadow">
              <ReleaseGrid sortBy={releaseSort} onAddToCart={addToCart} searchQuery={searchQuery} filters={EMPTY_CATALOG_FILTERS} />
            </div>
          </main>
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

        <section className="container mx-auto px-4 pb-8">
          <div className="mx-auto max-w-2xl border-2 border-[#769a75]/60 bg-[#101910]/95 p-6 sm:p-8">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-[#f4fbf3] sm:text-4xl">
              Subscribe
            </h2>

            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  className="w-full border-2 border-[#769a75]/70 bg-[#0b120b] px-4 py-3 text-sm text-[#f4fbf3] placeholder:text-[#769a75] focus:border-[#00C747] focus:outline-none"
                />
                <button
                  type="submit"
                  className="border-2 border-[#00C747] bg-[#00C747] px-6 py-3 font-display text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#131e13] transition-colors hover:bg-[#9dffbe]"
                >
                  Subscribe
                </button>
              </div>

              <p className="text-sm leading-relaxed text-[#b7c8b5]">
                I would like to receive the newsletter from Selvajaria Records, and agree to the processing of my e-mail address for the purpose of sending and statistically analyzing the newsletter by e-mail. Further information can be found in our privacy policy.
              </p>
              <p className="text-sm leading-relaxed text-[#b7c8b5]">
                The consent can be revoked at any time for the future - by e-mail to our contact details given in the imprint or by clicking on the unsubscribe link in our newsletter - and will remain valid until revoked.
              </p>

              <label className="inline-flex items-start gap-3 text-sm leading-relaxed text-[#b7c8b5]">
                <input
                  type="checkbox"
                  checked={newsletterConsent}
                  onChange={(event) => setNewsletterConsent(event.target.checked)}
                  className="mt-1 h-4 w-4 border border-[#769a75]/70 bg-transparent accent-[#00C747]"
                />
                <span>I agree to the newsletter consent and email processing terms.</span>
              </label>

              <button
                type="button"
                onClick={() => navigateTo('privacy')}
                className="w-fit text-xs uppercase tracking-[0.12em] text-[#00C747] hover:text-[#9dffbe]"
              >
                View Privacy Policy
              </button>
            </form>
          </div>
        </section>

        <Footer onNavigate={navigateTo} />
      </div>
      {searchPanelOpen && (
        <>
          <button
            type="button"
            className="search-panel-backdrop fixed inset-0 z-[109] bg-black/40"
            onClick={() => setSearchPanelOpen(false)}
            aria-label="Close search panel"
          />
          <aside className="search-panel fixed right-0 top-0 z-[110] h-screen w-full max-w-[560px] overflow-y-auto bg-[#050805] text-[#f4fbf3] shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[#769a75]/35 px-5 py-4">
              <span className="text-2xl">âŒ•</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => handleSearchQueryChange(event.target.value)}
                autoFocus
                placeholder="What are you looking for?"
                className="w-full bg-transparent text-xl leading-none text-[#f4fbf3] placeholder:text-[#b7c8b5] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchPanelOpen(false)}
                className="text-3xl leading-none text-[#b7c8b5] hover:text-[#f4fbf3]"
                aria-label="Close search panel"
              >
                Ã—
              </button>
            </div>

            <div className="px-5 py-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[#b7c8b5]">Products</p>
              {searchPreview.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-3.5">
                    {searchPreview.map((release) => (
                      <button
                        key={`search-preview-${release.id}`}
                        type="button"
                        onClick={() => {
                          setSearchPanelOpen(false);
                          navigateTo('search');
                        }}
                        className="text-left"
                      >
                        <div className="aspect-[5/4]">
                          <img
                            src={asset(release.image)}
                            alt={`${release.artist} - ${release.title}`}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <p className="mt-2 line-clamp-1 text-lg text-[#f4fbf3]">{release.artist}</p>
                        <p className="line-clamp-1 text-base text-[#b7c8b5]">{release.title}</p>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchPanelOpen(false);
                      navigateTo('search');
                    }}
                    className="mt-4 w-full bg-[#00C747] px-5 py-3.5 font-display text-base font-bold uppercase tracking-[0.12em] text-[#131e13] hover:bg-[#9dffbe]"
                  >
                    View All Results
                  </button>
                </>
              ) : (
                <p className="text-base text-[#b7c8b5]">No products found.</p>
              )}
            </div>
          </aside>
        </>
      )}
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
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-4 z-[95] p-1 text-[#00C747] transition-all duration-150 hover:scale-110 hover:text-[#9dffbe] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C747] sm:right-6"
          style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
          aria-label="Back to top"
          title="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

