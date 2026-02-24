import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <span className="text-black font-display font-bold text-lg">S</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tighter uppercase">
                Selvajaria
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Independent record label based in the underground. Curating the finest electronic, ambient, and experimental sounds since 2020.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-accent transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-brand-accent transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-brand-accent transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-widest mb-6 text-sm">Shop</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/releases" className="hover:text-white transition-colors">Releases</Link></li>
              <li><Link to="/distro" className="hover:text-white transition-colors">Distribution</Link></li>
              <li><Link to="/merch" className="hover:text-white transition-colors">Merchandise</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-widest mb-6 text-sm">Support</h3>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/legal/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold uppercase tracking-widest mb-6 text-sm">Newsletter</h3>
            <p className="text-white/60 text-sm mb-4">Stay updated with our latest releases and events.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-white/10 border border-white/20 px-4 py-2 text-sm focus:outline-none focus:border-brand-accent flex-grow"
              />
              <button className="bg-white text-black px-4 py-2 text-sm font-bold hover:bg-brand-accent hover:text-white transition-colors">
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/40">
          <p>© 2026 Selvajaria Records. All Rights Reserved.</p>
          <p className="mt-4 md:mt-0">Built for the Underground</p>
        </div>
      </div>
    </footer>
  );
};
