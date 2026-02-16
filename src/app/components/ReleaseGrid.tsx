import { useEffect, useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Disc3, Disc, CassetteTape, Download } from 'lucide-react';
import type { CartItemInput } from './SubpageContent';

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
}

export type ReleaseSort =
  | 'newest'
  | 'oldest'
  | 'price-low'
  | 'price-high'
  | 'artist';

const releases: Release[] = [
  {
    id: 1,
    title: 'Bikini Atoll Broadcast',
    artist: 'FATAL EXPOSURE',
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
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

interface ReleaseGridProps {
  sortBy: ReleaseSort;
  onAddToCart: (item: CartItemInput) => void;
}

export default function ReleaseGrid({ sortBy, onAddToCart }: ReleaseGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [previewRelease, setPreviewRelease] = useState<Release | null>(null);
  const [detailModalRelease, setDetailModalRelease] = useState<Release | null>(null);
  const [showAllReleases, setShowAllReleases] = useState(false);
  const latestReleaseId = 1;
  const openReleaseDetails = (release: Release) => {
    setDetailModalRelease(release);
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
  const displayedReleases = showAllReleases ? sortedReleases : sortedReleases.slice(0, 8);
  useEffect(() => {
    const handleHeroView = (event: Event) => {
      const customEvent = event as CustomEvent<{ artist: string; title: string }>;
      const artist = customEvent.detail?.artist?.toUpperCase();
      const title = customEvent.detail?.title?.toUpperCase();
      if (!artist || !title) return;

      const matched = releases.find(
        (release) => release.artist.toUpperCase() === artist && release.title.toUpperCase() === title
      );
      if (matched) {
        setDetailModalRelease(matched);
      }
    };

    window.addEventListener('hero-view-release', handleHeroView as EventListener);
    return () => window.removeEventListener('hero-view-release', handleHeroView as EventListener);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {displayedReleases.map((release) => {
          const isHovered = hoveredId === release.id;

          return (
            <div
              key={release.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredId(release.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative mb-3 overflow-hidden">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setPreviewRelease(release);
                  }}
                  className="block w-full"
                  aria-label={`Open large cover for ${release.artist} ${release.title}`}
                >
                  <ImageWithFallback
                    src={asset(release.image)}
                    alt={`${release.artist} - ${release.title}`}
                    className="w-full aspect-square object-cover transition-transform duration-300"
                    style={{
                      transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
                      border: `2px solid ${isHovered ? '#00FF5A' : '#769a75'}`,
                      boxShadow: isHovered ? '0 8px 30px rgba(0, 255, 90, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.3)',
                    }}
                  />
                </button>

                {release.id === latestReleaseId && (
                  <div
                    className="absolute top-2 left-2 bg-[#00FF5A] px-2 py-1"
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

                {isHovered && (
                  <div
                    className="absolute inset-0 bg-[#131e13]/95 flex flex-col items-center justify-center gap-3 transition-opacity pointer-events-none"
                    style={{
                      border: '2px solid #00FF5A',
                    }}
                  >
                    <div className="flex gap-3">
                      {release.formats.map((format) => {
                        const Icon = formatIcons[format];
                        return (
                          <div key={format} className="text-[#00FF5A]" title={format}>
                            <Icon className="w-6 h-6" />
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        openReleaseDetails(release);
                      }}
                      className="pointer-events-auto px-6 py-2 bg-[#00FF5A] text-[#131e13] uppercase tracking-wider hover:bg-[#00FF5A]/90 transition-all"
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                      }}
                    >
                      View Release
                    </button>
                  </div>
                )}
              </div>

              <div>
                <div
                  className="uppercase mb-1"
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: '#00FF5A',
                  }}
                >
                  {release.artist}
                </div>

                <div
                  className="mb-2"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: '#f4fbf3',
                  }}
                >
                  {release.title}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {release.formats.map((format) => {
                      const Icon = formatIcons[format];
                      return <Icon key={format} className="w-4 h-4 text-[#769a75]" />;
                    })}
                  </div>

                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: '#f4fbf3',
                    }}
                  >
                    EUR {release.price.toFixed(2)}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openReleaseDetails(release)}
                    className="w-full border border-[#00FF5A]/60 px-3 py-2 text-[#00FF5A] hover:bg-[#00FF5A] hover:text-[#131e13] transition-colors uppercase"
                    style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}
                  >
                    View Release
                  </button>
                  <button
                    onClick={() => addReleaseToCart(release)}
                    className="w-full border border-[#769a75]/70 px-3 py-2 text-[#f4fbf3] hover:border-[#00FF5A] hover:text-[#00FF5A] transition-colors uppercase"
                    style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {releases.length > 8 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAllReleases((prev) => !prev)}
            className="border border-[#00FF5A]/70 px-6 py-2 text-[#00FF5A] hover:bg-[#00FF5A] hover:text-[#131e13] transition-colors uppercase"
            style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}
          >
            {showAllReleases ? 'Show Less' : 'View More'}
          </button>
        </div>
      )}

      {previewRelease && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#050805]/90 p-4"
          onClick={() => setPreviewRelease(null)}
        >
          <div
            className="relative w-full max-w-4xl border border-[#00FF5A]/60 bg-[#101910] p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex justify-end">
              <button
                onClick={() => setPreviewRelease(null)}
                className="border border-[#00FF5A]/70 px-3 py-1 text-[#00FF5A] hover:bg-[#00FF5A] hover:text-[#131e13]"
                style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
              >
                CLOSE
              </button>
            </div>
            <ImageWithFallback
              src={asset(previewRelease.image)}
              alt={`${previewRelease.artist} - ${previewRelease.title}`}
              className="max-h-[78vh] w-full object-contain"
            />
            <p className="mt-3 text-center text-[#f4fbf3]" style={{ fontSize: '0.85rem', letterSpacing: '0.08em' }}>
              {previewRelease.artist} - {previewRelease.title}
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => addReleaseToCart(previewRelease)}
                className="border border-[#769a75]/70 px-5 py-2 text-[#f4fbf3] hover:border-[#00FF5A] hover:text-[#00FF5A] transition-colors uppercase"
                style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {detailModalRelease && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#050805]/92 p-4"
          onClick={() => setDetailModalRelease(null)}
        >
          <div
            className="w-full max-h-[90vh] max-w-3xl overflow-y-auto border border-[#00FF5A]/60 bg-[#101910] p-4 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex justify-end">
              <button
                onClick={() => setDetailModalRelease(null)}
                className="border border-[#00FF5A]/70 px-3 py-1 text-[#00FF5A] hover:bg-[#00FF5A] hover:text-[#131e13]"
                style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
              >
                CLOSE
              </button>
            </div>
            <button
              onClick={() => setPreviewRelease(detailModalRelease)}
              className="block w-full"
              aria-label={`Open large cover for ${detailModalRelease.artist} ${detailModalRelease.title}`}
            >
              <ImageWithFallback
                src={asset(detailModalRelease.image)}
                alt={`${detailModalRelease.artist} - ${detailModalRelease.title}`}
                className="mx-auto h-auto w-full max-w-[300px] border border-[#769a75]/70 object-cover sm:max-w-[360px]"
              />
            </button>
            <h3 className="mt-4 text-center uppercase text-[#f4fbf3]" style={{ fontSize: 'clamp(1rem, 2.4vw, 1.25rem)', fontWeight: 700, letterSpacing: '0.08em' }}>
              {detailModalRelease.artist} - {detailModalRelease.title}
            </h3>
            <p className="mt-3 text-center text-[#b7c8b5]" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              {detailModalRelease.description}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[#769a75] sm:flex sm:flex-wrap sm:justify-center sm:gap-6" style={{ fontSize: '0.75rem', letterSpacing: '0.06em' }}>
              <span>YEAR: {detailModalRelease.year}</span>
              <span>GENRE: {detailModalRelease.genre.toUpperCase()}</span>
              <span>FORMAT: {detailModalRelease.formats.join(', ').toUpperCase()}</span>
              <span>PRICE: EUR {detailModalRelease.price.toFixed(2)}</span>
            </div>
            <div className="mt-4 grid gap-2 text-[#b7c8b5]" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>
              {detailModalRelease.details.map((detail) => (
                <p key={detail}>- {detail}</p>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="uppercase text-[#00FF5A]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em' }}>
                Track Highlights
              </p>
              <p className="mt-2 text-[#f4fbf3]" style={{ fontSize: '0.9rem', letterSpacing: '0.04em' }}>
                {detailModalRelease.trackHighlights.join(' / ')}
              </p>
            </div>
            <div className="mt-5 flex justify-center">
              <button
                onClick={() => addReleaseToCart(detailModalRelease)}
                className="border border-[#769a75]/70 px-6 py-2 text-[#f4fbf3] hover:border-[#00FF5A] hover:text-[#00FF5A] transition-colors uppercase"
                style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em' }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}






