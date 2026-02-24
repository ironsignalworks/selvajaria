import { useEffect, useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Disc3, Disc, CassetteTape, Download, Play } from 'lucide-react';
import type { CartItemInput } from './SubpageContent';
import type { CatalogFilters } from './FilterSidebar';

interface Release {
  id: number;
  artist: string;
  title: string;
  formats: ('vinyl' | 'cd' | 'tape' | 'digital')[];
  price: number;
  image: string;
  genre: string;
  year: number;
  description: string;
  details: string[];
  trackHighlights: string[];
  listeningUrl?: string;
  inStock?: boolean;
}

export type ReleaseSort =
  | 'newest'
  | 'oldest'
  | 'price-low'
  | 'price-high'
  | 'artist';

export const releases: Release[] = [
  {
    id: 1,
    title: 'Bikini Atoll Broadcast',
    artist: 'FATAL EXPOSURE',
    listeningUrl: 'https://selvajariarecords.bandcamp.com/',
    formats: ['cd'],
    price: 12,
    image: '/fatal exposure capa.jpg',
    genre: 'Thrash',
    year: 2026,
    description: 'Contamination-themed thrash assault with high-pressure pacing.',
    details: ['Official Selvajaria pressing', 'CD format', 'Latest release highlight'],
    trackHighlights: ['False Circuit', 'Terminal Ash', 'Red Static'],
  },
  {
    id: 2,
    title: 'Target of Ruin',
    artist: 'CATACHREST',
    listeningUrl: 'https://selvajariarecords.bandcamp.com/',
    formats: ['cd'],
    price: 12,
    image: '/catachrest.jpg',
    genre: 'Thrash',
    year: 2025,
    description: 'Riff-forward aggression with relentless momentum.',
    details: ['CD jewel case', 'Label distribution', 'Full-color artwork'],
    trackHighlights: ['Target of Ruin', 'Concrete Hunger', 'Dead Meridian'],
  },
  {
    id: 3,
    title: 'VS the World',
    artist: 'POISON THE PREACHER',
    listeningUrl: 'https://selvajariarecords.bandcamp.com/',
    formats: ['cd'],
    price: 12,
    image: '/poisonthepreacher.jpg',
    genre: 'Thrash',
    year: 2025,
    description: 'Fast crossover attack with scene-built intensity.',
    details: ['Compact disc edition', 'Booklet included', 'Underground pressing'],
    trackHighlights: ['VS the World', 'Ash Sermon', 'Chain Reaction'],
  },
  {
    id: 4,
    title: 'Violent Obliteration',
    artist: 'BIOLENCE',
    formats: ['cd'],
    price: 12,
    image: '/biolence.jpg',
    genre: 'Death',
    year: 2024,
    description: 'Dense distortion and high-impact rhythmic control.',
    details: ['CD edition', 'Limited batch', 'Label curated'],
    trackHighlights: ['Violent Obliteration', 'Severed Motion', 'Ruin Sequence'],
  },
  {
    id: 5,
    title: 'Sequência Brutal de Estaladas e Biqueirada',
    artist: 'D.F.C.',
    formats: ['cd'],
    price: 12,
    image: '/dfc.jpg',
    genre: 'Crossover',
    year: 2024,
    description: 'Street-level intensity and relentless speed.',
    details: ['CD release', 'Portuguese lyrics', 'Scene classic'],
    trackHighlights: ['Sequencia Brutal', 'Zona de Impacto', 'Sem Recuo'],
  },
  {
    id: 6,
    title: 'Trapped Into The Madness Vortex',
    artist: 'PSYCHO MOSHER',
    formats: ['cd'],
    price: 12,
    image: '/psychomosher.jpg',
    genre: 'Thrash',
    year: 2025,
    description: 'Chaotic structures with mosh-first execution.',
    details: ['CD pressing', 'Label distributed', 'Includes insert'],
    trackHighlights: ['Madness Vortex', 'Skull Circuit', 'No Safe Zone'],
  },
  {
    id: 7,
    title: 'Catatonic Symphony',
    artist: 'RAGING SLAYER',
    formats: ['cd'],
    price: 12,
    image: '/raging slayer capa.jpg',
    genre: 'Thrash',
    year: 2025,
    description: 'Cold riffs and deliberate rhythmic punishment.',
    details: ['CD edition', 'New pressing', 'Official distribution'],
    trackHighlights: ['Catatonic Symphony', 'Spiral of Iron', 'Shock Pattern'],
  },
  {
    id: 8,
    title: 'Collapse',
    artist: 'SPOILED',
    formats: ['cd'],
    price: 12,
    image: '/spoiled.jpg',
    genre: 'Hardcore',
    year: 2024,
    description: 'Harsh hardcore pressure with direct lyrical hits.',
    details: ['Compact disc', 'Independent pressing', 'Limited quantities'],
    trackHighlights: ['Collapse', 'No Shelter', 'Final Blow'],
  },
  {
    id: 9,
    title: 'Compilación',
    artist: 'DEFEATER',
    formats: ['cd'],
    price: 12,
    image: '/defeater capa.jpg',
    genre: 'Death',
    year: 2024,
    description: 'Collection release gathering key Defeater cuts.',
    details: ['Compilation CD', 'Archive tracks', 'Scene distribution'],
    trackHighlights: ['Cold Exchange', 'Dust Crown', 'No Return'],
  },
  {
    id: 10,
    title: 'Destruccion Trascendental',
    artist: 'DEKAPITED',
    formats: ['cd'],
    price: 12,
    image: '/dekapited.jpg',
    genre: 'Death',
    year: 2024,
    description: 'Brutal structures and relentless low-end attack.',
    details: ['CD format', 'Underground distribution', 'Limited run'],
    trackHighlights: ['Destruccion Trascendental', 'Inner Collapse', 'Permanent Scar'],
  },
  {
    id: 11,
    title: 'Cosmo(a)gonia',
    artist: 'ACROSTIC',
    formats: ['cd'],
    price: 12,
    image: '/cosmoagonia.jpg',
    genre: 'Progressive Death',
    year: 2024,
    description: 'Cosmic themes delivered with technical aggression.',
    details: ['CD edition', 'Expanded booklet', 'Official stock'],
    trackHighlights: ['Cosmo(a)gonia', 'Void Pulse', 'Event Horizon'],
  },
  {
    id: 12,
    title: 'Tales from the Dreamworld',
    artist: 'INSECURITY',
    formats: ['cd'],
    price: 12,
    image: '/insecurity.jpg',
    genre: 'Thrash',
    year: 2024,
    description: 'Sharp riffing and dystopian mood across full runtime.',
    details: ['CD pressing', 'Underground release', 'Label availability'],
    trackHighlights: ['Dreamworld', 'Night Shift', 'Dead Signal'],
  },
  {
    id: 13,
    title: 'Sòpròkù',
    artist: 'ACROMANIACOS',
    formats: ['cd'],
    price: 12,
    image: '/acromaniacos.jpg',
    genre: 'Thrash',
    year: 2024,
    description: 'Fast and raw with direct songwriting impact.',
    details: ['CD release', 'Limited pressing', 'Official distro'],
    trackHighlights: ['Soproku', 'Zero Mercy', 'Street Hammer'],
  },
  {
    id: 14,
    title: 'Split Battlescars / Nagasaki Sunrise',
    artist: 'BATTLESCARS / NAGASAKI SUNRISE',
    formats: ['cd'],
    price: 12,
    image: '/battlescars.jpg',
    genre: 'Split',
    year: 2024,
    description: 'Two-band split with contrasting but equally violent angles.',
    details: ['Split CD', 'Dual artwork', 'Label stocked'],
    trackHighlights: ['Battlescars Side', 'Nagasaki Side', 'Shared Ruin'],
  },
  {
    id: 15,
    title: 'Portal of Terror',
    artist: 'TVMVLO',
    formats: ['cd'],
    price: 12,
    image: '/tvmvlo.jpg',
    genre: 'Black',
    year: 2024,
    description: 'Dark atmosphere and ritual pacing with abrasive tone.',
    details: ['CD format', 'Underground pressing', 'Scene stock'],
    trackHighlights: ['Portal of Terror', 'Abyss Key', 'Dark Pivot'],
  },
  {
    id: 17,
    title: 'The Last Day',
    artist: 'KONAD',
    formats: ['cd'],
    price: 12,
    image: '/konad.jpg',
    genre: 'Heavy',
    year: 2024,
    description: 'Classic heavy foundations with darker modern pressure.',
    details: ['CD edition', 'Booklet included', 'Official label stock'],
    trackHighlights: ['The Last Day', 'Broken Arc', 'Final Torch'],
  },
  {
    id: 18,
    title: 'Medo / Mordaça - L.V.F.S.',
    artist: 'SPLIT MEDO / MORDAÇA',
    formats: ['cd'],
    price: 12,
    image: '/medo.jpg',
    genre: 'Split',
    year: 2024,
    description: 'Harsh split release with uncompromising underground tone.',
    details: ['Split CD', 'Limited quantities', 'Scene distribution'],
    trackHighlights: ['Medo Side', 'Mordaca Side', 'L.V.F.S.'],
  },
  {
    id: 19,
    title: 'Cabras, Cães & Leite de Bode',
    artist: 'CÃES DE GUERRA',
    formats: ['cd'],
    price: 12,
    image: '/caesdeguerra.jpg',
    genre: 'Crossover',
    year: 2024,
    description: 'Raw Portuguese attack with aggressive social edge.',
    details: ['CD pressing', 'Portuguese tracklist', 'Official distro'],
    trackHighlights: ['Cabras', 'Leite de Bode', 'Sem Tregua'],
  },
  {
    id: 20,
    title: 'Desde Bajo Tierra',
    artist: 'VORTIZE',
    formats: ['cd'],
    price: 12,
    image: '/vortize.jpg',
    genre: 'Thrash',
    year: 2024,
    description: 'Underground velocity and sharp percussive attack.',
    details: ['CD edition', 'Spanish lyrics', 'Label available'],
    trackHighlights: ['Desde Bajo Tierra', 'Muro de Sangre', 'Eje de Ruina'],
  },
  {
    id: 21,
    title: 'The Night Where the Evil Prevails',
    artist: 'MAZE OF TERROR',
    formats: ['cd'],
    price: 12,
    image: '/maze.jpg',
    genre: 'Thrash',
    year: 2024,
    description: 'Dark thrash atmosphere with sustained pressure.',
    details: ['CD pressing', 'Official stock', 'Underground label support'],
    trackHighlights: ['Evil Prevails', 'Midnight Regime', 'Merciless End'],
  },
  {
    id: 22,
    title: 'Animalesco, O Método',
    artist: 'ANIMALESCO, o MÉTODO',
    formats: ['vinyl'],
    price: 22,
    image: '/animalesco.jpg',
    genre: 'Black',
    year: 2024,
    description: 'Animalesco LP pressing with raw ritual atmosphere.',
    details: ['12 inch LP', 'Heavy sleeve', 'Limited pressing'],
    trackHighlights: ['O Metodo', 'Nervo Cru', 'Liturgia Bruta'],
  },
  {
    id: 23,
    title: 'Into the Jaws of Terror',
    artist: 'MAZE OF TERROR',
    formats: ['cd'],
    price: 12,
    image: '/mazeinto.jpg',
    genre: 'Thrash',
    year: 2024,
    description: 'Ripping tempos and hostile riff phrasing throughout.',
    details: ['CD format', 'Scene pressing', 'Label distribution'],
    trackHighlights: ['Into the Jaws of Terror', 'No Exit', 'Steel Venom'],
  },
  {
    id: 24,
    title: 'Tienes Que Luchar!',
    artist: 'VORTIZE',
    formats: ['cd'],
    price: 12,
    image: '/vortize2.jpg',
    genre: 'Thrash',
    year: 2024,
    description: 'Urgent and direct, built for speed and impact.',
    details: ['CD pressing', 'Spanish language release', 'Official stock'],
    trackHighlights: ['Tienes Que Luchar!', 'Cero Piedad', 'Ultimo Golpe'],
  },
  {
    id: 25,
    title: 'Bestia Oculta',
    artist: 'LETALIS',
    formats: ['cd'],
    price: 12,
    image: '/bestia.jpg',
    genre: 'Death',
    year: 2024,
    description: 'Dark, heavy structures with abrupt rhythmic turns.',
    details: ['Compact disc', 'Independent pressing', 'Label distribution'],
    trackHighlights: ['Bestia Oculta', 'Sombra Feral', 'Nexo Final'],
  },
  {
    id: 26,
    title: 'Intruder of Reality',
    artist: 'INSECURITY',
    formats: ['cd'],
    price: 12,
    image: '/insecurity2.jpg',
    genre: 'Thrash',
    year: 2024,
    description: 'Sharp-edged writing with dystopian subject matter.',
    details: ['CD edition', 'Booklet included', 'Scene availability'],
    trackHighlights: ['Intruder of Reality', 'Frame Collapse', 'No Refuge'],
  },
  {
    id: 27,
    title: 'False Messiah and the Abstract',
    artist: 'DARK AGE OF RUIN',
    formats: ['cd'],
    price: 12,
    image: '/darkage.jpg',
    genre: 'Black',
    year: 2024,
    description: 'Atmospheric hostility and blackened intensity.',
    details: ['CD release', 'Limited batch', 'Official distro'],
    trackHighlights: ['False Messiah', 'The Abstract', 'Ruin Crown'],
  },
  {
    id: 28,
    title: 'Reino de Satã',
    artist: 'TESTEMUNHAS DE JEOVÁ',
    formats: ['cd'],
    price: 12,
    image: '/testemunhas.jpg',
    genre: 'Black',
    year: 2024,
    description: 'Harsh religious inversion themes with aggressive tone.',
    details: ['CD format', 'Underground stock', 'Label distribution'],
    trackHighlights: ['Reino de Sata', 'Chama Negra', 'Fio da Lanca'],
  },
  {
    id: 29,
    title: 'Blood And Steel',
    artist: 'GREY WOLF',
    formats: ['cd'],
    price: 12,
    image: '/greywolf.jpg',
    genre: 'Heavy',
    year: 2024,
    description: 'Traditional heavy metal force with modern weight.',
    details: ['CD release', 'Collector-friendly package', 'Official stock'],
    trackHighlights: ['Blood And Steel', 'Marchline', 'Last Bastion'],
  },
  {
    id: 30,
    title: 'Dark Daggers Of Divine Decease',
    artist: 'INCITER',
    formats: ['cd'],
    price: 12,
    image: '/inciter capa.jpg',
    genre: 'Heavy',
    year: 2025,
    description: 'Dark hooks and high-pressure songwriting.',
    details: ['CD digipak', 'Label issue', 'Official catalog item'],
    trackHighlights: ['Dark Daggers', 'Divine Decease', 'Iron Void'],
  },
  {
    id: 31,
    title: 'Knife Murders',
    artist: 'DEATHLIKE STAB',
    formats: ['cd'],
    price: 12,
    image: '/deathlike capa.jpg',
    genre: 'Death',
    year: 2025,
    description: 'Raw death metal pressure with direct violent delivery.',
    details: ['Compact disc edition', 'Original art', 'Underground batch'],
    trackHighlights: ['Knife Murders', 'Meat Engine', 'Hollow Precision'],
  },
  {
    id: 32,
    title: 'Um Caminho Sem Retorno',
    artist: 'PORTAL DO INFERNO',
    formats: ['cd'],
    price: 12,
    image: '/portal.jpg',
    genre: 'Black',
    year: 2024,
    description: 'Cold and oppressive atmosphere with destructive pacing.',
    details: ['CD pressing', 'Independent production', 'Official distro'],
    trackHighlights: ['Um Caminho Sem Retorno', 'Fogo Cego', 'Abismo Final'],
  },
];

