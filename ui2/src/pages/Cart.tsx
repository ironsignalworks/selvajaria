import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../store';
import { formatPrice } from '../lib/utils';
import { useNavigate, Link } from 'react-router-dom';

export const Cart = () => {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCart();
  const navigate = useNavigate();
  const total = getTotal();
  const shipping = total > 0 ? 10 : 0;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="w-24 h-24 bg-neutral-100 flex items-center justify-center mx-auto mb-8 brutalist-border">
          <ShoppingBag className="w-12 h-12 text-neutral-300" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tighter mb-4">
          Your Cart is <span className="text-brand-accent">Empty</span>
        </h1>
        <p className="text-neutral-500 mb-10 max-w-md mx-auto">
          Looks like you haven't added any sounds to your collection yet.
        </p>
        <Link
          to="/releases"
          className="inline-flex items-center space-x-2 bg-black text-white px-8 py-4 font-display font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors brutalist-shadow"
        >
          <span>Browse Releases</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <h1 className="text-5xl sm:text-7xl font-display font-bold uppercase tracking-tighter mb-12">
        Your <span className="text-brand-accent">Cart</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-white brutalist-border"
              >
                <div className="w-32 h-32 flex-shrink-0 bg-neutral-100 brutalist-border overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-xl font-display font-bold uppercase mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{item.artist}</p>
                  <div className="flex items-center justify-center sm:justify-start space-x-4">
                    <div className="flex items-center brutalist-border bg-neutral-100">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-black hover:text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-mono font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-black hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-400 hover:text-brand-accent transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="text-2xl font-display font-bold">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="bg-neutral-100 p-8 brutalist-border sticky top-24">
            <h2 className="text-2xl font-display font-bold uppercase mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-neutral-500 uppercase tracking-widest">Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-neutral-500 uppercase tracking-widest">Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="pt-4 border-t border-black/10 flex justify-between items-end">
                <span className="text-lg font-display font-bold uppercase tracking-widest">Total</span>
                <span className="text-3xl font-display font-bold text-brand-accent">
                  {formatPrice(total + shipping)}
                </span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout/success')}
              className="w-full bg-black text-white py-4 px-8 font-display font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors flex items-center justify-center space-x-3 brutalist-shadow"
            >
              <span>Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="mt-6 text-[10px] text-neutral-400 uppercase tracking-widest text-center leading-relaxed">
              Secure checkout powered by Stripe.<br />
              All prices in USD. Shipping worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
