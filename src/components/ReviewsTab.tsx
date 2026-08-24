import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  ShieldCheck, 
  Plus, 
  Check, 
  UserCheck,
  CornerDownRight,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StoreReview } from '../types';
import { STORE_INFO } from '../data/storeData';

interface ReviewsTabProps {
  reviews: StoreReview[];
  onAddReview: (review: Omit<StoreReview, 'id' | 'date' | 'helpfulCount'>) => void;
  lang: 'en' | 'hi';
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({
  reviews,
  onAddReview,
  lang
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newTags, setNewTags] = useState<string[]>([]);
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({});

  const availableTags = [
    'Authentic Kosa Silk',
    'Near Mandir',
    'Wedding Collection',
    'Fair Pricing',
    'Men’s Wear',
    'Polite Behavior',
    'Fast WhatsApp Service'
  ];

  const handleToggleTag = (tag: string) => {
    if (newTags.includes(tag)) {
      setNewTags(newTags.filter(t => t !== tag));
    } else {
      setNewTags([...newTags, tag]);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    onAddReview({
      authorName: newName.trim(),
      authorLocation: newLocation.trim() || 'Shivrinarayan',
      rating: newRating,
      comment: newComment.trim(),
      verifiedCustomer: true,
      tags: newTags.length > 0 ? newTags : ['Local Customer']
    });

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    setNewName('');
    setNewLocation('');
    setNewComment('');
    setNewRating(5);
    setNewTags([]);
    setShowModal(false);
  };

  const handleToggleHelpful = (id: string) => {
    setHelpfulMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '4.7';

  return (
    <div className="py-6 space-y-6">
      
      {/* Reviews Summary Card */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Big Score */}
          <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-stone-200 pb-4 md:pb-0 md:pr-6">
            <span className="text-5xl font-extrabold text-stone-900 font-display">
              {avgRating}
            </span>
            <div className="flex items-center justify-center md:justify-start text-amber-500 my-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <p className="text-xs text-stone-500 font-medium">
              Based on {reviews.length} customer reviews on Google & Local visits
            </p>
          </div>

          {/* Breakdown bars */}
          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <span className="w-12 font-medium">5 stars</span>
              <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
              <span className="w-6 text-right font-mono">80%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 font-medium">4 stars</span>
              <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '20%' }}></div>
              </div>
              <span className="w-6 text-right font-mono">20%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 font-medium">3 stars</span>
              <div className="flex-1 bg-stone-100 rounded-full h-2 overflow-hidden">
                <div className="bg-stone-300 h-full rounded-full" style={{ width: '0%' }}></div>
              </div>
              <span className="w-6 text-right font-mono">0%</span>
            </div>
          </div>

          {/* Write a review CTA */}
          <div className="text-center md:text-right">
            <button
              id="open-write-review-btn"
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-950 hover:bg-black text-white font-bold text-xs shadow-sm hover:shadow transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'hi' ? 'अपनी समीक्षा लिखें' : 'Write a Review'}</span>
            </button>
            <p className="text-[11px] text-stone-400 mt-2">
              Share your shopping experience at Jawahar Cloth
            </p>
          </div>

        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => {
          const isHelpful = !!helpfulMap[rev.id];
          const count = rev.helpfulCount + (isHelpful ? 1 : 0);

          return (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-3"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-amber-900 text-sm">
                    {rev.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-stone-900">{rev.authorName}</h4>
                      {rev.verifiedCustomer && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded font-semibold">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400">{rev.authorLocation} · {rev.date}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= rev.rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                "{rev.comment}"
              </p>

              {/* Tags */}
              {rev.tags && rev.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {rev.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-stone-100 text-stone-700 text-[10px] font-medium px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Owner Response if present */}
              {rev.reply && (
                <div className="ml-4 pl-3 border-l-2 border-amber-800 bg-amber-50/50 p-3 rounded-r-lg text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950">
                    <CornerDownRight className="w-3.5 h-3.5 text-amber-800" />
                    <span>Response from Jawahar Cloth (Owner)</span>
                    <span className="text-stone-400 font-normal">· {rev.reply.date}</span>
                  </div>
                  <p className="text-stone-700">{rev.reply.text}</p>
                </div>
              )}

              {/* Action */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <button
                  onClick={() => handleToggleHelpful(rev.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
                    isHelpful ? 'bg-amber-100 text-amber-950 font-bold' : 'hover:bg-stone-100 text-stone-600'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${isHelpful ? 'fill-amber-800 text-amber-800' : ''}`} />
                  <span>Helpful ({count})</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            <h3 className="font-bold text-lg font-display text-stone-900 mb-1">
              {lang === 'hi' ? 'जवाहर क्लॉथ के लिए अपनी समीक्षा लिखें' : 'Write a Review for Jawahar Cloth'}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Help pilgrims and visitors in Shivrinarayan with your valuable feedback.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              {/* Rating selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= newRating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-amber-950">
                    {newRating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-900/20 focus:border-amber-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Shivrinarayan, Bilaspur"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-900/20 focus:border-amber-900"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  What did you like the most?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => {
                    const isSelected = newTags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => handleToggleTag(tag)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-amber-900 text-white'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Detailed Review *
                </label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share details of saree quality, pricing, staff service, location near mandir..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-900/20 focus:border-amber-900"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-xs font-bold shadow-xs"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
