import { Mail, Instagram, Music, Facebook, Youtube, Disc3, Skull } from 'lucide-react';
import type { SubpageKey } from './SubpageContent';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

interface FooterProps {
  onNavigate: (page: SubpageKey) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-14 border-t-2 border-[#769a75] bg-[#0b120b] text-[#f4fbf3] md:mt-24">
      <div className="container mx-auto px-4 pt-10 pb-5 md:pt-16 md:pb-11">
        <div className="mb-8 grid grid-cols-1 gap-7 md:mb-12 md:gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="text-center md:text-left">
            <button onClick={() => onNavigate('distro')} className="mx-auto flex items-center gap-2 md:mx-0">
              <img src={asset('/logo3.png')} alt="Selvajaria Records" className="h-16 w-auto object-contain" />
            </button>
            <p className="mt-5 font-display text-xl font-bold uppercase tracking-tight text-[#f4fbf3]">
              SELVAJARIA RECORDS
            </p>
            <p className="mt-0 mx-auto max-w-xs text-sm leading-relaxed text-[#769a75] md:mx-0">
              Independent underground metal label from Portugal.
              <br />
              CD • Vinyl • Tape • Worldwide shipping
            </p>
            <div className="mt-5 flex justify-center gap-4 md:justify-start">
              <a href="https://selvajariarecords.bandcamp.com/" target="_blank" rel="noreferrer" className="hover:text-[#00C747]"><Music className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/selvajaria_records/" target="_blank" rel="noreferrer" className="hover:text-[#00C747]"><Instagram className="h-5 w-5" /></a>
              <a href="https://www.facebook.com/selvajariarecords/" target="_blank" rel="noreferrer" className="hover:text-[#00C747]"><Facebook className="h-5 w-5" /></a>
              <a href="https://www.youtube.com/@SelvajariaRecords" target="_blank" rel="noreferrer" className="hover:text-[#00C747]"><Youtube className="h-5 w-5" /></a>
              <a href="https://www.discogs.com/label/2788133-Selvajaria-Records" target="_blank" rel="noreferrer" className="hover:text-[#00C747]"><Disc3 className="h-5 w-5" /></a>
              <a href="https://www.metal-archives.com/labels/Selvajaria_Records/58844" target="_blank" rel="noreferrer" className="hover:text-[#00C747]"><Skull className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.18em] text-[#00C747]">Shop</h3>
            <div className="flex flex-col gap-3 text-sm text-[#769a75]">
              <button onClick={() => onNavigate('distro')} className="text-left hover:text-[#f4fbf3]">Distribution</button>
              <button onClick={() => onNavigate('merch')} className="text-left hover:text-[#f4fbf3]">Merchandise</button>
              <button onClick={() => onNavigate('cart')} className="text-left hover:text-[#f4fbf3]">Cart</button>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.18em] text-[#00C747]">Support</h3>
            <div className="flex flex-col gap-3 text-sm text-[#769a75]">
              <button onClick={() => onNavigate('privacy')} className="text-left hover:text-[#f4fbf3]">Privacy & Shipping</button>
              <button onClick={() => onNavigate('terms')} className="text-left hover:text-[#f4fbf3]">Terms</button>
              <button onClick={() => onNavigate('contacto')} className="text-left hover:text-[#f4fbf3]">Contact</button>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.18em] text-[#00C747]">Newsletter</h3>
            <p className="mb-4 text-sm text-[#769a75]">Get updates on new releases, restocks, and limited pressings.</p>
            <form className="flex" onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full border border-[#769a75]/50 bg-[#131e13] px-4 py-2 text-xs font-semibold tracking-[0.08em] text-[#f4fbf3] placeholder:text-[#769a75] focus:border-[#00C747] focus:outline-none"
              />
              <button className="bg-[#00C747] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#131e13]">Join</button>
            </form>
            <a href="mailto:selvajaria.orders@outlook.com" className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[#769a75] hover:text-[#00C747]">
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#769a75]/25 pt-6 text-[10px] uppercase tracking-[0.2em] text-[#769a75] md:flex-row">
          <p>© 2026 Selvajaria Records. All rights reserved.</p>
          <a href="https://ironsignalworks.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#00C747]">
            Site by Iron Signal Works
          </a>
        </div>
      </div>
    </footer>
  );
}



