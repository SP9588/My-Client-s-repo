import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Heart, 
  Sparkles, 
  SlidersHorizontal,
  Check,
  Phone,
  Tag
} from 'lucide-react';
import { PRODUCTS_CATALOG, STORE_INFO } from '../data/storeData';
import { Product } from '../types';

interface CatalogTabProps {
  savedProductIds: string[];
  onToggleSaveProduct: (id: string) => void;
  onOpenInquiryModal: (product: Product) => void;
  lang: 'en' | 'hi';
}

export const CatalogTab: React.FC<CatalogTabProps> = ({
  savedProductIds,
  onToggleSaveProduct,
  onOpenInquiryModal,
  lang
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');

  const categories = [
    { id: 'all', label: lang === 'hi' ? 'सभी वस्त्र' : 'All Collections' },
    { id: 'sarees', label: lang === 'hi' ? 'कोसा व सिल्क साड़ियां' : 'Kosa & Silk Sarees' },
    { id: 'mens', label: lang === 'hi' ? 'मेंस एथनिक व कुर्ते' : "Men's Ethnic Wear" },
    { id: 'lehengas', label: lang === 'hi' ? 'लहंगा व ब्राइडल' : 'Lehengas & Bridal' },
    { id: 'puja-special', label: lang === 'hi' ? 'मंदिर पूजा स्पेशल' : 'Puja & Mandir Special' },
    { id: 'fabrics', label: lang === 'hi' ? 'सूटिंग एवं शर्टिंग थान' : 'Suiting & Fabrics' },
    { id: 'kurtis', label: lang === 'hi' ? 'सूट व कुर्ती मटेरियल' : 'Suits & Kurtis' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Fabric filter
      if (selectedFabric !== 'all' && !item.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q) || (item.hindiName && item.hindiName.includes(q));
        const matchesFabric = item.fabric.toLowerCase().includes(q);
        const matchesOccasion = item.occasion.toLowerCase().includes(q);
        if (!matchesName && !matchesFabric && !matchesOccasion) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedFabric, searchQuery, sortBy]);

  return (
    <div className="py-6 space-y-6">
      
      {/* Header Info & WhatsApp Shopping Notice */}
      <div className="bg-amber-900 text-amber-50 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
            {lang === 'hi' ? 'डिजिटल कैटलॉग' : 'Digital Boutique Catalog'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
            {lang === 'hi' ? 'जवाहर क्लॉथ संग्रह' : 'Jawahar Cloth Collections'}
          </h2>
          <p className="text-xs sm:text-sm text-amber-200 mt-1 max-w-xl">
            {lang === 'hi'
              ? 'किसी भी साड़ी या फैब्रिक पर क्लिक करके सीधे व्हाट्सएप (094241 42448) पर फोटो एवं उपलब्धता जानें।'
              : 'Browse our signature in-store collection. Click WhatsApp on any item to check real-time stock & color options.'}
          </p>
        </div>

        <a
          href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Namaste Jawahar Cloth, I would like to see more designs from your saree and fabric catalog.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors shrink-0 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>{lang === 'hi' ? 'व्हाट्सएप पर कैटलॉग मांगें' : 'Request Full Catalog on WhatsApp'}</span>
        </a>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        
        {/* Search input & Sort selector */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'hi' ? 'साड़ी, कोसा सिल्क, कुर्ता खोजें...' : 'Search sarees, Kosa silk, suiting...'}
              className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-900/30 focus:border-amber-900 transition-all shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label className="text-xs text-stone-500 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-amber-900/30"
            >
              <option value="featured">Featured / लोकप्रिय</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-950 text-amber-100 shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8">
          <Tag className="w-8 h-8 text-stone-300 mx-auto mb-2" />
          <h3 className="font-bold text-stone-800 text-sm">No items found matching your filters</h3>
          <p className="text-xs text-stone-500 mt-1">Try changing your search terms or view all categories.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-3 text-xs font-bold text-amber-900 underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const isSaved = savedProductIds.includes(product.id);
            const discount = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
              : null;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-56 bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    {discount && (
                      <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-2xs">
                        {discount}% OFF
                      </span>
                    )}
                    <span className="bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded">
                      {product.fabric}
                    </span>
                  </div>

                  {/* Save to Wishlist Button */}
                  <button
                    onClick={() => onToggleSaveProduct(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-rose-600 shadow-sm transition-colors active:scale-90"
                    title="Save item"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
                  </button>

                  {/* Occasion pill */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="bg-amber-950/85 backdrop-blur-xs text-amber-200 text-[10px] font-medium px-2 py-0.5 rounded block truncate">
                      {product.occasion}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 line-clamp-1 group-hover:text-amber-900 transition-colors">
                      {lang === 'hi' && product.hindiName ? product.hindiName : product.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-stone-950 font-mono">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-stone-400 line-through font-mono">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold block">
                        ● Available in Store
                      </span>
                    </div>
                  </div>

                  {/* Direct WhatsApp CTA */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenInquiryModal(product)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
                    >
                      <span>Details</span>
                    </button>

                    <a
                      href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(`Namaste Jawahar Cloth, I am interested in purchasing/inquiring about: ${product.name} (₹${product.price}). Please share more details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Contact Help */}
      <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-900 text-amber-200 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-stone-900">
              {lang === 'hi' ? 'विशेष शादी या बल्क ऑर्डर चाहिए?' : 'Looking for Custom Bulk or Wedding Trousseau?'}
            </h4>
            <p className="text-xs text-stone-600">
              {lang === 'hi'
                ? 'हमारे ओनर से सीधे फोन पर बात करें: 094241 42448'
                : 'Speak directly with Jawahar Cloth at 094241 42448 for wholesale rates & wedding matchings.'}
            </p>
          </div>
        </div>
        <a
          href={`tel:${STORE_INFO.phone}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950 hover:bg-black text-white text-xs font-bold transition-colors shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call 094241 42448</span>
        </a>
      </div>

    </div>
  );
};
