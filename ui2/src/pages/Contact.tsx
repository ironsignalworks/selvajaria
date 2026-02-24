import { Mail, MapPin, Phone, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Info */}
        <div>
          <h1 className="text-5xl sm:text-7xl font-display font-bold uppercase tracking-tighter mb-8">
            Get in <span className="text-brand-accent">Touch</span>
          </h1>
          <p className="text-neutral-500 font-medium text-lg mb-12 max-w-md">
            For demo submissions, wholesale inquiries, or just to say hello. We're always listening.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center brutalist-border flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold uppercase tracking-widest text-sm mb-1">Email</h3>
                <p className="text-neutral-600 font-medium">hello@selvajaria.com</p>
                <p className="text-neutral-400 text-xs mt-1">General & Support</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center brutalist-border flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold uppercase tracking-widest text-sm mb-1">Office</h3>
                <p className="text-neutral-600 font-medium">123 Underground Way</p>
                <p className="text-neutral-600 font-medium">Berlin, DE 10115</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center brutalist-border flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold uppercase tracking-widest text-sm mb-1">Phone</h3>
                <p className="text-neutral-600 font-medium">+49 (0) 30 123 456 78</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-neutral-100 p-8 sm:p-12 brutalist-border">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white brutalist-border focus:outline-none focus:border-brand-accent font-medium"
                  placeholder="YOUR NAME"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white brutalist-border focus:outline-none focus:border-brand-accent font-medium"
                  placeholder="YOUR@EMAIL.COM"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Subject</label>
              <select className="w-full px-4 py-3 bg-white brutalist-border focus:outline-none focus:border-brand-accent font-medium">
                <option>GENERAL INQUIRY</option>
                <option>DEMO SUBMISSION</option>
                <option>WHOLESALE / DISTRO</option>
                <option>ORDER SUPPORT</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Message</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 bg-white brutalist-border focus:outline-none focus:border-brand-accent font-medium resize-none"
                placeholder="HOW CAN WE HELP?"
              ></textarea>
            </div>

            <button className="w-full bg-black text-white py-4 px-8 font-display font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors flex items-center justify-center space-x-3 brutalist-shadow">
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
