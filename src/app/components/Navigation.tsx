import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import type { SubpageKey } from './SubpageContent';

type NavPage = 'releases' | SubpageKey;

interface NavigationProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  cartCount: number;
}

interface MenuItem {
  label: string;
  page: NavPage;
}

export default function Navigation({ activePage, onNavigate, cartCount }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { label: 'Releases', page: 'releases' },
    { label: 'Distribution', page: 'distro' },
    { label: 'Merch', page: 'merch' },
    { label: 'Contact', page: 'contacto' },
  ];

  return (
    <nav className="bg-[#131e13] border-b border-[#769a75]/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden text-[#f4fbf3] hover:text-[#00FF5A] transition-colors"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <ul className="hidden md:flex items-center gap-2 overflow-x-auto pr-2 sm:gap-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => onNavigate(item.page)}
                  className={`
                    uppercase tracking-wider flex items-center gap-1 py-2 px-3 transition-all
                    ${activePage === item.page
                      ? 'bg-[#00FF5A] text-[#131e13]' 
                      : 'text-[#f4fbf3] hover:text-[#00FF5A]'
                    }
                  `}
                  style={{
                    fontSize: '1.09rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em'
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => onNavigate('cart')}
            className={`transition-colors relative ${activePage === 'cart' ? 'text-[#00FF5A]' : 'text-[#f4fbf3] hover:text-[#00FF5A]'}`}
            aria-label="Open shopping cart"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-[#00FF5A] text-[#131e13] rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ fontSize: '0.7rem', fontWeight: 700 }}>
              {cartCount}
            </span>
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-[#769a75]/30 py-3 md:hidden">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li key={`mobile-${item.label}`}>
                  <button
                    onClick={() => {
                      onNavigate(item.page);
                      setMobileOpen(false);
                    }}
                    className={`w-full text-left uppercase tracking-wider px-3 py-2 transition-all ${
                      activePage === item.page
                        ? 'bg-[#00FF5A] text-[#131e13]'
                        : 'text-[#f4fbf3] hover:text-[#00FF5A]'
                    }`}
                    style={{
                      fontSize: '1.09rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em'
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
