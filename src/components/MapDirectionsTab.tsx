import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  ExternalLink, 
  Copy, 
  Check, 
  Compass, 
  Car, 
  Footprints,
  Landmark,
  Share2
} from 'lucide-react';
import { STORE_INFO } from '../data/storeData';
import L from 'leaflet';

interface MapDirectionsTabProps {
  lang: 'en' | 'hi';
}

export const MapDirectionsTab: React.FC<MapDirectionsTabProps> = ({ lang }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [copied, setCopied] = useState(false);

  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${STORE_INFO.name}, ${STORE_INFO.address}`
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(STORE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // already initialized

    // Coordinates for Jawahar cloth near Shivrinarayan mandir
    const lat = STORE_INFO.coordinates.lat;
    const lng = STORE_INFO.coordinates.lng;

    const map = L.map(mapContainerRef.current, {
      center: [lat, lng],
      zoom: 16,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Custom Icon for Jawahar Cloth
    const storeIcon = L.divIcon({
      className: 'custom-store-pin',
      html: `
        <div style="background-color: #78350f; color: white; border-radius: 12px; padding: 6px 10px; font-weight: bold; font-size: 11px; display: flex; align-items: center; gap: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white; white-space: nowrap; transform: translate(-50%, -100%);">
          <span>🛍️</span>
          <span>Jawahar Cloth</span>
        </div>
      `,
      iconSize: [0, 0],
    });

    const marker = L.marker([lat, lng], { icon: storeIcon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; padding: 4px;">
        <strong style="color: #78350f; font-size: 14px;">Jawahar Cloth (जवाहर क्लॉथ)</strong><br/>
        <span style="color: #4b5563;">Near Mandir, Shivrinarayan, Chhattisgarh 495557</span><br/>
        <div style="margin-top: 6px; font-weight: bold; color: #047857;">Open · Closes 9:00 PM</div>
        <div style="margin-top: 4px;">📞 094241 42448</div>
      </div>
    `).openPopup();

    // Nearby Landmark Icon (Shivrinarayan Mandir)
    const mandirIcon = L.divIcon({
      className: 'custom-mandir-pin',
      html: `
        <div style="background-color: #d97706; color: white; border-radius: 10px; padding: 4px 8px; font-weight: bold; font-size: 10px; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); border: 1px solid white; white-space: nowrap; transform: translate(-50%, -100%);">
          <span>🛕</span>
          <span>Shivrinarayan Mandir</span>
        </div>
      `,
      iconSize: [0, 0],
    });

    L.marker([lat + 0.0012, lng - 0.0015], { icon: mandirIcon })
      .addTo(map)
      .bindPopup('<b>Historic Shivrinarayan Temple</b><br/>Laxmi Narayan Temple Ghat area');

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="py-6 space-y-6">
      
      {/* Map of Jawahar Cloth Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-xs mb-1">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'स्थान एवं नेविगेशन' : 'Map & Location Guide'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
            Map of Jawahar cloth
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{STORE_INFO.address}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Address Copied' : 'Copy Address'}</span>
          </button>

          <a
            id="open-google-maps-btn"
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>{lang === 'hi' ? 'गूगल मैप्स में खोलें' : 'Open in Google Maps'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky-200" />
          </a>
        </div>
      </div>

      {/* Interactive Map Container */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-300 shadow-md bg-stone-100">
        <div ref={mapContainerRef} className="w-full h-[400px] sm:h-[460px] z-10" />

        {/* Floating Quick Card */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 shadow-lg max-w-xs hidden sm:block">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-900 text-white flex items-center justify-center font-bold text-xs">
              JC
            </div>
            <div>
              <h4 className="font-bold text-xs text-stone-900">Jawahar Cloth</h4>
              <p className="text-[10px] text-emerald-700 font-semibold">Open · Closes 9:00 PM</p>
            </div>
          </div>
          <p className="text-[11px] text-stone-600 mt-2 border-t border-stone-100 pt-2">
            📍 Near Mandir, Shivrinarayan, CG 495557
          </p>
          <a
            href={`tel:${STORE_INFO.phone}`}
            className="mt-2 text-[11px] font-bold text-amber-900 hover:underline flex items-center gap-1"
          >
            <Phone className="w-3 h-3" />
            Call: {STORE_INFO.displayPhone}
          </a>
        </div>
      </div>

      {/* Route & Directions Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
            <Landmark className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">
            {lang === 'hi' ? 'मंदिर से पैदल रास्ता' : 'From Shivrinarayan Mandir'}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Only 1 to 2 minutes walk (approx 150 meters) from the main gate of the Laxmi Narayan temple toward the main bazar road.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-900 flex items-center justify-center">
            <Car className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">
            {lang === 'hi' ? 'बस स्टैंड एवं वाहन से' : 'From Bus Stand / Bilaspur Road'}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Take the main Mandir road directly from the Shivrinarayan bus stand. Dedicated two-wheeler and car parking is available nearby.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-stone-900">
            {lang === 'hi' ? 'रास्ता न मिलने पर कॉल करें' : 'Need Help with Directions?'}
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            If you are nearby and need guidance, call us anytime at <strong>094241 42448</strong> and our team will guide you.
          </p>
          <a
            href={`tel:${STORE_INFO.phone}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline pt-1"
          >
            <span>Call 094241 42448</span>
          </a>
        </div>

      </div>

    </div>
  );
};
