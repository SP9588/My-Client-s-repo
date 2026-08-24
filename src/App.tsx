import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroProfile } from './components/HeroProfile';
import { NavigationTabs } from './components/NavigationTabs';
import { OverviewTab } from './components/OverviewTab';
import { CatalogTab } from './components/CatalogTab';
import { PhotosTab } from './components/PhotosTab';
import { ReviewsTab } from './components/ReviewsTab';
import { MapDirectionsTab } from './components/MapDirectionsTab';
import { VideoReelModal } from './components/VideoReelModal';
import { WhatsAppInquiryModal } from './components/WhatsAppInquiryModal';
import { StylistAIModal } from './components/StylistAIModal';
import { SavedDrawer } from './components/SavedDrawer';
import { Footer } from './components/Footer';
import { INITIAL_REVIEWS, STORE_INFO } from './data/storeData';
import { Product, StoreReview } from './types';
import { Phone, MessageCircle, Navigation, Heart } from 'lucide-react';

export default function App() {
  // Active Tab State
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  // Persistence: Saved place
  const [isSavedPlace, setIsSavedPlace] = useState<boolean>(() => {
    try {
      return localStorage.getItem('jc_saved_place') === 'true';
    } catch {
      return false;
    }
  });

  // Persistence: Saved Wishlist Items
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('jc_saved_products');
      return stored ? JSON.parse(stored) : ['prod-1', 'prod-3'];
    } catch {
      return ['prod-1', 'prod-3'];
    }
  });

  // Persistence: Reviews
  const [reviews, setReviews] = useState<StoreReview[]>(() => {
    try {
      const stored = localStorage.getItem('jc_store_reviews');
      return stored ? JSON.parse(stored) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Modals state
  const [isVideoReelOpen, setIsVideoReelOpen] = useState(false);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<Product | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('jc_saved_place', isSavedPlace.toString());
    } catch {}
  }, [isSavedPlace]);

  useEffect(() => {
    try {
      localStorage.setItem('jc_saved_products', JSON.stringify(savedProductIds));
    } catch {}
  }, [savedProductIds]);

  useEffect(() => {
    try {
      localStorage.setItem('jc_store_reviews', JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  const handleToggleSavePlace = () => {
    setIsSavedPlace(prev => !prev);
  };

  const handleToggleSaveProduct = (id: string) => {
    setSavedProductIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(pId => pId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleRemoveProductFromSaved = (id: string) => {
    setSavedProductIds(prev => prev.filter(pId => pId !== id));
  };

  const handleClearAllSaved = () => {
    setSavedProductIds([]);
  };

  const handleOpenProductInquiry = (product: Product) => {
    setSelectedProductForInquiry(product);
    setIsInquiryModalOpen(true);
  };

  const handleAddReview = (newReviewData: Omit<StoreReview, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: StoreReview = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 1,
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${STORE_INFO.name}, ${STORE_INFO.address}`
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans pb-16 md:pb-0">
      
      {/* Top Header */}
      <Header
        savedCount={savedProductIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Listing Header & Quick Actions */}
      <HeroProfile
        isSaved={isSavedPlace}
        onToggleSave={handleToggleSavePlace}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 220, behavior: 'smooth' });
        }}
        onOpenVideoReel={() => setIsVideoReelOpen(true)}
        lang={lang}
      />

      {/* Navigation Tabs (Overview, Catalog, Photos, Reviews, Map) */}
      <NavigationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reviewCount={reviews.length}
        lang={lang}
      />

      {/* Tab Content Body */}
      <main className="max-w-6xl mx-auto px-4 flex-1 w-full">
        {activeTab === 'overview' && (
          <OverviewTab
            onSelectProduct={handleOpenProductInquiry}
            onOpenVideoReel={() => setIsVideoReelOpen(true)}
            onTabChange={setActiveTab}
            lang={lang}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogTab
            savedProductIds={savedProductIds}
            onToggleSaveProduct={handleToggleSaveProduct}
            onOpenInquiryModal={handleOpenProductInquiry}
            lang={lang}
          />
        )}

        {activeTab === 'photos' && (
          <PhotosTab
            onOpenVideoReel={() => setIsVideoReelOpen(true)}
            lang={lang}
          />
        )}

        {activeTab === 'reviews' && (
          <ReviewsTab
            reviews={reviews}
            onAddReview={handleAddReview}
            lang={lang}
          />
        )}

        {activeTab === 'map' && (
          <MapDirectionsTab lang={lang} />
        )}
      </main>

      {/* Footer */}
      <Footer onTabChange={setActiveTab} lang={lang} />

      {/* Mobile Sticky Quick Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 p-2.5 px-4 flex md:hidden items-center justify-between gap-2 shadow-lg">
        <a
          href={`tel:${STORE_INFO.phone}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-900 text-white font-bold text-xs shadow-xs"
        >
          <Phone className="w-4 h-4 fill-current" />
          <span>Call</span>
        </a>

        <a
          href={googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-sky-700 text-white font-bold text-xs shadow-xs"
        >
          <Navigation className="w-4 h-4" />
          <span>Directions</span>
        </a>

        <a
          href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Namaste Jawahar Cloth, I would like to inquire about your store.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => setIsSavedDrawerOpen(true)}
          className="p-2.5 rounded-xl bg-stone-100 text-stone-700 relative"
          title="Saved Items"
        >
          <Heart className={`w-4 h-4 ${savedProductIds.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
          {savedProductIds.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {savedProductIds.length}
            </span>
          )}
        </button>
      </div>

      {/* Modals & Drawers */}
      <VideoReelModal
        isOpen={isVideoReelOpen}
        onClose={() => setIsVideoReelOpen(false)}
        lang={lang}
      />

      <WhatsAppInquiryModal
        product={selectedProductForInquiry}
        isOpen={isInquiryModalOpen}
        onClose={() => {
          setIsInquiryModalOpen(false);
          setSelectedProductForInquiry(null);
        }}
        lang={lang}
      />

      <StylistAIModal
        isOpen={isAIStylistOpen}
        onClose={() => setIsAIStylistOpen(false)}
        onSelectProduct={(p) => {
          setIsAIStylistOpen(false);
          handleOpenProductInquiry(p);
        }}
        lang={lang}
      />

      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProductIds={savedProductIds}
        onRemoveProduct={handleRemoveProductFromSaved}
        onClearAll={handleClearAllSaved}
        lang={lang}
      />

    </div>
  );
}
