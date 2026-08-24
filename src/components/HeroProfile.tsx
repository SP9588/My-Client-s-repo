import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Star, 
  Clock, 
  Navigation, 
  Check, 
  Play, 
  ShieldCheck,
  Sparkles,
  Layers,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORE_INFO, STORE_MEDIA } from '../data/storeData';

interface HeroProfileProps {
  isSaved: boolean;
  onToggleSave: () => void;
  onTabChange: (tab: string) => void;
  onOpenVideoReel: () => void;
  lang: 'en' | 'hi';
}

export const HeroProfile: React.FC<HeroProfileProps> = ({
  isSaved,
  onToggleSave,
  onTabChange,
  onOpenVideoReel,
  lang
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Jawahar Cloth, Shivrinarayan',
          text: 'Visit Jawahar Cloth near Mandir, Shivrinarayan for best Sarees, Kosa silk and menswear. Call: 094241 42448',
          url: window.location.href,
        });
      } catch (err) {
        // Share cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveClick = () => {
    if (!isSaved) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    onToggleSave();
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STORE_INFO.address)}`;

  return (
    <div className="bg-white border-b border-stone-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-6">
        
        {/* Top Listing Info Bar */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          
          {/* Main Business Details */}
          <div className="flex-1">
            
            {/* Category / Area Tag */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-amber-100/90 text-amber-950 text-xs font-semibold px-2.5 py-1 rounded-md border border-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                {lang === 'hi' ? 'वस्त्र एवं साड़ी भंडार' : 'Cloth & Saree Emporium'}
              </span>
              <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                Shivrinarayan, CG 495557
              </span>
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 text-[11px] font-semibold px-2 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" />
                Verified Local Business
              </span>
            </div>

            {/* Business Title */}
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight mb-1">
              {STORE_INFO.name}
              <span className="text-lg sm:text-xl font-normal text-stone-500 ml-2">
                ({STORE_INFO.hindiName})
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-stone-600 text-sm sm:text-base font-normal mb-3">
              {lang === 'hi'
                ? 'साड़ी, लहंगा, मेंस वियर एवं शुद्ध छत्तीसगढ़ कोसा सिल्क का प्रमुख केंद्र'
                : 'Premier destination for authentic Sarees, Kosa Silk, Lehengas, Menswear & Festive Fabrics in Shivrinarayan'}
            </p>

            {/* Rating & Reviews Line */}
            <div className="flex flex-wrap items-center gap-3 text-sm mb-3">
              <div 
                onClick={() => onTabChange('reviews')}
                className="flex items-center gap-1.5 cursor-pointer bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition-colors"
                title="View verified reviews"
              >
                <span className="font-bold text-stone-900 text-base">{STORE_INFO.rating}</span>
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                </div>
                <span className="text-stone-600 font-medium text-xs underline underline-offset-2">
                  ({STORE_INFO.totalReviews} Reviews)
                </span>
              </div>

              <span className="text-stone-300">·</span>

              {/* Status / Timing */}
              <div className="flex items-center gap-1.5 text-stone-700 font-medium text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">{STORE_INFO.status}</span>
                <span className="text-stone-400">(09:30 AM – 09:00 PM)</span>
              </div>
            </div>

            {/* Address & Contact Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-stone-700 mb-5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-medium text-stone-800">{STORE_INFO.address}</span>
                <button
                  onClick={handleCopyAddress}
                  className="p-1 hover:bg-stone-100 rounded text-stone-500 hover:text-stone-800 transition-colors"
                  title="Copy full address"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="hidden sm:inline text-stone-300">|</span>
              <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{STORE_INFO.displayPhone}</span>
              </div>
            </div>

            {/* Primary Action Buttons (Call, Directions, WhatsApp, Share, Save) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              
              {/* Call Button */}
              <a
                id="hero-call-btn"
                href={`tel:${STORE_INFO.phone}`}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-medium text-sm shadow-sm hover:shadow transition-all active:scale-98"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>{lang === 'hi' ? 'कॉल करें' : 'Call'}</span>
                <span className="text-xs text-amber-300 font-normal hidden xl:inline">({STORE_INFO.displayPhone})</span>
              </a>

              {/* Directions Button */}
              <a
                id="hero-directions-btn"
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-medium text-sm shadow-sm hover:shadow transition-all active:scale-98"
              >
                <Navigation className="w-4 h-4" />
                <span>{lang === 'hi' ? 'दिशा-निर्देश' : 'Directions'}</span>
              </a>

              {/* WhatsApp Button */}
              <a
                id="hero-whatsapp-btn"
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Namaste Jawahar Cloth, I saw your store listing and want to know more about sarees and festive collections.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-sm hover:shadow transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>

              {/* Share Button */}
              <button
                id="hero-share-btn"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-medium text-sm transition-colors active:scale-98"
                title="Share store profile"
              >
                {shared ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{shared ? 'Copied!' : (lang === 'hi' ? 'शेयर' : 'Share')}</span>
              </button>

              {/* Save Button */}
              <button
                id="hero-save-btn"
                onClick={handleSaveClick}
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border font-medium text-sm transition-all active:scale-98 ${
                  isSaved 
                    ? 'border-amber-400 bg-amber-50 text-amber-900 shadow-xs' 
                    : 'border-stone-300 bg-white hover:bg-stone-50 text-stone-700'
                }`}
                title="Save this place"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600 text-amber-600' : ''}`} />
                <span>{isSaved ? (lang === 'hi' ? 'सेव किया गया' : 'Saved') : (lang === 'hi' ? 'सेव करें' : 'Save')}</span>
              </button>

              {/* Video Reel Highlight 0:30 */}
              <button
                id="hero-video-reel-btn"
                onClick={onOpenVideoReel}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-medium text-xs transition-colors"
                title="Watch 0:30 Festival Arrivals Reel"
              >
                <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </span>
                <span>{lang === 'hi' ? 'वीडियो देखें (0:30)' : 'Store Reel (0:30)'}</span>
              </button>

            </div>

          </div>

          {/* Right Visual Highlight / Mini Gallery & Map Preview */}
          <div className="lg:w-80 shrink-0">
            <div className="grid grid-cols-2 gap-2">
              
              {/* Main Storefront Image */}
              <div 
                onClick={() => onTabChange('photos')}
                className="col-span-2 relative h-40 rounded-xl overflow-hidden cursor-pointer group shadow-xs border border-stone-200"
              >
                <img
                  src={STORE_MEDIA[1]?.url || STORE_MEDIA[0].url}
                  alt="Jawahar Cloth Storefront"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <div className="text-white">
                    <p className="text-xs font-semibold">Storefront near Mandir</p>
                    <p className="text-[10px] text-stone-300">Tap to view 10+ photos</p>
                  </div>
                </div>
              </div>

              {/* Saree Preview */}
              <div 
                onClick={() => onTabChange('photos')}
                className="relative h-24 rounded-lg overflow-hidden cursor-pointer group shadow-2xs border border-stone-200"
              >
                <img
                  src={STORE_MEDIA[2]?.url}
                  alt="Sarees collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <span className="text-white text-[11px] font-semibold drop-shadow">Sarees</span>
                </div>
              </div>

              {/* Map of Jawahar Cloth Action */}
              <div 
                onClick={() => onTabChange('map')}
                className="relative h-24 rounded-lg overflow-hidden cursor-pointer group shadow-2xs border border-stone-200 bg-stone-900"
              >
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:8px_8px]"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                  <MapPin className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform mb-1" />
                  <span className="text-white text-xs font-semibold leading-tight">Map of Jawahar cloth</span>
                  <span className="text-amber-300 text-[10px]">Tap to Navigate</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