const formatIcons = {
  vinyl: Disc3,
  cd: Disc,
  tape: CassetteTape,
  digital: Download,
};
const formatLabels: Record<keyof typeof formatIcons, string> = {
  vinyl: 'Vinyl',
  cd: 'CD',
  tape: 'Cassette',
  digital: 'Digital',
};
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
const DEFAULT_LISTEN_URL = 'https://selvajariarecords.bandcamp.com/';

interface ReleaseGridProps {
  sortBy: ReleaseSort;
  onAddToCart: (item: CartItemInput) => void;
  searchQuery: string;
  filters: CatalogFilters;
}

const releaseCountriesById: Record<number, string[]> = {
  2: ['spain'],
  3: ['spain'],
  4: ['spain'],
  5: ['brazil'],
  10: ['spain'],
  11: ['portugal'],
  13: ['brazil'],
  18: ['portugal'],
  19: ['brazil'],
  20: ['spain'],
  21: ['spain'],
  22: ['portugal'],
  23: ['spain'],
  24: ['spain'],
  25: ['spain'],
  28: ['brazil'],
  30: ['spain'],
  31: ['spain'],
  32: ['brazil'],
};

const getReleaseCountryTags = (release: Release) => {
  return releaseCountriesById[release.id] ?? ['worldwide'];
};

