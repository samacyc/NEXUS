import { QuoteRequest, QuoteResponse } from "../types";

// Mock zip code database for demonstration
const zipCodeData: Record<string, { city: string; state: string; lat: number; lng: number }> = {
  "10001": { city: "New York", state: "NY", lat: 40.7128, lng: -74.0060 },
  "90210": { city: "Beverly Hills", state: "CA", lat: 34.0901, lng: -118.4065 },
  "60601": { city: "Chicago", state: "IL", lat: 41.8781, lng: -87.6298 },
  "33101": { city: "Miami", state: "FL", lat: 25.7617, lng: -80.1918 },
  "98101": { city: "Seattle", state: "WA", lat: 47.6062, lng: -122.3321 },
  "75201": { city: "Dallas", state: "TX", lat: 32.7767, lng: -96.7970 },
  "02101": { city: "Boston", state: "MA", lat: 42.3601, lng: -71.0589 },
  "30301": { city: "Atlanta", state: "GA", lat: 33.7490, lng: -84.3880 },
};

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Get location info from zip code
const getLocationFromZip = (zip: string) => {
  // Use exact match if available
  if (zipCodeData[zip]) {
    return zipCodeData[zip];
  }

  // Otherwise generate approximate coordinates based on zip code prefix
  const prefix = zip.substring(0, 1);
  const mockData: Record<string, { city: string; state: string; lat: number; lng: number }> = {
    "0": { city: "Boston Area", state: "MA", lat: 42.3601, lng: -71.0589 },
    "1": { city: "New York Area", state: "NY", lat: 40.7128, lng: -74.0060 },
    "2": { city: "Washington Area", state: "DC", lat: 38.9072, lng: -77.0369 },
    "3": { city: "Atlanta Area", state: "GA", lat: 33.7490, lng: -84.3880 },
    "4": { city: "Louisville Area", state: "KY", lat: 38.2527, lng: -85.7585 },
    "5": { city: "Minneapolis Area", state: "MN", lat: 44.9778, lng: -93.2650 },
    "6": { city: "Chicago Area", state: "IL", lat: 41.8781, lng: -87.6298 },
    "7": { city: "Dallas Area", state: "TX", lat: 32.7767, lng: -96.7970 },
    "8": { city: "Denver Area", state: "CO", lat: 39.7392, lng: -104.9903 },
    "9": { city: "Los Angeles Area", state: "CA", lat: 34.0522, lng: -118.2437 },
  };

  return mockData[prefix] || { city: "Unknown", state: "US", lat: 39.8283, lng: -98.5795 };
};

export const generateShippingQuote = async (request: QuoteRequest): Promise<QuoteResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const origin = getLocationFromZip(request.originZip);
  const destination = getLocationFromZip(request.destZip);

  const distanceMiles = Math.round(
    calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng)
  );

  // Calculate base price based on distance and weight
  const basePrice = (distanceMiles * 0.012) + (request.weight * 0.15);

  // Generate shipping options
  const options = [
    {
      serviceLevel: "Nexus Eco Ground",
      price: Math.round(basePrice * 0.8 * 100) / 100,
      currency: "USD",
      estimatedDays: Math.ceil(distanceMiles / 500) + 2,
      carbonFootprint: `${Math.round(distanceMiles * 0.002)}kg`,
      aiAnalysis: "Best Value"
    },
    {
      serviceLevel: "Nexus EV Express",
      price: Math.round(basePrice * 1.5 * 100) / 100,
      currency: "USD",
      estimatedDays: Math.ceil(distanceMiles / 750) + 1,
      carbonFootprint: "0kg (EV)",
      aiAnalysis: "Zero Emission"
    },
    {
      serviceLevel: "Nexus Priority Zero",
      price: Math.round(basePrice * 2.5 * 100) / 100,
      currency: "USD",
      estimatedDays: 1,
      carbonFootprint: "0kg (Offset)",
      aiAnalysis: "Fastest Green Option"
    }
  ];

  return {
    origin: `${origin.city}, ${origin.state}`,
    destination: `${destination.city}, ${destination.state}`,
    originCoordinates: { lat: origin.lat, lng: origin.lng },
    destinationCoordinates: { lat: destination.lat, lng: destination.lng },
    distanceMiles,
    routeOptimizationNotes: `Route optimized for ${distanceMiles} miles using sustainable multi-modal transportation. Electric vehicle delivery prioritized where available. Carbon offsets included in premium tiers.`,
    options
  };
};