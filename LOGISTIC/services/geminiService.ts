import { GoogleGenAI, Type, Schema } from "@google/genai";
import { QuoteRequest, QuoteResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    origin: { type: Type.STRING, description: "City and State of origin" },
    destination: { type: Type.STRING, description: "City and State of destination" },
    originCoordinates: {
       type: Type.OBJECT,
       properties: {
         lat: { type: Type.NUMBER, description: "Latitude of origin zip" },
         lng: { type: Type.NUMBER, description: "Longitude of origin zip" }
       },
       required: ["lat", "lng"]
    },
    destinationCoordinates: {
       type: Type.OBJECT,
       properties: {
         lat: { type: Type.NUMBER, description: "Latitude of destination zip" },
         lng: { type: Type.NUMBER, description: "Longitude of destination zip" }
       },
       required: ["lat", "lng"]
    },
    distanceMiles: { type: Type.NUMBER, description: "Approximate distance in miles" },
    routeOptimizationNotes: { type: Type.STRING, description: "A brief AI explanation of the chosen route efficiency (weather, traffic, hubs)." },
    options: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          serviceLevel: { type: Type.STRING, description: "e.g., Nexus Eco Ground, Nexus EV Express, Carbon Neutral Air" },
          price: { type: Type.NUMBER, description: "Cost in USD" },
          currency: { type: Type.STRING, description: "Always USD" },
          estimatedDays: { type: Type.NUMBER, description: "Days to deliver" },
          carbonFootprint: { type: Type.STRING, description: "e.g., '0kg (EV)', '12kg (Offset)'" },
          aiAnalysis: { type: Type.STRING, description: "Why this option is good (e.g., 'Most Sustainable', 'Fastest Green Option')" },
        },
        required: ["serviceLevel", "price", "currency", "estimatedDays", "carbonFootprint", "aiAnalysis"],
      },
    },
  },
  required: ["origin", "destination", "originCoordinates", "destinationCoordinates", "distanceMiles", "options", "routeOptimizationNotes"],
};

export const generateShippingQuote = async (request: QuoteRequest): Promise<QuoteResponse> => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Act as an advanced logistics pricing engine for "Nexus Logistics", a sustainable, B2B shipping carrier.
    Generate a realistic shipping quote for a package with the following details:
    - Origin Zip: ${request.originZip}
    - Destination Zip: ${request.destZip}
    - Weight: ${request.weight} lbs
    - Dimensions: ${request.dimensions}
    - Package Type: ${request.packageType}

    Calculate approximate coordinates (latitude/longitude) for the origin and destination zip codes for mapping purposes.
    
    Provide 3 distinct shipping options that emphasize sustainability:
    1. Nexus Eco Ground (Consolidated, efficient, uses rail/hybrid)
    2. Nexus EV Express (Electric Vehicle last mile, balanced speed)
    3. Nexus Priority Zero (Air freight with 100% carbon offsets included)

    Simulate real-world logistics logic (distance, weight, zones) for pricing.
    The 'routeOptimizationNotes' should sound technical and eco-conscious.
  `;

  try {
    const result = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.4,
      },
    });

    const text = result.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as QuoteResponse;
  } catch (error) {
    console.error("Gemini Quote Error:", error);
    // Fallback mock data
    return {
      origin: "New York, NY",
      destination: "Los Angeles, CA",
      originCoordinates: { lat: 40.7128, lng: -74.0060 },
      destinationCoordinates: { lat: 34.0522, lng: -118.2437 },
      distanceMiles: 2789,
      routeOptimizationNotes: "AI sustainability engine temporarily unavailable. Showing standard cached estimates.",
      options: [
        { serviceLevel: "Nexus Eco Ground", price: 15.50, currency: "USD", estimatedDays: 5, carbonFootprint: "4kg", aiAnalysis: "Best Value" },
        { serviceLevel: "Nexus EV Express", price: 45.00, currency: "USD", estimatedDays: 2, carbonFootprint: "0kg (EV)", aiAnalysis: "Zero Emission" },
      ],
    };
  }
};