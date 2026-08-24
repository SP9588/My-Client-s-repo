import React, { useState } from 'react';
import { 
  Play, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  MessageCircle,
  Video,
  Sparkles
} from 'lucide-react';
import { STORE_MEDIA, STORE_INFO } from '../data/storeData';
import { StoreMedia } from '../types';

interface PhotosTabProps {
  onOpenVideoReel: () => void;
  lang: 'en' | 'hi';
}

export const PhotosTab: React.FC<PhotosTabProps> = ({ onOpenVideoReel, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<StoreMedia | null>(null);

  const categories = [
    { id: 'all', label: lang === 'hi' ? 'सभी फ़ोटो' : 'All Photos & Media' },
    { id: 'storefront', label: lang === 'hi' ? 'दुकान का दृश्य' : 'Storefront' },
    { id: 'sarees', label: lang === 'hi' ? 'साड़ियां एवं सिल्क' : 'Sarees & Silks' },
    { id: 'mens', label: lang === 'hi' ? 'मेंस कलेक्शन' : "Men's Wear" },
    { id: 'video', label: lang === 'hi' ? 'वीडियो (0:30)' : 'Videos (0:30)' },
  ];

  const filteredMedia = STORE_MEDIA.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeMedia) return;
    const currentIndex = filteredMedia.findIndex(m => m.id === activeMedia.id);
    const nextIndex = (currentIndex + 1) % filteredMedia.length;
    setActiveMedia(filteredMedia[nextIndex]);
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeMedia) return;
    const currentIndex = filteredMedia.findIndex(m => m.id === activeMedia.id);
    const prevIndex = (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setActiveMedia(filteredMedia[prevIndex]);
  };

  return (
    <div className="py-6 space-y-6">
      
      {/* Top Filter Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-3">
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
        <span className="text-xs text-stone-500 font-medium">
          Showing {filteredMedia.length} media items
        </span>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMedia.map((media) => (
          <div
            key={media.id}
            onClick={() => {
              if (media.isVideo) {
                onOpenVideoReel();
              } else {
                setActiveMedia(media);
              }
            }}
            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-stone-100 border border-stone-200 shadow-2xs hover:shadow-md transition-all"
          >
            <img
              src={media.url}
              alt={media.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />

            {/* Video Badge Overlay */}
            {media.isVideo ? (
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex flex-col items-center justify-center text-white">
                <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <span className="mt-2 text-xs font-bold bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs">
                  0:30 Video Preview
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                <h4 className="font-bold text-sm leading-snug">{media.title}</h4>
                <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">{media.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveMedia(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 bg-stone-900/80 flex items-center justify-between border-b border-stone-800 text-white">
              <div>
                <h3 className="font-bold text-sm sm:text-base">{activeMedia.title}</h3>
                <p className="text-xs text-stone-400">{activeMedia.caption}</p>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Stage */}
            <div className="relative max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={activeMedia.url}
                alt={activeMedia.title}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next Nav */}
              <button
                onClick={handlePrevMedia}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-all shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextMedia}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition-all shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-900 flex items-center justify-between text-xs text-stone-400 border-t border-stone-800">
              <span>Jawahar Cloth · Near Mandir, Shivrinarayan</span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(`Namaste, I am inquiring about this item from your photos: ${activeMedia.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
