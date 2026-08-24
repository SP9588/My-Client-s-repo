import React from 'react';
import { 
  Info, 
  ShoppingBag, 
  Image, 
  Star, 
  MapPin, 
  Clock 
} from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  reviewCount: number;
  lang: 'en' | 'hi';
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
  reviewCount,
  lang
}) => {
  const tabs = [
    {
      id: 'overview',
      label: lang === 'hi' ? 'अवलोकन' : 'Overview',
      icon: Info,
    },
    {
      id: 'catalog',
      label: lang === 'hi' ? 'कैटलॉग और साड़ियां' : 'Catalog & Sarees',
      icon: ShoppingBag,
    },
    {
      id: 'photos',
      label: lang === 'hi' ? 'फ़ोटो एवं वीडियो' : 'Photos',
      icon: Image,
    },
    {
      id: 'reviews',
      label: lang === 'hi' ? `समीक्षाएं (${reviewCount})` : `Reviews (${reviewCount})`,
      icon: Star,
    },
    {
      id: 'map',
      label: lang === 'hi' ? 'नक्शा और दिशा' : 'Map & Directions',
      icon: MapPin,
    },
  ];

  return (
    <div className="bg-white border-b border-stone-200 sticky top-[95px] z-30 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'border-amber-900 text-amber-950 font-bold bg-amber-50/60 rounded-t-lg'
                    : 'border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-t-lg'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-900' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