export default function ReleaseGrid({ sortBy, onAddToCart, searchQuery, filters }: ReleaseGridProps) {
  const [detailModalRelease, setDetailModalRelease] = useState<Release | null>(null);
  const [isDetailImageLarge, setIsDetailImageLarge] = useState(false);
  const [showAllReleases, setShowAllReleases] = useState(false);
  const latestReleaseId = 1;
  const closeReleaseDetails = () => {
    setDetailModalRelease(null);
    setIsDetailImageLarge(false);
    requestAnimationFrame(() => {
      document.getElementById('label-catalog-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };
  const openReleaseDetails = (release: Release) => {
    setDetailModalRelease(release);
    setIsDetailImageLarge(false);
  };
  const addReleaseToCart = (release: Release) => {
    onAddToCart({
      id: `release-${release.id}`,
      name: release.title,
      artist: release.artist,
      format: release.formats.join('/').toUpperCase(),
      price: release.price,
      image: release.image,
    });
  };
  const sortedReleases = [...releases].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return a.year - b.year;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'artist':
        return a.artist.localeCompare(b.artist);
      case 'newest':
      default:
        return b.year - a.year;
    }
  });
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredReleases = sortedReleases.filter((release) => {
    const matchesSearch = normalizedSearch
      ? [release.artist, release.title, release.genre].some((field) =>
          field.toLowerCase().includes(normalizedSearch)
        )
      : true;

    const matchesFormat =
      filters.formats.length === 0 ||
      filters.formats.some((format) =>
        release.formats.includes(format as Release['formats'][number])
      );

    const releaseGenre = release.genre.toLowerCase();
    const matchesGenre =
      filters.genres.length === 0 ||
      filters.genres.some((genre) => releaseGenre.includes(genre.toLowerCase()));

    const countryTags = getReleaseCountryTags(release);
    const matchesCountry =
      filters.countries.length === 0 ||
      filters.countries.some((country) => countryTags.includes(country));

    const matchesStock = !filters.inStockOnly || (release.inStock ?? true);

    return matchesSearch && matchesFormat && matchesGenre && matchesCountry && matchesStock;
  });
  const displayedReleases = showAllReleases ? filteredReleases : filteredReleases.slice(0, 8);
  useEffect(() => {
    const handleHeroView = (event: Event) => {
      const customEvent = event as CustomEvent<{ artist: string; title: string }>;
      const artist = customEvent.detail?.artist?.toUpperCase();
      const title = customEvent.detail?.title?.toUpperCase();

      if (!artist || !title) {
        console.warn('Hero view event missing artist or title');
        return;
      }

      const matched = releases.find(
        (release) =>
          release.artist.toUpperCase() === artist &&
          release.title.toUpperCase() === title
      );

      if (matched) {
        setDetailModalRelease(matched);
      } else {
        console.warn(`No matching release found for: ${artist} - ${title}`);
      }
    };

    // expose a direct opener on window for more reliable invocation from other components
    (window as any).openRelease = (artist: string, title: string) => {
      if (!artist || !title) return;
      const a = artist.toUpperCase();
      const t = title.toUpperCase();
      const matched = releases.find(
        (release) => release.artist.toUpperCase() === a && release.title.toUpperCase() === t
      );
      if (matched) setDetailModalRelease(matched);
    };

    // handle a pending hero request (set by Hero) if present
    const pending = (window as any).__requestedHeroView;
    if (pending?.artist && pending?.title) {
      try {
        const a = pending.artist.toUpperCase();
        const t = pending.title.toUpperCase();
        const matched = releases.find(
          (release) => release.artist.toUpperCase() === a && release.title.toUpperCase() === t
        );
        if (matched) {
          setDetailModalRelease(matched);
        }
      } finally {
        try {
          delete (window as any).__requestedHeroView;
        } catch (e) {
          (window as any).__requestedHeroView = undefined;
        }
      }
    }

    window.addEventListener('hero-view-release', handleHeroView as EventListener);
    return () => {
      window.removeEventListener('hero-view-release', handleHeroView as EventListener);
      // clean up the global opener
      try {
        delete (window as any).openRelease;
      } catch (e) {
        (window as any).openRelease = undefined;
      }
    };
  }, []);

  useEffect(() => {
    setShowAllReleases(false);
  }, [searchQuery, filters]);

  useEffect(() => {
    if (!detailModalRelease && !isDetailImageLarge) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (isDetailImageLarge) {
        setIsDetailImageLarge(false);
        return;
      }

      if (detailModalRelease) {
        closeReleaseDetails();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [detailModalRelease, isDetailImageLarge]);

  return (
    <>
      <div id="releases-catalog" className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {displayedReleases.map((release) => {
          return (
            <div
              key={release.id}
              className="group relative overflow-hidden"
            >
              <div className="relative overflow-hidden bg-transparent">
                <button
                  onClick={() => openReleaseDetails(release)}
                  className="block w-full"
                  aria-label={`View release details for ${release.artist} ${release.title}`}
                >
                  <ImageWithFallback
                    src={asset(release.image)}
                    alt={`${release.artist} - ${release.title}`}
                    className="w-full aspect-square object-cover"
                  />
                </button>

                {release.id === latestReleaseId && (
                  <div
                    className="absolute top-2 left-2 bg-[#00C747] px-2 py-1"
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: '#131e13',
                    }}
                  >
                    LATEST
                  </div>
                )}

              </div>

              <div className="mt-2 bg-[#101910]/92 p-4 sm:p-5">
                <div className="mb-1 uppercase text-[1.08rem] font-extrabold leading-none tracking-[0.06em] text-[#00C747] sm:text-[1.15rem]">
                  {release.artist}
                </div>

                <div className="mb-3 min-h-[2.55rem] text-[0.9rem] font-semibold uppercase leading-tight tracking-[0.05em] text-[#f4fbf3] sm:text-[0.98rem]">
                  {release.title}
                </div>

                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {release.formats.map((format) => {
                      return (
                        <span
                          key={format}
                          className="inline-flex items-center border border-[#769a75]/70 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-[#b7c8b5]"
                        >
                          {formatLabels[format]}
                        </span>
                      );
                    })}
                  </div>

                  <div className="whitespace-nowrap text-[1.1rem] font-extrabold leading-none text-[#f4fbf3]">
                    EUR {release.price.toFixed(2)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openReleaseDetails(release)}
                    className="w-full border-2 border-[#00C747]/70 px-2 py-1 text-[0.56rem] font-bold uppercase leading-[1.05] tracking-[0.08em] text-[#00C747] transition-colors hover:bg-[#00C747] hover:text-[#131e13]"
                  >
                    View Release
                  </button>
                  <button
                    onClick={() => addReleaseToCart(release)}
                    className="w-full border-2 border-[#769a75]/70 px-2 py-1 text-[0.56rem] font-bold uppercase leading-[1.05] tracking-[0.08em] text-[#f4fbf3] transition-colors hover:border-[#00C747] hover:text-[#00C747]"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReleases.length === 0 && (
        <div className="mt-8 border border-[#769a75]/40 bg-[#101910] px-6 py-8 text-center">
          <p className="text-sm uppercase tracking-[0.12em] text-[#769a75]">No releases found</p>
          <p className="mt-2 text-[#f4fbf3]">Try a different artist, title, or genre.</p>
        </div>
      )}

      {filteredReleases.length > 8 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAllReleases((prev) => !prev)}
            className="border border-[#00C747]/70 px-6 py-2 text-[#00C747] hover:bg-[#00C747] hover:text-[#131e13] transition-colors uppercase"
            style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}
          >
            {showAllReleases ? 'Show Less' : 'View More'}
          </button>
        </div>
      )}

      {detailModalRelease && (
        <div
          className="fixed inset-0 z-[95] flex items-start justify-center overflow-y-auto bg-[#050805]/92 p-3 backdrop-blur-[2px] sm:items-center sm:p-6"
          onClick={closeReleaseDetails}
          role="dialog"
          aria-modal="true"
          aria-label={`Release details for ${detailModalRelease.artist} ${detailModalRelease.title}`}
        >
          <div
            className="my-2 flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-y-auto rounded-sm border-2 border-[#769a75]/60 bg-[#101910] sm:my-0 sm:max-h-[84vh] sm:overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#769a75]/30 px-4 py-3 sm:px-6">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#00C747]">
                  {detailModalRelease.artist}
                </p>
                <h3 className="mt-1 text-base font-semibold uppercase tracking-[0.05em] text-[#f4fbf3] sm:text-lg">
                  {detailModalRelease.title}
                </h3>
              </div>
              <button
                onClick={closeReleaseDetails}
                className="border border-[#00C747]/70 px-3 py-1 text-[0.7rem] tracking-[0.1em] text-[#00C747] hover:bg-[#00C747] hover:text-[#131e13]"
              >
                CLOSE
              </button>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(240px,34%)_1fr]">
              <div className="border-b border-[#769a75]/25 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                <button
                  type="button"
                  onClick={() => setIsDetailImageLarge((prev) => !prev)}
                  className="mx-auto block w-full max-w-[300px] overflow-hidden"
                  aria-label={`Enlarge cover for ${detailModalRelease.artist} ${detailModalRelease.title}`}
                >
                  <ImageWithFallback
                    src={asset(detailModalRelease.image)}
                    alt={`${detailModalRelease.artist} - ${detailModalRelease.title}`}
                    className="h-auto w-full object-contain"
                  />
                </button>

                <div className="mt-4 grid grid-cols-2 gap-2 text-[0.82rem] tracking-[0.05em] text-[#769a75]">
                  <div><span className="text-[#00C747]">YEAR:</span> {detailModalRelease.year}</div>
                  <div><span className="text-[#00C747]">GENRE:</span> {detailModalRelease.genre.toUpperCase()}</div>
                  <div><span className="text-[#00C747]">FORMAT:</span> {detailModalRelease.formats.join(', ').toUpperCase()}</div>
                  <div><span className="text-[#00C747]">PRICE:</span> EUR {detailModalRelease.price.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex min-h-0 flex-col">
                <div className="border-b border-[#769a75]/25 p-4 sm:px-6 sm:py-4">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={() => addReleaseToCart(detailModalRelease)}
                      className="flex-1 border border-[#769a75]/70 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#f4fbf3] transition-colors hover:border-[#00C747] hover:text-[#00C747]"
                    >
                      Add To Cart
                    </button>
                    <a
                      href={detailModalRelease.listeningUrl ?? DEFAULT_LISTEN_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 border border-[#00C747]/70 bg-[#00C747] px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#131e13] transition-all hover:bg-[#00C747]/90"
                    >
                      <Play className="h-3 w-3" />
                      Listen
                    </a>
                  </div>
                </div>

                <div
                  className="min-h-0 flex-1 space-y-5 px-4 py-4 sm:overflow-y-auto sm:overscroll-contain sm:px-6"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  <div>
                    <p className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#00C747]">Description</p>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-[#b7c8b5]">
                      {detailModalRelease.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#00C747]">Details</p>
                    <ul className="mt-2 space-y-1 text-[0.9rem] leading-relaxed text-[#b7c8b5]">
                      {detailModalRelease.details.map((detail) => (
                        <li key={detail}>- {detail}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#00C747]">Tracks</p>
                    <p className="mt-2 text-[0.9rem] leading-relaxed tracking-[0.04em] text-[#f4fbf3]">
                      {detailModalRelease.trackHighlights.join(' / ')}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {detailModalRelease && isDetailImageLarge && (
        <button
          type="button"
          onClick={() => setIsDetailImageLarge(false)}
          className="large-image-overlay fixed inset-0 z-[110] flex items-center justify-center bg-[#050805]/85"
          aria-label="Close full image view"
        >
          <ImageWithFallback
            src={asset(detailModalRelease.image)}
            alt={`${detailModalRelease.artist} - ${detailModalRelease.title}`}
            className="large-image-content max-h-[92vh] max-w-[92vw] object-contain"
          />
        </button>
      )}

    </>
  );
}







