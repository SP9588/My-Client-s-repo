import { Product, StoreReview, StoreMedia, BusinessHours, StoreInfo } from '../types';

import storefrontImg from '../assets/images/jawahar_cloth_storefront_1786965115071.jpg';
import sareesImg from '../assets/images/traditional_sarees_1786965131223.jpg';
import mensImg from '../assets/images/mens_ethnic_fabrics_1786965145028.jpg';

export const STORE_INFO: StoreInfo = {
  name: "Jawahar Cloth",
  hindiName: "जवाहर क्लॉथ",
  tagline: "Premier Destination for Sarees, Ethnic Wear & Fine Textiles",
  address: "Near Mandir, Shivrinarayan, Chhattisgarh 495557",
  landmark: "Near Historic Shivrinarayan Mandir Ghat Road",
  city: "Shivrinarayan",
  state: "Chhattisgarh",
  pincode: "495557",
  phone: "+919424142448",
  displayPhone: "094241 42448",
  whatsappNumber: "919424142448",
  rating: 4.7,
  totalReviews: 3,
  status: "Open · Closes 9 pm",
  closingTime: "9:00 PM",
  coordinates: {
    lat: 21.7275,
    lng: 82.5936,
  },
};

export const BUSINESS_HOURS: BusinessHours[] = [
  { day: "Monday", hindiDay: "सोमवार", open: "09:30 AM", close: "09:00 PM" },
  { day: "Tuesday", hindiDay: "मंगलवार", open: "09:30 AM", close: "09:00 PM" },
  { day: "Wednesday", hindiDay: "बुधवार", open: "09:30 AM", close: "09:00 PM" },
  { day: "Thursday", hindiDay: "गुरुवार", open: "09:30 AM", close: "09:00 PM" },
  { day: "Friday", hindiDay: "शुक्रवार", open: "09:30 AM", close: "09:00 PM" },
  { day: "Saturday", hindiDay: "शनिवार", open: "09:30 AM", close: "09:00 PM" },
  { day: "Sunday", hindiDay: "रविवार", open: "09:30 AM", close: "09:00 PM" },
];

export const INITIAL_REVIEWS: StoreReview[] = [
  {
    id: "rev-1",
    authorName: "Rajesh Kumar Sahu",
    authorLocation: "Shivrinarayan, CG",
    rating: 5,
    date: "2 weeks ago",
    comment: "Best cloth store near Shivrinarayan Mandir! We bought wedding sarees and suiting for my brother's marriage. The collection of authentic Kosa silk and festive sarees is truly unmatched in the area. Very honest pricing and polite staff.",
    helpfulCount: 8,
    verifiedCustomer: true,
    tags: ["Authentic Kosa Silk", "Wedding Collection", "Polite Staff"],
    reply: {
      date: "1 week ago",
      text: "Dhanyawad Rajesh ji! We are delighted to serve your family on such a special occasion. Looking forward to welcoming you again!"
    }
  },
  {
    id: "rev-2",
    authorName: "Pooja Sharma",
    authorLocation: "Bilaspur",
    rating: 5,
    date: "1 month ago",
    comment: "Visited during Magh Mela mandir darshan. Found beautiful traditional Chanderi and Banarasi sarees at very reasonable prices compared to city showrooms. Jawahar Cloth is a must-visit whenever you come to Shivrinarayan!",
    helpfulCount: 5,
    verifiedCustomer: true,
    tags: ["Temple Visit", "Fair Pricing", "Saree Collection"]
  },
  {
    id: "rev-3",
    authorName: "Anand Verma",
    authorLocation: "Janjgir-Champa",
    rating: 4,
    date: "2 months ago",
    comment: "Great quality fabrics for men's ethnic kurtas, dhotis, and safari suits. Good parking space near the mandir square. Quick service on WhatsApp inquiries too.",
    helpfulCount: 3,
    verifiedCustomer: true,
    tags: ["Men's Fabrics", "Fast Service", "Near Mandir"]
  }
];

