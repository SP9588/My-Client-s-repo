import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  Play, 
  ShoppingBag, 
  CreditCard, 
  Car, 
  Scissors, 
  Award, 
  ArrowRight,
  HelpCircle,
  Video
} from 'lucide-react';
import { STORE_INFO, HIGHLIGHTS, BUSINESS_HOURS, PRODUCTS_CATALOG, STORE_MEDIA } from '../data/storeData';
import { Product } from '../types';

interface OverviewTabProps {
  onSelectProduct: (product: Product) => void;
  onOpenVideoReel: () => void;
  onTabChange: (tab: string) => void;
  lang: 'en' | 'hi';
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  onSelectProduct,
  onOpenVideoReel,
  onTabChange,
  lang
}) => {
  const featuredProducts = PRODUCTS_CATALOG.filter(p => p.featured).slice(0, 4);

  return (
    <div className="space-y-8 py-6">
      
      {/* 0:30 Video Highlight Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-white shadow-md border border-amber-900/40 p-6 sm:p-8">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-semibold tracking-wide uppercase">
              <Video className="w-3.5 h-3.5" />
              <span>0:30 Video Showcase</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-amber-100">
              {lang === 'hi' ? 'त्योहार और शादी के नए आगमन की झलक देखें' : 'Explore Latest Festival & Wedding Arrivals'}
            </h3>
            <p className="text-stone-300 text-sm max-w-xl">
              {lang === 'hi'
                ? 'जवाहर क्लॉथ के विशेष कोसा सिल्क, बनारसी साड़ियां, और मेंस सूट फैब्रिक का 30 सेकंड का स्टोर वॉकथ्रू।'
                : 'Watch a quick 30-second walkthrough of our latest Kosa Silk, bridal sarees, and men’s ethnic fabric collections.'}
            </p>
          </div>
          <button
            id="watch-video-reel-overview"
            onClick={onOpenVideoReel}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 shrink-0"
          >
            <span className="w-8 h-8 rounded-full bg-stone-950 text-amber-400 flex items-center justify-center">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </span>
            <span>{lang === 'hi' ? 'वीडियो देखें (0:30)' : 'Play Store Reel (0:30)'}</span>
          </button>
        </div>
      </div>

      {/* Key Highlights Grid */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold font-display text-stone-900">
            {lang === 'hi' ? 'जवाहर क्लॉथ की विशेषताएं' : 'Why Visit Jawahar Cloth'}
          </h3>
          <p className="text-xs text-stone-500">
            {lang === 'hi' ? 'शिवरीनारायण में दशकों से विश्वास और शुद्धता का प्रतीक' : 'Trusted textile boutique in the historic temple town of Shivrinarayan'}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((item, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs hover:border-amber-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-amber-700" />
              </div>
              <h4 className="font-bold text-sm text-stone-900 mb-1">
                {lang === 'hi' ? item.hindiTitle : item.title}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Collections Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold font-display text-stone-900">
              {lang === 'hi' ? 'विशेष संग्रह और साड़ियां' : 'Featured Sarees & Collections'}
            </h3>
            <p className="text-xs text-stone-500">
              {lang === 'hi' ? 'पॉपुलर वैरायटी - सीधे व्हाट्सएप पर पूछताछ करें' : 'Handpicked popular picks ready for WhatsApp inquiry'}
            </p>
          </div>
          <button
            onClick={() => onTabChange('catalog')}
            className="text-xs font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 hover:underline"
          >
            <span>{lang === 'hi' ? 'सभी देखें' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 bg-amber-900/90 text-amber-100 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  {prod.fabric}
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-white/95 text-stone-900 text-xs font-extrabold px-2 py-1 rounded shadow-sm">
                  ₹{prod.price.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-stone-900 line-clamp-1 mb-1">
                    {lang === 'hi' && prod.hindiName ? prod.hindiName : prod.name}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                    {prod.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(`Namaste Jawahar Cloth, I am interested in: ${prod.name} (₹${prod.price}). Is it available?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Store Info & Business Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* About & Amenities */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="font-bold font-display text-base text-stone-900">
              {lang === 'hi' ? 'दुकान के बारे में' : 'About Jawahar Cloth'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Serving pilgrims, families, and bridal shoppers in Shivrinarayan for years.
            </p>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Located right near the sacred Shivrinarayan Mandir in Chhattisgarh, <strong>Jawahar Cloth</strong> is renowned for its vast curated collection of authentic <strong>Chhattisgarh Kosa Silk sarees</strong>, royal Banarasi bridal attire, fine men’s suiting fabrics, and auspicious puja clothing for temple rituals. We take pride in transparent pricing, warm hospitality, and pure fabric quality.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>In-store Shopping</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 text-stone-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>WhatsApp Video Call</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 text-stone-700">
              <CreditCard className="w-4 h-4 text-amber-600 shrink-0" />
              <span>UPI / Cash / Cards</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-50 text-stone-700">
              <Car className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Parking Near Mandir</span>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold font-display text-base text-stone-900">
                {lang === 'hi' ? 'दुकान का समय' : 'Store Hours'}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Open 7 days a week for devotees and shoppers
              </p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open Now
            </span>
          </div>

          <div className="divide-y divide-stone-100 text-xs sm:text-sm">
            {BUSINESS_HOURS.map((item, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between">
                <span className="font-medium text-stone-800">
                  {lang === 'hi' ? item.hindiDay : item.day}
                </span>
                <span className="text-stone-600 font-mono">
                  {item.open} – {item.close}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
            <span>Special festival hours during Magh Purnima & Melas</span>
            <a 
              href={`tel:${STORE_INFO.phone}`}
              className="text-amber-900 font-semibold hover:underline"
            >
              Call to confirm
            </a>
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-stone-100/70 rounded-xl p-5 border border-stone-200">
        <h3 className="font-bold font-display text-base text-stone-900 mb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-800" />
          {lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQs)' : 'Visitor Guide & FAQs'}
        </h3>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="bg-white p-3.5 rounded-lg border border-stone-200">
            <h4 className="font-bold text-stone-900 mb-1">
              {lang === 'hi' ? 'दुकान शिवरीनारायण मंदिर से कितनी दूर है?' : 'How far is the store from Shivrinarayan Mandir?'}
            </h4>
            <p className="text-stone-600">
              {lang === 'hi'
                ? 'दुकान मंदिर मार्ग पर मुख्य चौराहे के ठीक पास स्थित है। मंदिर दर्शन के बाद केवल 1-2 मिनट की पैदल दूरी है।'
                : 'Jawahar Cloth is located right on the main Mandir road within 1-2 minutes walking distance from the sacred temple gate.'}
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-stone-200">
            <h4 className="font-bold text-stone-900 mb-1">
              {lang === 'hi' ? 'क्या व्हाट्सएप पर वीडियो कॉल से साड़ियां देख सकते हैं?' : 'Can I view sarees and fabrics over WhatsApp video call?'}
            </h4>
            <p className="text-stone-600">
              {lang === 'hi'
                ? 'हाँ, आप 094241 42448 पर व्हाट्सएप संदेश भेजकर वीडियो शॉपिंग का समय तय कर सकते हैं।'
                : 'Yes! Simply message or call on 094241 42448, and we will show you live sarees and suiting fabrics over a WhatsApp video call.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
