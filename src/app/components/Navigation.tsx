import { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X, Search, User, ChevronDown } from 'lucide-react';
import type { SubpageKey } from './SubpageContent';
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

type NavPage = 'releases' | 'search' | SubpageKey;

interface NavigationProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  cartCount: number;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSearchSubmit: () => void;
  onSearchFocus: () => void;
}

interface MenuItem {
  label: string;
  page: NavPage;
}
export default function Navigation({
  activePage,
  onNavigate,
  cartCount,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
  onSearchFocus,
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleLogoClick = () => {
    onNavigate('releases');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [activePage]);

  const menuItems: MenuItem[] = [
    { label: 'Out Now!', page: 'releases' },
    { label: 'Distribution', page: 'distro' },
    { label: 'Merch', page: 'merch' },
    { label: 'Contact', page: 'contacto' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-0 bg-[#0b120b]/95 backdrop-blur-sm" aria-label="Primary">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="hidden md:grid grid-cols-[240px_minmax(0,1fr)_240px] grid-rows-[auto_auto] items-center gap-x-8 gap-y-3 py-3">
          <button
            onClick={handleLogoClick}
            className="relative flex items-center justify-start self-start"
            aria-label="Go to home releases page"
          >
            <div className="relative h-[92px] w-[180px]">
              <img
                src={asset('/logo3.png')}
                alt="Selvajaria Records"
                className="h-full w-full object-contain object-center"
              />
            </div>
            <p className="absolute left-0 top-full mt-2 whitespace-nowrap font-display text-xs font-bold uppercase tracking-[0.1em] text-[#00C747]">
              Ripping ears apart since 2022
            </p>
          </button>

          <div className="relative col-start-2 flex items-center justify-center">
            <div className="w-full max-w-[680px]">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  onSearchSubmit();
                }}
                className="flex items-center gap-2 rounded-sm border border-[#769a75]/70 bg-[#f4fbf3] px-3 py-2 text-[#131e13]"
              >
                <button type="submit" aria-label="Search releases">
                  <Search className="h-4 w-4" />
                </button>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchQueryChange(event.target.value)}
                  onFocus={onSearchFocus}
                  placeholder="looking for something?"
                  aria-label="Search releases"
                  className="w-full bg-transparent text-xl font-medium leading-none text-[#131e13] placeholder:text-[#131e13]/70 focus:outline-none"
                />
              </form>
            </div>
          </div>

          <div className="col-start-3 flex items-start justify-end text-[#f4fbf3]">
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-1 text-lg hover:text-[#00C747]">
                English <ChevronDown className="h-4 w-4" />
              </button>
              <button className="p-1 hover:text-[#00C747]" aria-label="User account">
                <User className="h-5 w-5" />
              </button>
              <button
                onClick={() => onNavigate('cart')}
                className={`relative p-1 ${activePage === 'cart' ? 'text-[#00C747]' : 'text-[#f4fbf3] hover:text-[#00C747]'}`}
                aria-label={`Open shopping cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#f4fbf3] text-xs font-bold text-[#131e13]">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          <div className="col-span-3 flex items-center justify-center -translate-y-1.5 pb-0">
            <div className="flex items-center justify-center gap-7">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                aria-current={activePage === item.page ? 'page' : undefined}
                className={`relative font-display text-[1.45rem] font-medium uppercase leading-none transition-colors ${
                  activePage === item.page ? 'text-[#00C747]' : 'text-[#f4fbf3] hover:text-[#00C747]'
                }`}
              >
                {item.label}
                {activePage === item.page && <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#00C747]" />}
              </button>
            ))}
            </div>
          </div>
        </div>

        <div className="py-3 md:hidden">
          <div className="flex items-center justify-between">
            <button onClick={handleLogoClick} aria-label="Go to home releases page">
                                                                                                                                                                                                          <img
                src={asset('/logo3.png')}
                alt="Selvajaria Records"
                className="h-11 w-auto object-contain"
              />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onNavigate('cart');
                  setMobileOpen(false);
                }}
                className={`relative p-2 ${activePage === 'cart' ? 'text-[#00C747]' : 'text-[#f4fbf3]'}`}
                aria-label={`Open shopping cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#f4fbf3] text-[10px] font-bold text-[#131e13]">
                  {cartCount}
                </span>
              </button>

              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="p-2 text-[#f4fbf3]"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-primary-nav"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <p className="mt-2 text-left font-display text-xs font-bold uppercase tracking-[0.1em] text-[#00C747]">
            Ripping ears apart since 2022.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSearchSubmit();
            }}
            className="mt-2.5 flex items-center gap-2 border border-[#769a75]/60 bg-[#f4fbf3] px-3 py-2 text-[#131e13]"
          >
            <button type="submit" aria-label="Search releases">
              <Search className="h-4 w-4" />
            </button>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              onFocus={onSearchFocus}
              placeholder="looking for something?"
              aria-label="Search releases"
              className="w-full bg-transparent text-base font-medium leading-none text-[#131e13] placeholder:text-[#131e13]/70 focus:outline-none"
            />
          </form>
        </div>

        {mobileOpen && (
          <div id="mobile-primary-nav" className="border-t border-[#769a75]/40 py-3 md:hidden">
            <ul className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <li key={`mobile-${item.label}`}>
                  <button
                    onClick={() => {
                      onNavigate(item.page);
                      setMobileOpen(false);
                    }}
                    aria-current={activePage === item.page ? 'page' : undefined}
                    className={`w-full px-3 py-3 text-left font-display text-base font-bold uppercase tracking-[0.16em] transition-all ${
                      activePage === item.page
                        ? 'bg-[#00C747] text-[#131e13] brutalist-shadow'
                        : 'text-[#f4fbf3] hover:bg-[#101910] hover:text-[#00C747]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="nav-voucher-drop-in border-t border-[#769a75]/35 bg-[#00C747]/28 px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-3">
          <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#00C747] sm:text-sm">
            Claim your Selvajaria release party voucher of 5 euros
          </p>
          <button
            type="button"
            onClick={() => onNavigate('privacy')}
            className="font-display text-xs font-bold uppercase tracking-[0.12em] text-[#9dffbe] underline underline-offset-2 hover:text-[#f4fbf3] sm:text-sm"
          >
            Learn more
          </button>
        </div>
      </div>
    </nav>
  );
}
