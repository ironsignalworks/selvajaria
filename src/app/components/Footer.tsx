import { Mail, Instagram, Music, Facebook, Youtube } from 'lucide-react';
import type { SubpageKey } from './SubpageContent';

interface FooterProps {
  onNavigate: (page: SubpageKey) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#131e13] border-t border-[#769a75]/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          {/* Label Manifesto */}
          <div>
            <h3 
              className="uppercase mb-4"
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#00FF5A'
              }}
            >
              The Underground Manifesto
            </h3>
            <p 
              style={{
                fontSize: '0.875rem',
                color: '#769a75',
                lineHeight: 1.7,
                letterSpacing: '0.02em'
              }}
            >
              Selvajaria Records exists to preserve the raw spirit of extreme metal. 
              We champion the underground, press physical formats, and refuse compromise. 
              Every release is a statement against mainstream mediocrity.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 
              className="uppercase mb-4"
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#00FF5A'
              }}
            >
              Join the Distro List
            </h3>
            <p 
              className="mb-4"
              style={{
                fontSize: '0.75rem',
                color: '#769a75',
                letterSpacing: '0.02em'
              }}
            >
              Get updates on new releases, restocks, and limited pressings.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full flex-1 border border-[#769a75] bg-transparent px-4 py-2 text-[#f4fbf3] placeholder:text-[#769a75]/50 transition-colors focus:border-[#00FF5A] focus:outline-none"
                style={{
                  fontSize: '0.875rem'
                }}
              />
              <button 
                className="w-full px-6 py-2 bg-[#00FF5A] text-[#131e13] uppercase tracking-wider hover:bg-[#00FF5A]/90 transition-all sm:w-auto"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em'
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 
              className="uppercase mb-4"
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#00FF5A'
              }}
            >
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <a 
                href="https://selvajariarecords.bandcamp.com/"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-[#f4fbf3] hover:text-[#00FF5A] transition-colors group"
              >
                <Music className="w-5 h-5" />
                <span 
                  className="uppercase"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em'
                  }}
                >
                  Bandcamp
                </span>
              </a>
              <a 
                href="https://www.instagram.com/selvajaria_records/"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-[#f4fbf3] hover:text-[#00FF5A] transition-colors group"
              >
                <Instagram className="w-5 h-5" />
                <span 
                  className="uppercase break-words"
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em'
                  }}
                >
                  Selvajaria Records (@selvajaria_records)
                </span>
              </a>
              <a 
                href="https://www.facebook.com/selvajariarecords/"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-[#f4fbf3] hover:text-[#00FF5A] transition-colors group"
              >
                <Facebook className="w-5 h-5" />
                <span 
                  className="uppercase"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em'
                  }}
                >
                  Facebook
                </span>
              </a>
              <a 
                href="https://www.youtube.com/@SelvajariaRecords"
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 text-[#f4fbf3] hover:text-[#00FF5A] transition-colors group"
              >
                <Youtube className="w-5 h-5" />
                <span 
                  className="uppercase"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em'
                  }}
                >
                  YouTube
                </span>
              </a>
              <a 
                href="mailto:selvajariarecords@gmail.com"
                className="flex items-start gap-3 text-[#f4fbf3] hover:text-[#00FF5A] transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span 
                  className="uppercase"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em'
                  }}
                >
                  Email
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-4 border-t border-[#769a75]/20 pt-8 md:flex-row md:items-center md:justify-between">
          <p 
            style={{
              fontSize: '0.75rem',
              color: '#769a75',
              letterSpacing: '0.05em'
            }}
          >
            © 2026 SELVAJARIA RECORDS. All rights reserved.
          </p>
          
          <div className="flex flex-wrap gap-4 md:gap-6">
            <button
              onClick={() => onNavigate('privacy')}
              className="uppercase text-[#769a75] hover:text-[#00FF5A] transition-colors"
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer'
              }}
            >
              Privacy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="uppercase text-[#769a75] hover:text-[#00FF5A] transition-colors"
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer'
              }}
            >
              Terms
            </button>
            <button
              onClick={() => onNavigate('shipping')}
              className="uppercase text-[#769a75] hover:text-[#00FF5A] transition-colors"
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer'
              }}
            >
              Shipping
            </button>
          </div>
        </div>

        {/* Hazard footer decoration */}
        <div className="mt-8 h-1 flex">
          {Array.from({ length: 60 }).map((_, i) => (
            <div 
              key={i}
              className={i % 2 === 0 ? 'bg-[#00FF5A]/20' : 'bg-transparent'}
              style={{ flex: 1 }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
