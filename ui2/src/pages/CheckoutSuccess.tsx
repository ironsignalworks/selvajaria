import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../store';

export const CheckoutSuccess = () => {
  const [status, setStatus] = useState<'processing' | 'success'>('processing');
  const clearCart = useCart((state) => state.clearCart);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
      clearCart();
    }, 3000);

    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
      {status === 'processing' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <Loader2 className="w-16 h-16 animate-spin mx-auto text-brand-accent" />
          <h1 className="text-4xl font-display font-bold uppercase tracking-tighter">
            Processing your <span className="text-brand-accent">Payment</span>
          </h1>
          <p className="text-neutral-500">Please do not refresh the page...</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 flex items-center justify-center mx-auto rounded-full">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-display font-bold uppercase tracking-tighter">
              Order <span className="text-green-600">Confirmed</span>
            </h1>
            <p className="text-neutral-500 max-w-md mx-auto">
              Thank you for supporting independent music. You will receive a confirmation email shortly with your tracking details.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-4 font-display font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors brutalist-shadow"
          >
            Return Home
          </button>
        </motion.div>
      )}
    </div>
  );
};
