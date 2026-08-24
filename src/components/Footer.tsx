import React from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Navigation,
  ArrowUp
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface FooterProps {
  onTabChange: (tab: string) => void;
  lang: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ onTabChange, lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & About */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-amber-200 flex items-center justify-center font-display font-bold text-xl border border-amber-600/40">
                JC
              </div>
              <div>
                <h3 className="font-bold text-white text-lg font-display">
                  {STORE_INFO.name} ({STORE_INFO.hindiName})
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  {STORE_INFO.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              Serving the sacred town of Shivrinarayan with pure Chhattisgarh Kosa Silk, wedding banarasi sarees, lehengas, men’s traditional kurtas, dhotis, and branded suiting fabrics.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded font-medium">
                <ShieldCheck className="w-3 h-3" />
                Verified Business Profile
              </span>
              <span className="text-xs text-amber-300 font-bold">
                Rating: 4.7 ★ (3+ Reviews)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-stone-200">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onTabChange('overview')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Overview & Timings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('catalog')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Sarees & Fabric Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('photos')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Photos & Storefront Reel (0:30)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('reviews')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Customer Reviews (4.7 ★)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onTabChange('map')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Map of Jawahar cloth & Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Address */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-stone-200">
              Store Details
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Open · Closes 9:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold pt-1">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-amber-300">
                  {STORE_INFO.displayPhone}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Namaste Jawahar Cloth, I would like to inquire about your store.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & scroll to top */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Jawahar Cloth, Shivrinarayan, Chhattisgarh. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-stone-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
