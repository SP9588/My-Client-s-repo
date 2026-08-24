import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Heart, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
  onOpenAIStylist: () => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
}

export const Header: React.FC<HeaderProps> = ({
  savedCount,
  onOpenSaved,
  onOpenAIStylist,
  lang,
  setLang
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-amber-900 text-amber-100 text-xs px-4 py-1.5 font-medium flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-4xl mx-auto w-full justify-between sm:justify-start sm:gap-6">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white">{STORE_INFO.status}</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-amber-200">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            {STORE_INFO.address}
          </span>
          <a
            href={`tel:${STORE_INFO.phone}`}
            className="sm:ml-auto inline-flex items-center gap-1 font-semibold text-white hover:text-amber-200 transition-colors"
          >
            <Phone className="w-3 h-3" />
            {STORE_INFO.displayPhone}
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 flex items-center justify-center text-amber-200 font-display text-xl font-bold shadow-sm border border-amber-600/30">
            JC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-lg sm:text-xl text-stone-900 tracking-tight leading-tight">
                {lang === 'hi' ? STORE_INFO.hindiName : STORE_INFO.name}
              </h1>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-300">
                4.7 ★
              </span>
            </div>
            <p className="text-xs text-stone-500 flex items-center gap-1 font-normal">
              <span>{lang === 'hi' ? 'मंदिर के पास, शिवरीनारायण' : 'Near Mandir, Shivrinarayan'}</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* AI Style Advisor */}
          <button
            id="ai-stylist-btn"
            onClick={onOpenAIStylist}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-all shadow-xs"
            title="Saree & Fabric Style Advisor"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline">{lang === 'hi' ? 'स्टाइल सलाहकार' : 'AI Style Advisor'}</span>
            <span className="md:hidden">{lang === 'hi' ? 'सलाह' : 'Advisor'}</span>
          </button>

          {/* Saved / Wishlist */}
          <button
            id="wishlist-btn"
            onClick={onOpenSaved}
            className="relative p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            title="Saved Items"
          >
            <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* WhatsApp Quick Link */}
          <a
            id="header-whatsapp-btn"
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Namaste Jawahar Cloth, I would like to inquire about your saree and fabric collection.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Language Toggle */}
          <button
            id="lang-toggle-btn"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors"
          >
            {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
};
