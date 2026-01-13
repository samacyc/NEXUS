import type {
  Parcel,
  CreateParcelRequest,
  UpdateParcelStatusRequest,
  ApiResponse
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; message: string }>> {
    return this.request('/api/health');
  }

  // Get all parcels
  async getAllParcels(): Promise<ApiResponse<Parcel[]>> {
    return this.request('/api/parcels');
  }

  // Track a parcel by tracking number
  async trackParcel(trackingNumber: string): Promise<ApiResponse<Parcel>> {
    return this.request(`/api/parcels/track/${trackingNumber.toUpperCase()}`);
  }

  // Create a new parcel
  async createParcel(parcelData: CreateParcelRequest): Promise<ApiResponse<Parcel>> {
    return this.request('/api/parcels', {
      method: 'POST',
      body: JSON.stringify(parcelData),
    });
  }

  // Update parcel status
  async updateParcelStatus(
    trackingNumber: string,
    statusUpdate: UpdateParcelStatusRequest
  ): Promise<ApiResponse<Parcel>> {
    return this.request(`/api/parcels/${trackingNumber.toUpperCase()}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusUpdate),
    });
  }

  // Delete a parcel
  async deleteParcel(trackingNumber: string): Promise<ApiResponse<void>> {
    return this.request(`/api/parcels/${trackingNumber.toUpperCase()}`, {
      method: 'DELETE',
    });
  }

  // Trigger automatic status updates
  async triggerAutoUpdate(): Promise<ApiResponse<any>> {
    return this.request('/api/parcels/auto-update/trigger', {
      method: 'POST',
    });
  }
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;
