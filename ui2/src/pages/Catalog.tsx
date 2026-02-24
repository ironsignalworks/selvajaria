import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { Product, Category } from '../types';
import { cn } from '../lib/utils';

interface CatalogProps {
  category: Category;
  title: string;
  description: string;
}

export const Catalog = ({ category, title, description }: CatalogProps) => {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState<'newest' | 'price-low' | 'price-high' | 'artist'>('newest');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const allTags = Array.from(
    new Set(PRODUCTS.filter((p) => p.category === category).flatMap((p) => p.tags))
  ).sort();

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = p.category === category;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((tag) => p.tags.includes(tag));
    return matchesCategory && matchesSearch && matchesTags;
  }).sort((a, b) => {
    if (sortBy === 'newest') return b.releaseDate.localeCompare(a.releaseDate);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
    return 0;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl sm:text-7xl font-display font-bold uppercase tracking-tighter mb-4">
          {title.split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? "text-brand-accent" : ""}>
              {word}{' '}
            </span>
          ))}
        </h1>
        <p className="text-neutral-500 font-medium max-w-2xl text-lg">
          {description}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 items-start lg:items-center justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by artist or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-neutral-100 brutalist-border focus:outline-none focus:border-brand-accent font-medium"
          />
        </div>

        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="flex-grow lg:flex-grow-0 px-4 py-4 bg-white brutalist-border font-display font-bold uppercase tracking-widest text-xs focus:outline-none focus:border-brand-accent"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="artist">Artist A-Z</option>
          </select>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "p-4 brutalist-border transition-colors flex items-center space-x-2 font-display font-bold uppercase tracking-widest text-xs",
              isFilterOpen ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-100"
            )}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
            {selectedTags.length > 0 && (
              <span className="bg-brand-accent text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                {selectedTags.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="p-6 bg-neutral-100 brutalist-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold uppercase tracking-widest text-sm">Filter by Genre / Tag</h3>
                {selectedTags.length > 0 && (
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-[10px] font-bold uppercase tracking-widest text-brand-accent hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
                      selectedTags.includes(tag)
                        ? "bg-black text-white"
                        : "bg-white text-black hover:border-brand-accent border border-black/10"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={setSelectedProduct}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 text-center brutalist-border bg-neutral-50">
          <X className="w-12 h-12 mx-auto mb-4 text-neutral-300" />
          <h3 className="text-2xl font-display font-bold uppercase mb-2">No items found</h3>
          <p className="text-neutral-500">Try adjusting your filters or search query.</p>
        </div>
      )}

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
