import { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import DistroGrid from './DistributionGrid';
import { Mail, Instagram, Facebook, Youtube, Disc3, type LucideIcon } from 'lucide-react';

export type SubpageKey =
  | 'distro'
  | 'merch'
  | 'contacto'
  | 'cart'
  | 'thrash'
  | 'death'
  | 'black'
  | 'heavy'
  | 'portugal'
  | 'privacy'
  | 'terms'
  | 'shipping';

interface SubpageContentProps {
  page: SubpageKey;
  onNavigate: (page: SubpageKey) => void;
  cartItems: CartItem[];
  onAddToCart: (item: CartItemInput) => void;
  onUpdateCartQty: (id: string, qty: number) => void;
  onRemoveCartItem: (id: string) => void;
  onClearCart: () => void;
}

const pageMeta: Record<SubpageKey, { title: string; intro: string }> = {
  distro: {
    title: 'Distro',
    intro: 'Hand-picked underground titles from allied labels and bands.',
  },
  merch: {
    title: 'Merch',
    intro: 'Apparel and physical merch from the label and selected artists.',
  },
  contacto: {
    title: 'Contact',
    intro: 'Booking, wholesale, press, and general contact channels.',
  },
  cart: {
    title: 'Shopping Cart',
    intro: 'Review selected items before checkout.',
  },
  thrash: {
    title: 'Estilo: Thrash',
    intro: 'Fast riffs, razor drums, and old-school attack energy.',
  },
  death: {
    title: 'Estilo: Death',
    intro: 'Rotten tone, blast-driven aggression, and cavern depth.',
  },
  black: {
    title: 'Estilo: Black',
    intro: 'Cold atmosphere, speed, and raw ritual intensity.',
  },
  heavy: {
    title: 'Estilo: Heavy',
    intro: 'Classic steel, anthemic hooks, and loud stage attitude.',
  },
  portugal: {
    title: 'Estilo: Portugal',
    intro: 'Local underground focus: artists, labels, and scene support.',
  },
  privacy: {
    title: 'Privacy & Shipping Policy',
    intro: 'How Selvajaria Records handles customer data and shipping operations.',
  },
  terms: {
    title: 'Terms & Conditions',
    intro: 'Rules governing purchases, site use, and order processing.',
  },
  shipping: {
    title: 'Privacy & Shipping Policy',
    intro: 'How Selvajaria Records handles customer data and shipping operations.',
  },
};

interface DistroItem {
  id: string;
  name: string;
  artist: string;
  image: string;
  format: string;
  price: number;
  listeningUrl?: string;
}

export interface CartItemInput {
  id: string;
  name: string;
  artist: string;
  format: string;
  price: number;
  image: string;
}

export interface CartItem extends CartItemInput {
  qty: number;
}

const distroItems: DistroItem[] = [
  { id: 'fatal-exposure-bikini-atoll-broadcast', name: 'Bikini Atoll Broadcast', artist: 'Fatal Exposure', image: '/fatal exposure capa.jpg', format: 'CD', price: 12, listeningUrl: 'https://selvajariarecords.bandcamp.com/' },
  { id: 'catachrest-target-of-ruin', name: 'Target of Ruin', artist: 'Catachrest', image: '/catachrest.jpg', format: 'CD', price: 12, listeningUrl: 'https://selvajariarecords.bandcamp.com/' },
  { id: 'poison-the-preacher-vs-the-world', name: 'VS the World', artist: 'Poison the Preacher', image: '/poisonthepreacher.jpg', format: 'CD', price: 12, listeningUrl: 'https://selvajariarecords.bandcamp.com/' },
  { id: 'biolence-violent-obliteration', name: 'Violent Obliteration', artist: 'Biolence', image: '/biolence.jpg', format: 'CD', price: 12 },
  { id: 'dfc-sequencia-brutal', name: 'SequÃªncia Brutal de Estaladas e Biqueirada', artist: 'D.F.C.', image: '/dfc.jpg', format: 'CD', price: 12 },
  { id: 'psycho-mosher-madness-vortex', name: 'Trapped Into The Madness Vortex', artist: 'Psycho Mosher', image: '/psychomosher.jpg', format: 'CD', price: 12 },
  { id: 'raging-slayer-catatonic-symphony', name: 'Catatonic Symphony', artist: 'Raging Slayer', image: '/raging slayer capa.jpg', format: 'CD', price: 12 },
  { id: 'spoiled-collapse', name: 'Collapse', artist: 'Spoiled', image: '/spoiled.jpg', format: 'CD', price: 12 },
  { id: 'dekapited-destruccion-trascendental', name: 'Destruccion Trascendental', artist: 'Dekapited', image: '/dekapited.jpg', format: 'CD', price: 12 },
  { id: 'tvmvlo-portal-of-terror', name: 'Portal of Terror', artist: 'Tvmvlo', image: '/tvmvlo.jpg', format: 'CD', price: 12 },
  { id: 'deathlike-stab-knife-murders', name: 'Knife Murders', artist: 'Deathlike Stab', image: '/deathlike capa.jpg', format: 'CD', price: 12 },
  { id: 'animalesco-o-metodo', name: 'Animalesco, O MÃ©todo', artist: 'Animalesco, o MÃ©todo', image: '/animalesco.jpg', format: 'LP', price: 22 },
];

interface MerchItem {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  details: string[];
}

const merchItems: MerchItem[] = [
  {
    id: 'selvajaria-hoodie',
    name: 'Selvajaria Hoodie',
    image: '/hoodie.jpg',
    price: 25,
    description: 'Heavyweight hoodie with Selvajaria Records print for daily wear and live nights.',
    details: ['Unisex fit', 'Front print', 'Soft brushed interior'],
  },
  {
    id: 'selvajaria-longsleeve',
    name: 'Selvajaria Longsleeve',
    image: '/longsleeve.jpg',
    price: 25,
    description: 'Longsleeve essential with label identity print and durable cotton body.',
    details: ['Unisex fit', 'Front print', '100% cotton'],
  },
];
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

const contactLinks = [
  { label: 'Email', href: 'mailto:selvajariarecords@gmail.com', value: 'selvajariarecords@gmail.com' },
  { label: 'Bandcamp', href: 'https://selvajariarecords.bandcamp.com/', value: 'selvajariarecords.bandcamp.com' },
  { label: 'Instagram', href: 'https://www.instagram.com/selvajaria_records/', value: '@selvajaria_records' },
  { label: 'Facebook', href: 'https://www.facebook.com/selvajariarecords/', value: 'facebook.com/selvajariarecords' },
  { label: 'YouTube', href: 'https://www.youtube.com/@SelvajariaRecords', value: '@SelvajariaRecords' },
];

const contactIcons: Record<string, LucideIcon> = {
  Email: Mail,
  Bandcamp: Disc3,
  Instagram: Instagram,
  Facebook: Facebook,
  YouTube: Youtube,
};

const styleHighlights: Record<Exclude<SubpageKey, 'distro' | 'merch' | 'contacto' | 'cart' | 'privacy' | 'terms' | 'shipping'>, string[]> = {
  thrash: ['Palm-muted riffing', 'Fast double-kick grooves', 'Sharp social lyrics'],
  death: ['Low-tuned guitars', 'Blast-beat sections', 'Morbid artwork focus'],
  black: ['Raw production aesthetics', 'Tremolo-driven melodies', 'Atmospheric intros'],
  heavy: ['Twin lead guitars', 'Hook-forward choruses', 'Classic galloping rhythms'],
  portugal: ['PT scene map updates', 'Local event recaps', 'Regional label collaborations'],
};

export default function SubpageContent({
  page,
  onNavigate,
  cartItems,
  onAddToCart,
  onUpdateCartQty,
  onRemoveCartItem,
  onClearCart,
}: SubpageContentProps) {
  const meta = pageMeta[page];
  const [detailMerch, setDetailMerch] = useState<MerchItem | null>(null);
  const [isMerchImageLarge, setIsMerchImageLarge] = useState(false);
  const [mobileDistroFiltersOpen, setMobileDistroFiltersOpen] = useState(false);
  const [shippingZone, setShippingZone] = useState<1 | 2 | 3 | 4>(1);
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const extraItemShipping = Math.floor(totalItemCount / 4) * 2;
  const shippingFee = cartItems.length > 0 ? 8 + (shippingZone - 1) * 2 + extraItemShipping : 0;
  const cartTotal = cartSubtotal + shippingFee;

  return (
    <main id="main-content" className="container mx-auto px-4 py-12">
      <section className="mb-8 rounded-sm border border-[#769a75]/60 bg-[#101910cc] p-4 sm:p-6">
        <h2
          className="uppercase"
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#f4fbf3'
          }}
        >
          {meta.title}
        </h2>
        <p
          className="mt-3"
          style={{
            fontSize: '0.9rem',
            color: '#b7c8b5',
            lineHeight: 1.6,
            letterSpacing: '0.03em'
          }}
        >
          {meta.intro}
        </p>
      </section>

      {page === 'distro' && (
        <section className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:hidden">
            <button
              onClick={() => setMobileDistroFiltersOpen((prev) => !prev)}
              className="border border-[#00C747]/70 px-4 py-2 text-[#00C747] uppercase hover:bg-[#00C747] hover:text-[#131e13]"
              style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em' }}
            >
              {mobileDistroFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          <div className={`${mobileDistroFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar />
          </div>

          <div className="flex-1 rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-3">
            {/* Distribution grid â€” same card style as releases but smaller thumbs and more items */}
            <DistroGrid
              items={distroItems}
              onAddToCart={(item) =>
                onAddToCart({ id: item.id, name: item.name, artist: item.artist, format: item.format, price: item.price, image: item.image })
              }
            />
          </div>
        </section>
      )}

      {page === 'merch' && (
        <section className="grid gap-4 md:grid-cols-3">
          {merchItems.map((item) => (
            <article key={item.name} className="brutalist-border brutalist-shadow-hover overflow-hidden bg-[#101910]">
              <button
                onClick={() => {
                  setDetailMerch(item);
                  setIsMerchImageLarge(false);
                }}
                className="block w-full"
                aria-label={`View merch details for ${item.name}`}
              >
                <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#0a120a]">
                  <img src={asset(item.image)} alt={item.name} className="h-full w-full object-contain" />
                </div>
              </button>
              <div className="p-4">
                <h3 className="text-[#f4fbf3]" style={{ fontWeight: 700, letterSpacing: '0.07em' }}>{item.name}</h3>
                <p className="mt-2 text-[#00C747]" style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>{item.price}</p>
                <button
                  onClick={() =>
                    onAddToCart({
                      id: item.id,
                      name: item.name,
                      artist: 'Selvajaria Records',
                      format: 'MERCH',
                      price: item.price,
                      image: item.image,
                    })
                  }
                  className="mt-3 w-full border-2 border-[#769a75]/70 px-3 py-2 text-[#f4fbf3] hover:border-[#00C747] hover:text-[#00C747] transition-colors uppercase"
                  style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em' }}
                >
                  Add To Cart
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {page === 'contacto' && (
        <section className="rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-6">
          <p className="mb-5 text-[#b7c8b5]" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
            For orders, label communication, booking, and distribution contact, use the links below.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                className="flex items-center gap-3 border border-[#769a75]/40 bg-[#131e13]/70 p-3 text-[#f4fbf3] transition-colors hover:border-[#00C747] hover:text-[#00C747]"
                style={{ fontSize: '0.9rem', letterSpacing: '0.02em' }}
              >
                {(() => {
                  const Icon = contactIcons[link.label] ?? Disc3;
                  return <Icon className="h-4 w-4 text-[#00C747]" />;
                })()}
                <div className="min-w-0">
                  <p className="uppercase text-[#00C747]" style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em' }}>
                    {link.label}
                  </p>
                  <p className="truncate">{link.value}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {page === 'cart' && (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-5">
            <div className="overflow-x-auto">
              <div className="min-w-[640px]">
                <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-[#769a75]/30 pb-3 text-[#00C747] uppercase"
                    style={{ fontSize: '0.9rem', letterSpacing: '0.1em', fontWeight: 700 }}>
                  <span>Item</span>
                  <span>Format</span>
                  <span>Qty</span>
                  <span>Total</span>
                  <span>Action</span>
                </div>
            {cartItems.length === 0 ? (
              <p className="mt-4 text-[#769a75]" style={{ fontSize: '1rem' }}>
                Your cart is empty.
              </p>
            ) : (
              <div className="mt-2 grid gap-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] items-start gap-4 border-b border-[#769a75]/20 py-3">
                    <div className="flex items-start gap-3">
                      <div className="h-14 w-14 shrink-0 border border-[#769a75]/40 bg-[#0b120b] p-1">
                        <img
                          src={asset(item.image)}
                          alt={`${item.artist} - ${item.name}`}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-[#f4fbf3]" style={{ fontSize: '1.1rem', letterSpacing: '0.02em' }}>
                          {item.name}
                        </p>
                        <p className="mt-1 text-[#769a75]" style={{ fontSize: '0.9rem' }}>
                          {item.artist}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#769a75]" style={{ fontSize: '0.95rem', letterSpacing: '0.08em' }}>{item.format}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateCartQty(item.id, item.qty - 1)}
                        className="h-7 w-7 border border-[#769a75]/60 text-[#f4fbf3] hover:border-[#00C747]"
                      >
                        -
                      </button>
                      <p className="text-[#f4fbf3]" style={{ fontSize: '1rem' }}>{item.qty}</p>
                      <button
                        onClick={() => onUpdateCartQty(item.id, item.qty + 1)}
                        className="h-7 w-7 border border-[#769a75]/60 text-[#f4fbf3] hover:border-[#00C747]"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[#f4fbf3]" style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                      EUR {(item.price * item.qty).toFixed(2)}
                    </p>
                    <button
                      onClick={() => onRemoveCartItem(item.id)}
                      className="text-[#769a75] hover:text-[#00C747]"
                      style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}
                    >
                      REMOVE
                    </button>
                  </div>
                ))}
              </div>
            )}
              </div>
            </div>
          </div>
          <aside className="w-full min-w-0 overflow-hidden h-fit rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-5 lg:sticky lg:top-24">
            <div className="mb-4">
              <label htmlFor="shipping-zone" className="uppercase text-[#00C747]" style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em' }}>
                Shipping Zone
              </label>
              <select
                id="shipping-zone"
                value={shippingZone}
                onChange={(event) => setShippingZone(Number(event.target.value) as 1 | 2 | 3 | 4)}
                className="mt-2 w-full border border-[#769a75]/60 bg-[#0b120b] px-3 py-2 text-[#f4fbf3] focus:border-[#00C747] focus:outline-none"
                style={{ fontSize: '0.95rem', letterSpacing: '0.04em' }}
              >
                <option value={1}>Zone 1 (EUR 8.00)</option>
                <option value={2}>Zone 2 (EUR 10.00)</option>
                <option value={3}>Zone 3 (EUR 12.00)</option>
                <option value={4}>Zone 4 (EUR 14.00)</option>
              </select>
              <p className="mt-2 text-[#769a75]" style={{ fontSize: '0.82rem' }}>
                Zone 1 is standard shipping. Each next zone adds EUR 2.00. Every 4 items adds EUR 2.00.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('shipping')}
                className="mt-2 text-left text-[#00C747] hover:text-[#9dffbe]"
                style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}
              >
                Shipping Info
              </button>
            </div>
            <div className="flex items-center justify-between text-[#769a75]" style={{ fontSize: '1rem' }}>
              <span>Subtotal</span>
              <span>EUR {cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[#769a75]" style={{ fontSize: '1rem' }}>
              <span>Shipping</span>
              <span>EUR {shippingFee.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[#769a75]/30 pt-3 text-[#f4fbf3]"
                 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              <span>Total</span>
              <span>EUR {cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={onClearCart}
              disabled={cartItems.length === 0}
              className="mt-4 w-full border border-[#769a75]/60 px-3 py-2 text-[#769a75] hover:border-[#00C747] hover:text-[#00C747] disabled:cursor-not-allowed disabled:opacity-50"
              style={{ fontSize: '0.86rem', fontWeight: 700, letterSpacing: '0.1em' }}
            >
              Clear Cart
            </button>
          </aside>
        </section>
      )}

      {['thrash', 'death', 'black', 'heavy', 'portugal'].includes(page) && (
        <section className="rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-6">
          <h3 className="uppercase text-[#00C747]" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em' }}>
            Highlights
          </h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {styleHighlights[page as Exclude<SubpageKey, 'distro' | 'merch' | 'contacto' | 'cart' | 'privacy' | 'terms' | 'shipping'>].map((line) => (
              <p
                key={line}
                className="rounded-sm border border-[#769a75]/40 bg-[#131e13]/70 p-4 text-[#f4fbf3]"
                style={{ fontSize: '0.85rem', letterSpacing: '0.04em' }}
              >
                {line}
              </p>
            ))}
          </div>
        </section>
      )}

      {(page === 'privacy' || page === 'shipping') && (
        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-5">
            <h3 className="uppercase text-[#00C747]" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em' }}>
              Data Collected
            </h3>
            <p className="mt-3 text-[#f4fbf3]" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              Name, email, shipping address, and order details are collected only to process purchases and support requests.
            </p>
          </article>
          <article className="rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-5">
            <h3 className="uppercase text-[#00C747]" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em' }}>
              Use & Retention
            </h3>
            <p className="mt-3 text-[#f4fbf3]" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              Data is used for order fulfillment, delivery updates, and legal accounting requirements. Marketing emails are opt-in only.
            </p>
          </article>
          <article className="rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-5">
            <h3 className="uppercase text-[#00C747]" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em' }}>
              Shipping Zones
            </h3>
            <p className="mt-3 text-[#f4fbf3]" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              Zone 1: EUR 8.00 (standard), Zone 2: EUR 10.00, Zone 3: EUR 12.00, Zone 4: EUR 14.00. Every 4 items adds EUR 2.00 shipping surcharge.
            </p>
          </article>
          <article className="rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-5">
            <h3 className="uppercase text-[#00C747]" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em' }}>
              Dispatch & Packaging
            </h3>
            <p className="mt-3 text-[#f4fbf3]" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              Orders dispatch in 2 to 5 business days. Vinyl ships in reinforced mailers; other items are packed in protective materials.
            </p>
          </article>
          <article className="rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-5">
            <h3 className="uppercase text-[#00C747]" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em' }}>
              Voucher
            </h3>
            <p className="mt-3 text-[#f4fbf3]" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              This section will describe eligibility, redemption windows, exclusions, and usage limits (discounted from a purchase of 20 Euro min order). Confirm.
            </p>
          </article>
          <article className="rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-5">
            <h3 className="uppercase text-[#00C747]" style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em' }}>
              Contact & Rights
            </h3>
            <p className="mt-3 text-[#f4fbf3]" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              You may request data access, correction, or deletion by writing to selvajariarecords@gmail.com.
            </p>
          </article>
        </section>
      )}

      {page === 'terms' && (
        <section className="rounded-sm border border-[#769a75]/50 bg-[#101910c7] p-6">
          <div className="grid gap-3">
            <div className="grid grid-cols-[180px_1fr] gap-4 rounded-sm border border-[#769a75]/35 bg-[#131e13]/70 px-4 py-3">
              <span className="uppercase text-[#00C747]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>Orders & Payment</span>
              <span className="text-[#f4fbf3]" style={{ fontSize: '0.9rem' }}>Orders are confirmed after payment clears. Confirmed orders keep checkout pricing.</span>
            </div>
            <div className="grid grid-cols-[180px_1fr] gap-4 rounded-sm border border-[#769a75]/35 bg-[#131e13]/70 px-4 py-3">
              <span className="uppercase text-[#00C747]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>Returns & Damages</span>
              <span className="text-[#f4fbf3]" style={{ fontSize: '0.9rem' }}>Report damage within 7 days with photos of product and packaging for replacement/refund review.</span>
            </div>
            <div className="grid grid-cols-[180px_1fr] gap-4 rounded-sm border border-[#769a75]/35 bg-[#131e13]/70 px-4 py-3">
              <span className="uppercase text-[#00C747]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>Liability</span>
              <span className="text-[#f4fbf3]" style={{ fontSize: '0.9rem' }}>No liability for delays from customs, carrier disruption, or incorrect shipping data.</span>
            </div>
            <div className="grid grid-cols-[180px_1fr] gap-4 rounded-sm border border-[#769a75]/35 bg-[#131e13]/70 px-4 py-3">
              <span className="uppercase text-[#00C747]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>Shipping Zones</span>
              <span className="text-[#f4fbf3]" style={{ fontSize: '0.9rem' }}>
                Zone 1: EUR 8.00 (standard). Zone 2: EUR 10.00. Zone 3: EUR 12.00. Zone 4: EUR 14.00.
              </span>
            </div>
            <div className="grid grid-cols-[180px_1fr] gap-4 rounded-sm border border-[#769a75]/35 bg-[#131e13]/70 px-4 py-3">
              <span className="uppercase text-[#00C747]" style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em' }}>Volume Surcharge</span>
              <span className="text-[#f4fbf3]" style={{ fontSize: '0.9rem' }}>
                Shipping adds EUR 2.00 for every 4 items in the cart (calculated automatically at checkout).
              </span>
            </div>
          </div>
        </section>
      )}

      {page === 'merch' && detailMerch && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-[#050805]/92 p-4 backdrop-blur-[2px] sm:p-6"
          onClick={() => {
            setDetailMerch(null);
            setIsMerchImageLarge(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Merch details for ${detailMerch.name}`}
        >
          <div
            className="flex max-h-[84vh] w-full max-w-4xl flex-col overflow-hidden border-2 border-[#769a75]/60 bg-[#101910]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#769a75]/30 px-4 py-3 sm:px-6">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#00C747]">Selvajaria Records</p>
                <h3 className="mt-1 text-base font-semibold uppercase tracking-[0.05em] text-[#f4fbf3] sm:text-lg">{detailMerch.name}</h3>
              </div>
              <button
                onClick={() => {
                  setDetailMerch(null);
                  setIsMerchImageLarge(false);
                }}
                className="border border-[#00C747]/70 px-3 py-1 text-[0.7rem] tracking-[0.1em] text-[#00C747] hover:bg-[#00C747] hover:text-[#131e13]"
              >
                CLOSE
              </button>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[minmax(240px,34%)_1fr]">
              <div className="border-b border-[#769a75]/25 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                <button
                  type="button"
                  onClick={() => setIsMerchImageLarge((prev) => !prev)}
                  className="mx-auto block w-full max-w-[300px] overflow-hidden"
                  aria-label={`Enlarge image for ${detailMerch.name}`}
                >
                  <img
                    src={asset(detailMerch.image)}
                    alt={detailMerch.name}
                    className="h-auto w-full object-contain"
                  />
                </button>

                <div className="mt-4 grid grid-cols-2 gap-2 text-[0.82rem] tracking-[0.05em] text-[#769a75]">
                  <div><span className="text-[#00C747]">TYPE:</span> MERCH</div>
                  <div><span className="text-[#00C747]">PRICE:</span> EUR {detailMerch.price.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex min-h-0 flex-col">
                <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4 sm:px-6">
                  <div>
                    <p className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#00C747]">Description</p>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-[#b7c8b5]">{detailMerch.description}</p>
                  </div>
                  <div>
                    <p className="text-[0.74rem] font-bold uppercase tracking-[0.12em] text-[#00C747]">Details</p>
                    <ul className="mt-2 space-y-1 text-[0.9rem] leading-relaxed text-[#b7c8b5]">
                      {detailMerch.details.map((detail) => (
                        <li key={detail}>- {detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-[#769a75]/25 p-4 sm:px-6 sm:py-4">
                  <button
                    onClick={() =>
                      onAddToCart({
                        id: detailMerch.id,
                        name: detailMerch.name,
                        artist: 'Selvajaria Records',
                        format: 'MERCH',
                        price: detailMerch.price,
                        image: detailMerch.image,
                      })
                    }
                    className="w-full border border-[#769a75]/70 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[#f4fbf3] transition-colors hover:border-[#00C747] hover:text-[#00C747]"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {page === 'merch' && detailMerch && isMerchImageLarge && (
        <button
          type="button"
          onClick={() => setIsMerchImageLarge(false)}
          className="large-image-overlay fixed inset-0 z-[110] flex items-center justify-center bg-[#050805]/85"
          aria-label="Close full image view"
        >
          <img
            src={asset(detailMerch.image)}
            alt={detailMerch.name}
            className="large-image-content max-h-[92vh] max-w-[92vw] object-contain"
          />
        </button>
      )}
    </main>
  );
}
