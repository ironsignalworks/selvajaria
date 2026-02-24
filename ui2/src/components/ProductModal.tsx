import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Calendar, Tag, Package } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../store';
import { formatPrice } from '../lib/utils';
import { toast } from 'sonner';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const addItem = useCart((state) => state.addItem);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`Added ${product.title} to cart`);
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto brutalist-border brutalist-shadow"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black text-white hover:bg-brand-accent transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Section */}
              <div className="bg-neutral-100 border-b-2 md:border-b-0 md:border-r-2 border-black">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Info Section */}
              <div className="p-6 sm:p-10 flex flex-col">
                <div className="mb-8">
                  <div className="flex items-center space-x-2 text-brand-accent font-mono text-xs uppercase tracking-[0.2em] mb-2">
                    <span>{product.category}</span>
                    {product.catalogNumber && (
                      <>
                        <span>/</span>
                        <span>{product.catalogNumber}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2 leading-tight">
                    {product.title}
                  </h2>
                  <p className="text-xl text-neutral-600 font-medium">{product.artist}</p>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2 text-neutral-500">
                      <Package className="w-4 h-4" />
                      <span className="font-mono uppercase">{product.format}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-500">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono">{product.releaseDate}</span>
                    </div>
                  </div>

                  <div className="prose prose-sm max-w-none text-neutral-700 leading-relaxed">
                    {product.description}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center space-x-1 px-2 py-1 bg-neutral-100 text-[10px] font-bold uppercase tracking-widest text-neutral-500"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t-2 border-black/5 flex flex-col sm:flex-row items-center gap-6">
                  <div className="text-3xl font-display font-bold">
                    {formatPrice(product.price)}
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:flex-grow bg-black text-white py-4 px-8 font-display font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors flex items-center justify-center space-x-3 brutalist-shadow-hover"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
