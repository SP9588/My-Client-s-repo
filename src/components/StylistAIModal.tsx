import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  MessageCircle, 
  ArrowRight, 
  ShoppingBag, 
  Heart,
  RefreshCw
} from 'lucide-react';
import { STORE_INFO, PRODUCTS_CATALOG } from '../data/storeData';
import { Product } from '../types';

interface StylistAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  lang: 'en' | 'hi';
}

export const StylistAIModal: React.FC<StylistAIModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  lang
}) => {
  const [occasion, setOccasion] = useState<string>('mandir_puja');
  const [category, setCategory] = useState<string>('saree');
  const [budget, setBudget] = useState<string>('mid');
  const [step, setStep] = useState<'questions' | 'results'>('questions');

  if (!isOpen) return null;

  const occasions = [
    { id: 'mandir_puja', label: 'Shivrinarayan Mandir Darshan & Puja', emoji: '🛕' },
    { id: 'wedding', label: 'Wedding & Sangeet Ceremonies', emoji: '💍' },
    { id: 'festive', label: 'Festivals (Diwali, Holi, Teej, Mela)', emoji: '✨' },
    { id: 'daily_formal', label: 'Daily Wear, Office & Suiting', emoji: '👔' },
  ];

  const categories = [
    { id: 'saree', label: 'Saree (Kosa Silk / Banarasi / Chanderi)' },
    { id: 'mens', label: "Men's Kurta Pyjama & Suiting Fabric" },
    { id: 'lehenga', label: 'Bridal Lehenga / Designer Gown' },
    { id: 'suit', label: 'Unstitched Suit & Kurti Material' },
  ];

  const budgets = [
    { id: 'budget', label: 'Economy (Under ₹2,000)' },
    { id: 'mid', label: 'Popular (₹2,000 - ₹5,000)' },
    { id: 'luxury', label: 'Bridal & Premium (₹5,000+)' },
  ];

  // Filter recommendations based on answers
  const recommended = PRODUCTS_CATALOG.filter((p) => {
    if (category === 'saree' && (p.category === 'sarees' || p.category === 'puja-special')) return true;
    if (category === 'mens' && (p.category === 'mens' || p.category === 'fabrics')) return true;
    if (category === 'lehenga' && p.category === 'lehengas') return true;
    if (category === 'suit' && (p.category === 'kurtis' || p.category === 'fabrics')) return true;
    return false;
  }).slice(0, 3);

  const handleGetAdvice = () => {
    setStep('results');
  };

  const resetAdvisor = () => {
    setStep('questions');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-800/80 border border-amber-600/50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-base font-display">
                {lang === 'hi' ? 'जवाहर क्लॉथ AI स्टाइल सलाहकार' : 'Jawahar Saree & Style Advisor'}
              </h3>
              <p className="text-xs text-amber-200">
                Personalized fabric & outfit matching for Shivrinarayan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {step === 'questions' ? (
            <div className="space-y-5">
              
              {/* Question 1: Occasion */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-2">
                  1. What is the occasion?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {occasions.map((occ) => (
                    <button
                      key={occ.id}
                      type="button"
                      onClick={() => setOccasion(occ.id)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        occasion === occ.id
                          ? 'border-amber-900 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-900'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span className="text-lg">{occ.emoji}</span>
                      <span>{occ.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-2">
                  2. What type of clothing are you looking for?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        category === cat.id
                          ? 'border-amber-900 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-900'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Budget */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-950 mb-2">
                  3. What is your preferred budget range?
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {budgets.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        budget === b.id
                          ? 'border-amber-900 bg-amber-50 text-amber-950 font-bold ring-1 ring-amber-900'
                          : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span>{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGetAdvice}
                className="w-full py-3 px-4 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Get Expert Recommendations</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ) : (
            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-stone-800 text-xs sm:text-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    Stylist Recommendation
                  </span>
                  <button
                    onClick={resetAdvisor}
                    className="text-xs text-amber-900 underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Change Options
                  </button>
                </div>
                <p className="leading-relaxed">
                  For your selected occasion at Shivrinarayan, we highly suggest <strong>Chhattisgarh Kosa Silk</strong> or <strong>Temple Zari Art Silk</strong> in auspicious turmeric gold, crimson, or royal peacock hues.
                </p>
              </div>

              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-500">
                Top Matched In-Store Options at Jawahar Cloth:
              </h4>

              <div className="space-y-3">
                {recommended.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 rounded-2xl bg-white border border-stone-200 flex items-center justify-between gap-3 shadow-2xs hover:border-amber-400 transition-colors"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                        {prod.name}
                      </h5>
                      <p className="text-xs text-stone-500">{prod.fabric}</p>
                      <p className="text-xs font-extrabold text-amber-950 font-mono mt-0.5">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(`Namaste Jawahar Cloth, your Style Advisor recommended: "${prod.name}" for my upcoming occasion. Can you share more photos/colors?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="text-xs text-stone-600 font-medium hover:text-amber-900"
                >
                  Need tailored advice? Speak with our master draper at <strong>094241 42448</strong>
                </a>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
