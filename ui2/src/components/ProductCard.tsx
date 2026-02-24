import { motion } from 'motion/react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../store';
import { formatPrice } from '../lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onView: (product: Product) => void;
}

export const ProductCard = ({ product, onView }: ProductCardProps) => {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`Added ${product.title} to cart`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white brutalist-border brutalist-shadow-hover overflow-hidden flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden border-b-2 border-black bg-neutral-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
          <button
            onClick={() => onView(product)}
            className="p-3 bg-white text-black hover:bg-brand-accent hover:text-white transition-colors brutalist-shadow-hover"
            title="View Details"
          >
            <Eye className="w-6 h-6" />
          </button>
          <button
            onClick={handleAddToCart}
            className="p-3 bg-white text-black hover:bg-brand-accent hover:text-white transition-colors brutalist-shadow-hover"
            title="Add to Cart"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            {product.format || product.category}
          </span>
          {product.stock < 20 && (
            <span className="bg-brand-accent text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
              Low Stock
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-bold text-lg leading-tight group-hover:text-brand-accent transition-colors">
            {product.title}
          </h3>
          <span className="font-mono font-bold text-sm bg-neutral-100 px-2 py-1">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="text-sm text-neutral-600 font-medium mb-4">{product.artist}</p>
        
        <div className="mt-auto pt-4 border-t border-black/5 flex justify-between items-center">
          <span className="text-[10px] font-mono uppercase text-neutral-400">
            {product.catalogNumber || 'DISTRO'}
          </span>
          <button
            onClick={() => onView(product)}
            className="text-[10px] font-bold uppercase tracking-widest hover:text-brand-accent transition-colors"
          >
            Details →
          </button>
        </div>
      </div>
    </motion.div>
  );
};
