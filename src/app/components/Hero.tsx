import { useEffect, useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';

const heroReleases = [
  {
    artist: 'FATAL EXPOSURE',
    title: 'BIKINI ATOLL BROADCAST',
    image: '/fatal exposure capa.jpg',
    line: 'FULL CONTAMINATION ALERT! CD OUT NOW!',
  },
  {
    artist: 'CATACHREST',
    title: 'TARGET OF RUIN',
    image: '/catachrest.jpg',
    line: 'SCORCHED RIFF ASSAULT. CD OUT NOW!',
  },
  {
    artist: 'POISON THE PREACHER',
    title: 'VS THE WORLD',
    image: '/poisonthepreacher.jpg',
    line: 'NO MERCY CROSSOVER ATTACK. CD OUT NOW!',
  },
];
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

interface HeroProps {
  onEnterStore: () => void;
}

export default function Hero({ onEnterStore }: HeroProps) {
  const [heroIndex, setHeroIndex] = useState(0);
  const current = heroReleases[heroIndex];
  const openCurrentRelease = () => {
    window.dispatchEvent(
      new CustomEvent('hero-view-release', {
        detail: { artist: current.artist, title: current.title },
      })
    );
    requestAnimationFrame(() => {
      document.getElementById('releases-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroReleases.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="relative py-20 border-b border-[#769a75]/30 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #131e13 0%, #1a2a1a 100%)'
      }}
    >
      <div className="absolute inset-0 bg-[#00FF5A]/8" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Featured Release */}
          <div className="relative group">
            <div 
              className="absolute inset-0 bg-[#00FF5A]/20 blur-3xl transition-opacity group-hover:opacity-100 opacity-50"
            />
            <button
              onClick={() => setHeroIndex((prev) => (prev + 1) % heroReleases.length)}
              className="block w-full cursor-pointer"
              aria-label="Show next hero release"
            >
              <ImageWithFallback
              src={asset(current.image)}
              alt={`${current.artist} cover`}
              className="relative w-full aspect-square object-cover border-4 border-[#00FF5A]/40 shadow-2xl"
              style={{ boxShadow: '0 0 60px rgba(0, 255, 90, 0.3)' }}
            />
            </button>
          </div>

          {/* Hero Text */}
          <div>
            <div className="mb-8">
              <h2 
                className="uppercase mb-4"
                style={{
                  fontSize: 'clamp(1.7rem, 7vw, 3rem)',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: '#f4fbf3',
                  lineHeight: 1.1
                }}
              >
                {current.artist} -<br />
                {current.title}
              </h2>
              
              <p 
                className="mb-8"
                style={{
                  fontSize: '1rem',
                  color: '#769a75',
                  letterSpacing: '0.05em',
                  lineHeight: 1.6
                }}
              >
                {current.line}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                onClick={openCurrentRelease}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#769a75] text-[#f4fbf3] uppercase tracking-wider hover:border-[#00FF5A] hover:text-[#00FF5A] transition-all"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em'
                }}
              >
                View Release
              </button>
              <a
                href="#releases-catalog"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#00FF5A] text-[#131e13] uppercase tracking-wider hover:bg-[#00FF5A]/90 transition-all"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  boxShadow: '0 4px 20px rgba(0, 255, 90, 0.3)'
                }}
              >
                Browse Releases
              </a>
              <button
                onClick={onEnterStore}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#00FF5A] text-[#00FF5A] uppercase tracking-wider hover:bg-[#00FF5A] hover:text-[#131e13] transition-all"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em'
                }}
              >
                Enter Store
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {heroReleases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setHeroIndex(index)}
                  aria-label={`Show hero release ${index + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    heroIndex === index ? 'bg-[#00FF5A] scale-110' : 'bg-[#769a75] hover:bg-[#9bc49a]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hazard stripes decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-2 flex">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i}
            className={i % 2 === 0 ? 'bg-[#00FF5A]/30' : 'bg-transparent'}
            style={{ flex: 1 }}
          />
        ))}
      </div>
    </section>
  );
}
