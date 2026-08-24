import React from 'react';
import { X, Heart, Trash2, MessageCircle, Phone, ArrowRight, ShoppingBag } from 'lucide-react';
import { PRODUCTS_CATALOG, STORE_INFO } from '../data/storeData';
import { Product } from '../types';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProductIds: string[];
  onRemoveProduct: (id: string) => void;
  onClearAll: () => void;
  lang: 'en' | 'hi';
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedProductIds,
  onRemoveProduct,
  onClearAll,
  lang
}) => {
  if (!isOpen) return null;

  const savedProducts = PRODUCTS_CATALOG.filter((p) => savedProductIds.includes(p.id));
  const totalAmount = savedProducts.reduce((acc, p) => acc + p.price, 0);

  const getFullWishlistWhatsAppMessage = () => {
    const list = savedProducts.map(p => `• ${p.name} (₹${p.price})`).join('\n');
    return `Namaste Jawahar Cloth, I have saved the following items from your catalog and would like to check availability and bundle price:\n\n${list}\n\nTotal estimate: ₹${totalAmount}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-stone-200 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-current" />
            <h3 className="font-bold text-base">
              {lang === 'hi' ? 'सेव की गई साड़ियां एवं वस्त्र' : 'Saved Collection'} ({savedProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {savedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-800 text-sm">No items saved yet</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Tap the heart icon on any saree or fabric in the catalog to save it here.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                <span>Items saved to your local session</span>
                <button
                  onClick={onClearAll}
                  className="text-rose-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear All
                </button>
              </div>

              <div className="space-y-3">
                {savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                        {product.name}
                      </h5>
                      <p className="text-xs text-stone-500">{product.fabric}</p>
                      <p className="text-xs font-bold text-amber-950 font-mono">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onRemoveProduct(product.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-stone-200 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {savedProducts.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-stone-700">Estimated Total:</span>
              <span className="font-extrabold text-stone-950 text-base font-mono">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(getFullWishlistWhatsAppMessage())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Inquire All on WhatsApp</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
