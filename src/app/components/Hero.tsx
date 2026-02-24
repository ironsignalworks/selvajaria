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
    // store requested view on window in case listener isn't mounted yet
    (window as any).__requestedHeroView = { artist: current.artist, title: current.title };

    // try direct opener first (more reliable across rendering boundaries)
    if ((window as any).openRelease) {
      try {
        (window as any).openRelease(current.artist, current.title);
      } catch (e) {
        // fallback to event dispatch
        window.dispatchEvent(
          new CustomEvent('hero-view-release', {
            detail: { artist: current.artist, title: current.title },
            bubbles: true,
            cancelable: true,
          })
        );
      }
    } else {
      window.dispatchEvent(
        new CustomEvent('hero-view-release', {
          detail: { artist: current.artist, title: current.title },
          bubbles: true,
          cancelable: true,
        })
      );
    }

  };

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroReleases.length);
    }, 4500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section
      id="hero-releases"
      aria-label="Featured releases"
      className="relative min-h-[78vh] overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#00ff5a_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="mx-auto mb-8 flex max-w-5xl flex-col items-center text-center lg:mb-10">
          <img
            src={asset('/logo3.png')}
            alt="Selvajaria Records"
            className="h-48 w-auto object-contain sm:h-56 lg:h-64"
          />
          <p className="mt-3 text-xl font-semibold uppercase tracking-[0.1em] text-[#769a75] sm:text-2xl">
            SELVAJARIA RECORDS - Underground label & distro
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-center justify-items-center gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-2">
          <div className="relative mx-auto w-full max-w-[28rem] sm:max-w-[30rem]">
            <div className="relative aspect-square overflow-hidden bg-transparent">
              <button
                onClick={openCurrentRelease}
                className="block h-full w-full cursor-pointer"
                aria-label={`View release details for ${current.artist} ${current.title}`}
              >
                <ImageWithFallback
                  key={`hero-image-${heroIndex}`}
                  src={asset(current.image)}
                  alt={`${current.artist} cover`}
                  className="hero-slide-in relative mx-auto h-full w-full object-contain"
                />
              </button>
            </div>
          </div>

          <div className="relative w-full max-w-[34rem] justify-self-center text-left min-h-[19rem] -translate-y-2 sm:min-h-[21rem] sm:-translate-y-2 lg:justify-self-start lg:-translate-y-3">
            <div key={`hero-copy-${heroIndex}`} className="hero-copy-in">
              <div className="mb-2 inline-flex border border-[#00FF5A] bg-[#00FF5A] px-3 py-1 font-display text-[10px] font-bold uppercase tracking-[0.12em] text-[#131e13]">
                New Release Alert
              </div>
              <h2 className="min-h-[7.75rem] font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-[#f4fbf3] sm:min-h-[11rem] sm:text-7xl">
                {current.artist}
                <span className="block text-[#00FF5A]">{current.title}</span>
              </h2>
              <p className="mt-2 min-h-[3.5rem] max-w-xl text-lg font-medium leading-relaxed text-[#769a75] sm:text-xl">
                {current.line}
              </p>
              <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:justify-start sm:gap-4">
                <button
                  onClick={openCurrentRelease}
                  className="border-2 border-[#769a75] bg-[#131e13] px-6 py-3 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[#f4fbf3] hover:border-[#00FF5A] hover:bg-[#00FF5A] hover:text-[#131e13]"
                >
                  View Release
                </button>
                <button
                  onClick={onEnterStore}
                  className="border-2 border-[#00FF5A] px-6 py-3 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-[#00FF5A] hover:bg-[#00FF5A] hover:text-[#131e13]"
                >
                  Enter Store
                </button>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-start gap-3">
              {heroReleases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setHeroIndex(index)}
                  aria-label={`Show hero release ${index + 1}`}
                  aria-pressed={heroIndex === index}
                  className={`h-2.5 w-8 transition-all ${heroIndex === index ? 'bg-[#00FF5A]' : 'bg-[#769a75]/60 hover:bg-[#9bc49a]'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 flex">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i}
            className={i % 2 === 0 ? 'bg-[#00FF5A]/18' : 'bg-transparent'}
            style={{ flex: 1 }}
          />
        ))}
      </div>
    </section>
  );
}
