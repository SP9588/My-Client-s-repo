export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: 'sarees' | 'lehengas' | 'mens' | 'kurtis' | 'fabrics' | 'puja-special';
  price: number;
  originalPrice?: number;
  fabric: string;
  occasion: string;
  image: string;
  colors: string[];
  inStock: boolean;
  featured?: boolean;
  description: string;
}

export interface StoreReview {
  id: string;
  authorName: string;
  authorLocation: string;
  rating: number;
  date: string;
  comment: string;
  helpfulCount: number;
  verifiedCustomer?: boolean;
  tags?: string[];
  reply?: {
    date: string;
    text: string;
  };
}

export interface StoreMedia {
  id: string;
  title: string;
  category: 'storefront' | 'sarees' | 'mens' | 'lehengas' | 'video';
  url: string;
  caption: string;
  isVideo?: boolean;
  duration?: string;
}

export interface BusinessHours {
  day: string;
  hindiDay: string;
  open: string;
  close: string;
  isToday?: boolean;
  statusText?: string;
}

export interface StoreInfo {
  name: string;
  hindiName: string;
  tagline: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  rating: number;
  totalReviews: number;
  status: string;
  closingTime: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