export const STORE_MEDIA: StoreMedia[] = [
  {
    id: "media-video-1",
    title: "Festive & Wedding Collection Walkthrough",
    category: "video",
    url: storefrontImg,
    caption: "Latest Festival & Saree Arrivals at Jawahar Cloth (0:30)",
    isVideo: true,
    duration: "0:30"
  },
  {
    id: "media-1",
    title: "Storefront & Main Entrance",
    category: "storefront",
    url: storefrontImg,
    caption: "Jawahar Cloth storefront near historic Shivrinarayan Mandir"
  },
  {
    id: "media-2",
    title: "Premium Traditional Sarees",
    category: "sarees",
    url: sareesImg,
    caption: "Exclusive Kosa silk, Banarasi zari, and Chanderi festive sarees"
  },
  {
    id: "media-3",
    title: "Men's Suiting & Ethnic Fabrics",
    category: "mens",
    url: mensImg,
    caption: "Fine linen, Raymond & Siyaram fabrics, kurta pyjama materials"
  },
  {
    id: "media-4",
    title: "Bridal & Wedding Trousseau",
    category: "lehengas",
    url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    caption: "Intricately embroidered bridal lehengas and festive dupattas"
  },
  {
    id: "media-5",
    title: "Temple Puja & Darshan Specials",
    category: "sarees",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    caption: "Pavitra yellow, saffron, and red puja silk sarees for temple rituals"
  },
  {
    id: "media-6",
    title: "Designer Kurtis & Daily Suits",
    category: "sarees",
    url: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80",
    caption: "Comfortable cotton, rayon, and georgette unstitched suit sets"
  }
];

