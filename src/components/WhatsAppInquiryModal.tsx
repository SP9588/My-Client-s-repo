import React, { useState } from 'react';
import { X, MessageCircle, Phone, Check, Sparkles, Send } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/storeData';

interface WhatsAppInquiryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const WhatsAppInquiryModal: React.FC<WhatsAppInquiryModalProps> = ({
  product,
  isOpen,
  onClose,
  lang
}) => {
  const [inquiryType, setInquiryType] = useState<string>('availability');
  const [customNote, setCustomNote] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');

  if (!isOpen) return null;

  const getPresetMessage = () => {
    let base = `Namaste Jawahar Cloth,`;
    if (customerName.trim()) {
      base = `Namaste Jawahar Cloth, my name is ${customerName.trim()}.`;
    }

    let prodText = product 
      ? ` regarding "${product.name}" (Price: ₹${product.price})` 
      : ' regarding your saree & fabric collections';

    let intent = '';
    if (inquiryType === 'availability') {
      intent = `Is this item currently available in stock? Please share available color options.`;
    } else if (inquiryType === 'video_call') {
      intent = `Can we schedule a short WhatsApp video call to see this fabric/saree live?`;
    } else if (inquiryType === 'bulk_wedding') {
      intent = `I am looking for wedding/festive bulk shopping. What best discounts or combos are available?`;
    } else if (inquiryType === 'visit') {
      intent = `I am planning to visit your store near Shivrinarayan Mandir today. Please confirm store timings.`;
    }

    if (customNote.trim()) {
      intent += ` Note: ${customNote.trim()}`;
    }

    return `${base} I am inquiring${prodText}. ${intent}`;
  };

  const generatedUrl = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(getPresetMessage())}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-emerald-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-base font-display">
                {lang === 'hi' ? 'व्हाट्सएप पूछताछ भेजें' : 'Send WhatsApp Inquiry'}
              </h3>
              <p className="text-xs text-emerald-100">
                Direct to 094241 42448 · Jawahar Cloth
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Selected Product Preview */}
          {product && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                  {product.name}
                </h4>
                <p className="text-xs text-stone-500">{product.fabric}</p>
                <p className="text-xs font-bold text-amber-950 font-mono">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          )}

          {/* Your Name */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Anjali Verma"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
            />
          </div>

          {/* Inquiry Reason Options */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-2">
              Select What You Need:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'availability', label: 'Check Stock & Colors', sub: 'Ask if colors are in store' },
                { id: 'video_call', label: 'WhatsApp Video Demo', sub: 'See fabric live on video' },
                { id: 'bulk_wedding', label: 'Wedding / Bulk Order', sub: 'Special discounted rates' },
                { id: 'visit', label: 'Store Visit & Mandir', sub: 'Timings and exact location' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setInquiryType(opt.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    inquiryType === opt.id
                      ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-600'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <p className="font-bold">{opt.label}</p>
                  <p className="text-[11px] text-stone-500">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Additional note */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Additional Note or Requirements
            </label>
            <textarea
              rows={2}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Looking for yellow/saffron color for Mandir puja on Sunday"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
            />
          </div>

          {/* Message Preview */}
          <div className="bg-stone-100 p-3 rounded-xl border border-stone-200">
            <p className="text-[11px] font-bold text-stone-500 mb-1 uppercase tracking-wider">
              WhatsApp Message Preview:
            </p>
            <p className="text-xs text-stone-800 font-mono leading-relaxed bg-white p-2.5 rounded-lg border border-stone-200/80">
              "{getPresetMessage()}"
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-xl"
          >
            Cancel
          </button>
          
          <a
            href={generatedUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Open in WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
