import { useState } from 'react';
import { ImageWithFallback } from './ImageWithFallback';
import { Play } from 'lucide-react';
import type { CartItemInput } from './SubpageContent';

interface DistroItem {
  id: string;
  name: string;
  artist: string;
  image: string;
  format: string;
  price: number;
  listeningUrl?: string;
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

interface Props {
  items: DistroItem[];
  onAddToCart: (item: CartItemInput) => void;
}

export default function DistroGrid({ items, onAddToCart }: Props) {
  const [detailModalItem, setDetailModalItem] = useState<DistroItem | null>(null);
  const [isDetailImageLarge, setIsDetailImageLarge] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const DEFAULT_LISTEN_URL = 'https://selvajariarecords.bandcamp.com/';

  const displayed = showAll ? items : items.slice(0, 24); // increased count because thumbs are smaller
  const openItemDetails = (item: DistroItem) => {
    setDetailModalItem(item);
    setIsDetailImageLarge(false);
  };
  const closeItemDetails = () => {
    setDetailModalItem(null);
    setIsDetailImageLarge(false);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {displayed.map((item) => (
          <div key={item.id} className="relative">
            <button
              onClick={() => openItemDetails(item)}
              className="block w-full"
              aria-label={`View release details for ${item.artist} ${item.name}`}
            >
              <div className="flex aspect-square w-full items-center justify-center overflow-hidden">
                <ImageWithFallback src={asset(item.image)} alt={`${item.artist} - ${item.name}`} className="h-full w-full object-contain" />
              </div>
            </button>

            <div className="mt-2">
              <div className="uppercase text-[#00C747]" style={{ fontSize: '0.62rem', fontWeight: 700 }}>{item.artist}</div>
              <div className="text-[#f4fbf3]" style={{ fontSize: '0.78rem', fontWeight: 700 }}>{item.name}</div>
              <div className="mt-1 flex items-center justify-between">
                <div className="text-[#769a75]" style={{ fontSize: '0.72rem' }}>{item.format}</div>
                <div className="text-[#f4fbf3]" style={{ fontWeight: 700 }}>EUR {item.price.toFixed(2)}</div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => openItemDetails(item)}
                  className="w-full border-2 border-[#00C747]/60 px-2 py-1 text-[#00C747] hover:bg-[#00C747] hover:text-[#131e13] uppercase"
                  style={{ fontSize: '0.65rem', fontWeight: 700 }}
                >
                  View
                </button>
                <button onClick={() => onAddToCart({ id: item.id, name: item.name, artist: item.artist, format: item.format, price: item.price, image: item.image })} className="w-full border-2 border-[#769a75]/70 px-2 py-1 text-[#f4fbf3] hover:border-[#00C747] hover:text-[#00C747] uppercase" style={{ fontSize: '0.65rem', fontWeight: 700 }}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length > 24 && (
        <div className="mt-4 flex justify-center">
          <button onClick={() => setShowAll((s) => !s)} className="border border-[#00C747]/70 px-6 py-2 text-[#00C747] hover:bg-[#00C747] hover:text-[#131e13] uppercase" style={{ fontSize: '0.75rem', fontWeight: 700 }}>
            {showAll ? 'Show Less' : 'View More'}
          </button>
        </div>
      )}

      {detailModalItem && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#050805]/92 p-4 backdrop-blur-[2px] sm:p-6"
          onClick={closeItemDetails}
          role="dialog"
          aria-modal="true"
          aria-label={`Release details for ${detailModalItem.artist} ${detailModalItem.name}`}
        >
          <div
            className="flex max-h-[84vh] w-full max-w-4xl flex-col overflow-hidden border-2 border-[#769a75]/60 bg-[#101910]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#769a75]/30 px-4 py-3 sm:px-6">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#00C747]">{detailModalItem.artist}</p>
                <h3 className="mt-1 text-base font-semibold uppercase tracking-[0.05em] text-[#f4fbf3] sm:text-lg">{detailModalItem.name}</h3>
              </div>
              <button
                onClick={closeItemDetails}
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
                  aria-label={`Enlarge cover for ${detailModalItem.artist} ${detailModalItem.name}`}
                >
                  <ImageWithFallback
                    src={asset(detailModalItem.image)}
                    alt={`${detailModalItem.artist} - ${detailModalItem.name}`}
                    className="h-auto w-full object-contain"
                  />
                </button>

                <div className="mt-4 grid grid-cols-2 gap-2 text-[0.82rem] tracking-[0.05em] text-[#769a75]">
                  <div><span className="text-[#00C747]">ARTIST:</span> {detailModalItem.artist}</div>
                  <div><span className="text-[#00C747]">FORMAT:</span> {detailModalItem.format}</div>
                  <div><span className="text-[#00C747]">PRICE:</span> EUR {detailModalItem.price.toFixed(2)}</div>
                  <div><span className="text-[#00C747]">TYPE:</span> DISTRO</div>
                </div>
              </div>

              <div className="flex min-h-0 flex-col">
                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-6">
                  <div>
                    <p className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#00C747]">Description</p>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-[#b7c8b5]">
                      Selected distribution title from {detailModalItem.artist}. Physical stock is limited and packed in protective mailers.
                    </p>
                  </div>

                  <div>
                    <p className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#00C747]">Details</p>
                    <ul className="mt-2 space-y-1 text-[0.9rem] leading-relaxed text-[#b7c8b5]">
                      <li>- Official distro stock</li>
                      <li>- Format: {detailModalItem.format}</li>
                      <li>- Fast handling and secure shipping</li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-[#769a75]/25 p-4 sm:px-6 sm:py-4">
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={() => onAddToCart({ id: detailModalItem.id, name: detailModalItem.name, artist: detailModalItem.artist, format: detailModalItem.format, price: detailModalItem.price, image: detailModalItem.image })}
                      className="flex-1 border border-[#769a75]/70 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#f4fbf3] transition-colors hover:border-[#00C747] hover:text-[#00C747]"
                    >
                      Add To Cart
                    </button>
                    <a
                      href={detailModalItem.listeningUrl ?? DEFAULT_LISTEN_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 border border-[#00C747]/70 bg-[#00C747] px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#131e13] transition-all hover:bg-[#00C747]/90"
                    >
                      <Play className="h-3 w-3" />
                      Listen
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {detailModalItem && isDetailImageLarge && (
        <button
          type="button"
          onClick={() => setIsDetailImageLarge(false)}
          className="large-image-overlay fixed inset-0 z-[110] flex items-center justify-center bg-[#050805]/85"
          aria-label="Close full image view"
        >
          <ImageWithFallback
            src={asset(detailModalItem.image)}
            alt={`${detailModalItem.artist} - ${detailModalItem.name}`}
            className="large-image-content max-h-[92vh] max-w-[92vw] object-contain"
          />
        </button>
      )}
    </>
  );
}

