import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  Phone, 
  Sparkles, 
  Clock, 
  MapPin 
} from 'lucide-react';
import { STORE_INFO, STORE_MEDIA } from '../data/storeData';

interface VideoReelModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const VideoReelModal: React.FC<VideoReelModalProps> = ({ isOpen, onClose, lang }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 30) {
            return 0; // loop 30-sec reel
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentSec = Math.floor(progress);
  const formattedTime = `0:${currentSec < 10 ? '0' : ''}${currentSec}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-sm sm:max-w-md w-full bg-stone-950 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col">
        
        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-xs font-bold font-mono">0:30 Reel</span>
            <span className="text-stone-400 text-xs font-mono">{formattedTime} / 0:30</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative h-[480px] bg-stone-900 overflow-hidden flex items-center justify-center">
          <img
            src={STORE_MEDIA[0].url}
            alt="Jawahar Cloth Store Walkthrough"
            className="w-full h-full object-cover filter brightness-90 transform scale-105 animate-pulse"
            style={{ animationDuration: '6s' }}
            referrerPolicy="no-referrer"
          />

          {/* Central Overlay Details */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 flex flex-col justify-between p-6">
            <div></div>

            {/* Middle Play Button toggle */}
            <div className="self-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-transform hover:scale-105"
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-current ml-1" />}
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="space-y-3">
              <div className="bg-amber-950/80 border border-amber-500/30 p-3 rounded-2xl backdrop-blur-md text-white">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Jawahar Cloth Festival Highlights</span>
                </div>
                <h4 className="font-bold text-base font-display">
                  {lang === 'hi'
                    ? 'त्योहार और शादी के नए आगमन'
                    : 'Exclusive Saree & Menswear Collection'}
                </h4>
                <p className="text-xs text-stone-300 mt-1">
                  Near Mandir, Shivrinarayan, Chhattisgarh · 094241 42448
                </p>
              </div>

              {/* Action Buttons in Reel */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Namaste Jawahar Cloth, I watched your 0:30 video reel and want to inquire about latest saree designs.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Inquiry</span>
                </a>

                <a
                  href={`tel:${STORE_INFO.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 30-Second Progress Bar */}
        <div className="w-full bg-stone-800 h-1.5">
          <div 
            className="bg-amber-500 h-full transition-all duration-300 ease-linear"
            style={{ width: `${(progress / 30) * 100}%` }}
          ></div>
        </div>

      </div>
    </div>
  );
};