export const PRODUCTS_CATALOG: Product[] = [
  {
    id: "prod-1",
    name: "Pure Chhattisgarh Kosa Silk Saree",
    hindiName: "शुद्ध छत्तीसगढ़ कोसा सिल्क साड़ी",
    category: "sarees",
    price: 3850,
    originalPrice: 4800,
    fabric: "100% Handspun Kosa Silk",
    occasion: "Festivals, Weddings & Temple Darshan",
    image: sareesImg,
    colors: ["#D4AF37", "#800020", "#1B4D3E"],
    inStock: true,
    featured: true,
    description: "Authentic indigenous Kosa silk saree with traditional tribal motifs and hand-woven golden zari pallu. Sourced with finest quality weave from Chhattisgarh."
  },
  {
    id: "prod-2",
    name: "Royal Banarasi Brocade Bridal Saree",
    hindiName: "शाही बनारसी ब्रोकेड दुल्हन साड़ी",
    category: "sarees",
    price: 4999,
    originalPrice: 6500,
    fabric: "Pure Banarasi Silk with Zari",
    occasion: "Bridal, Reception & Special Pujas",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    colors: ["#990000", "#FFD700", "#FF4500"],
    inStock: true,
    featured: true,
    description: "Opulent crimson red Banarasi saree adorned with dense floral jaal work and a majestic pallu. Perfect for brides and special family milestones."
  },
  {
    id: "prod-3",
    name: "Men's Festive Kurta Pyjama & Jacket Fabric Set",
    hindiName: "मेंस फेस्टिव कुर्ता पायजामा व जैकेट सेट",
    category: "mens",
    price: 2450,
    originalPrice: 3200,
    fabric: "Raw Silk & Cotton Blend",
    occasion: "Wedding Celebrations & Mandir Puja",
    image: mensImg,
    colors: ["#F5F5DC", "#B8860B", "#191970"],
    inStock: true,
    featured: true,
    description: "Luxurious unstitched fabric set for tailored men's kurta, churidar pyjama, and contrasting embroidered Nehru jacket."
  },
  {
    id: "prod-4",
    name: "Velvet Embroidered Wedding Lehenga",
    hindiName: "मखमली एम्ब्रॉयडर्ड वेडिंग लहंगा",
    category: "lehengas",
    price: 7999,
    originalPrice: 11500,
    fabric: "Heavy Micro Velvet with Zari & Sequence",
    occasion: "Bridal & Sangeet Ceremonies",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    colors: ["#700B2B", "#C0392B", "#4A0E17"],
    inStock: true,
    featured: true,
    description: "Stunning semi-stitched velvet lehenga choli featuring dori, zari and stone embroidery with a heavy Net dupatta."
  },
  {
    id: "prod-5",
    name: "Temple Darshan Yellow & Saffron Puja Silk Saree",
    hindiName: "मंदिर दर्शन पीली एवं केसरिया पूजा साड़ी",
    category: "puja-special",
    price: 1850,
    originalPrice: 2400,
    fabric: "Soft Art Silk with Temple Border",
    occasion: "Shivrinarayan Mandir Darshan & Havans",
    image: "https://images.unsplash.com/photo-1583391733975-021c43bc8348?auto=format&fit=crop&w=800&q=80",
    colors: ["#FFC000", "#FF6F00", "#CC3333"],
    inStock: true,
    featured: true,
    description: "Auspicious yellow and saffron saree featuring traditional temple spike borders. Ideal for offering and wearing during Shivrinarayan temple darshan."
  },
  {
    id: "prod-6",
    name: "Premium Men's Suiting & Shirting Length (Raymond/Siyaram)",
    hindiName: "प्रीमियम मेंस शूटिंग एवं शर्टिंग फैब्रिक",
    category: "fabrics",
    price: 1950,
    originalPrice: 2600,
    fabric: "Poly-Wool & Egyptian Cotton",
    occasion: "Formal, Office, Safari & Festive Suits",
    image: mensImg,
    colors: ["#2C3E50", "#7F8C8D", "#34495E"],
    inStock: true,
    description: "Top grade branded suiting (1.20m) and shirting (1.60m) combo pack in a presentation gift box. Perfect for gifting and personal tailoring."
  },
  {
    id: "prod-7",
    name: "Chanderi Cotton Silk Floral Printed Saree",
    hindiName: "चंदेरी कॉटन सिल्क फ्लोरल प्रिंट साड़ी",
    category: "sarees",
    price: 1450,
    originalPrice: 1950,
    fabric: "Lightweight Chanderi Silk",
    occasion: "Daily Office, Kitty Parties, Light Events",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    colors: ["#E6B8B8", "#B5D5C5", "#F7D070"],
    inStock: true,
    description: "Breathable and airy Chanderi saree with gentle golden zari patti and delicate floral block prints."
  },
  {
    id: "prod-8",
    name: "Jaipuri Hand-block Printed Kurti Material Set",
    hindiName: "जयपुरी हैंड ब्लॉक प्रिंटेड सूट मटेरियल",
    category: "kurtis",
    price: 1199,
    originalPrice: 1600,
    fabric: "100% Pure Cambric Cotton",
    occasion: "Casual Summer Wear & Daily Use",
    image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80",
    colors: ["#4682B4", "#2E8B57", "#CD853F"],
    inStock: true,
    description: "Complete 3-piece unstitched suit with top fabric (2.5m), bottom fabric (2.5m), and soft mulmul cotton dupatta (2.25m)."
  }
];

export const HIGHLIGHTS = [
  {
    title: "Authentic Kosa & Silk Weaves",
    hindiTitle: "शुद्ध कोसा और सिल्क साड़ियां",
    description: "Direct collections from Chhattisgarh's skilled master weavers with guaranteed fabric purity.",
    icon: "Sparkles"
  },
  {
    title: "Located Right Near Mandir",
    hindiTitle: "मंदिर के ठीक पास स्थित",
    description: "Conveniently situated near Shivrinarayan temple with easy vehicle access and parking.",
    icon: "MapPin"
  },
  {
    title: "Direct WhatsApp Inquiries & Video Shopping",
    hindiTitle: "व्हाट्सएप वीडियो शॉपिंग सुविधा",
    description: "See live sarees and suit pieces over WhatsApp video call from the comfort of your home.",
    icon: "MessageSquare"
  },
  {
    title: "Wholesale & Retail Best Rates",
    hindiTitle: "उचित मूल्य और भारी वैरायटी",
    description: "Transparent honest pricing on bulk wedding orders and individual retail shopping.",
    icon: "Tag"
  }
];
