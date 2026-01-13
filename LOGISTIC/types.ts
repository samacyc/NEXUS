export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ShippingOption {
  serviceLevel: string;
  price: number;
  currency: string;
  estimatedDays: number;
  carbonFootprint: string;
  aiAnalysis: string;
}

export interface QuoteRequest {
  originZip: string;
  destZip: string;
  weight: number;
  dimensions: string; // e.g., "10x10x10"
  packageType: string;
}

export interface QuoteResponse {
  origin: string;
  destination: string;
  originCoordinates: Coordinates;
  destinationCoordinates: Coordinates;
  distanceMiles: number;
  options: ShippingOption[];
  routeOptimizationNotes: string;
}

// Backend API Types
export interface TrackingHistoryItem {
  status: string;
  location: string;
  timestamp: string;
  notes?: string;
}

export interface ParcelSender {
  name?: string;
  address?: string;
  phone?: string;
}

export interface ParcelReceiver {
  name: string;
  address: string;
  phone: string;
}

export interface ParcelDimensions {
  length?: number;
  width?: number;
  height?: number;
}

export type ParcelStatus = 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed';

export interface Parcel {
  _id?: string;
  trackingNumber: string;
  sender?: ParcelSender;
  receiver: ParcelReceiver;
  weight: number;
  dimensions?: ParcelDimensions;
  status: ParcelStatus;
  currentLocation: string;
  estimatedDelivery?: string;
  trackingHistory: TrackingHistoryItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateParcelRequest {
  sender?: ParcelSender;
  receiver: ParcelReceiver;
  weight: number;
  dimensions?: ParcelDimensions;
  estimatedDelivery?: string;
}

export interface UpdateParcelStatusRequest {
  status: ParcelStatus;
  location?: string;
  notes?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}