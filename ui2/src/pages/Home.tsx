import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Disc, Music, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { Product } from '../types';

export const Home = () => {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const featuredReleases = PRODUCTS.filter(p => p.category === 'release').slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-black text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                <Disc className="w-4 h-4 animate-spin-slow" />
                <span>New Arrival / SLV001</span>
              </div>
              <h1 className="text-6xl sm:text-8xl font-display font-bold leading-[0.9] mb-8 uppercase tracking-tighter">
                Echoes of the <span className="text-brand-accent">Void</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-lg leading-relaxed font-medium">
                The highly anticipated debut from Nox Aeterna. A masterclass in atmospheric sound design and industrial rhythm.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/releases"
                  className="bg-white text-black px-8 py-4 font-display font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center space-x-2 brutalist-shadow"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => setSelectedProduct(PRODUCTS[0])}
                  className="border-2 border-white text-white px-8 py-4 font-display font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  View Release
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hidden lg:block relative"
            >
              <div className="relative aspect-square w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-brand-accent translate-x-4 translate-y-4" />
                <img
                  src={PRODUCTS[0].imageUrl}
                  alt="Featured Release"
                  className="relative z-10 w-full h-full object-cover border-2 border-white"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Releases */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tighter mb-4">
              Latest <span className="text-brand-accent">Releases</span>
            </h2>
            <p className="text-neutral-500 font-medium max-w-md">
              Fresh sounds from our core roster. Curated for the discerning listener.
            </p>
          </div>
          <Link
            to="/releases"
            className="group flex items-center space-x-2 font-display font-bold uppercase tracking-widest text-sm hover:text-brand-accent transition-colors"
          >
            <span>View All Releases</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredReleases.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* Categories / Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
          <Link
            to="/distro"
            className="md:col-span-8 group relative overflow-hidden brutalist-border brutalist-shadow-hover bg-neutral-100"
          >
            <img
              src="https://picsum.photos/seed/distro-hero/1200/800"
              alt="Distribution"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <Music className="w-10 h-10 mb-4 text-brand-accent" />
              <h3 className="text-4xl font-display font-bold uppercase mb-2">Distribution</h3>
              <p className="text-white/60 max-w-sm mb-6">Curated selection from our partner labels worldwide.</p>
              <span className="inline-flex items-center space-x-2 font-bold uppercase tracking-widest text-sm">
                <span>Browse Distro</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <Link
            to="/merch"
            className="md:col-span-4 group relative overflow-hidden brutalist-border brutalist-shadow-hover bg-brand-accent"
          >
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.1)_20px,rgba(0,0,0,0.1)_40px)]" />
            <div className="relative h-full p-8 flex flex-col justify-between text-white">
              <ShoppingBag className="w-10 h-10" />
              <div>
                <h3 className="text-4xl font-display font-bold uppercase mb-2">Merch</h3>
                <p className="text-white/80 mb-6">Wear the sound. Premium apparel and accessories.</p>
                <span className="inline-flex items-center space-x-2 font-bold uppercase tracking-widest text-sm bg-white text-black px-4 py-2 brutalist-shadow">
                  <span>Shop Merch</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
