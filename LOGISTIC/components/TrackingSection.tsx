import React, { useState } from 'react';
import { SearchIcon, TruckIcon } from './Icons';
import { apiService } from '../services/apiService';
import type { Parcel } from '../types';

export const TrackingSection: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState<null | 'idle' | 'searching' | 'found' | 'error'>('idle');
  const [parcelData, setParcelData] = useState<Parcel | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) return;

    setStatus('searching');
    setErrorMessage('');
    setParcelData(null);

    try {
      const response = await apiService.trackParcel(trackingId);
      if (response.success && response.data) {
        setParcelData(response.data);
        setStatus('found');
      } else {
        setErrorMessage(response.message || 'Parcel not found');
        setStatus('error');
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to track parcel. Please try again.');
      setStatus('error');
    }
  };

  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Pending',
      picked_up: 'Picked Up',
      in_transit: 'In Transit',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      failed: 'Delivery Failed'
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section id="tracking" className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Track Your Shipment</h2>
          <p className="text-slate-500 mt-2">Enter your BOL, Reference, or Tracking Number.</p>
        </div>

        <form onSubmit={handleTrack} className="relative max-w-lg mx-auto">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="e.g. NX-8492-B2B" 
              className="w-full pl-12 pr-32 py-4 rounded-lg border-2 border-slate-200 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none text-lg transition-all font-mono text-slate-700 placeholder-slate-400"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-red-600 transition-colors" />
            <button 
              type="submit" 
              className="absolute right-2 top-2 bottom-2 bg-slate-900 hover:bg-red-700 text-white px-6 rounded-md font-bold transition-colors uppercase text-sm tracking-wide"
            >
              Track
            </button>
          </div>
        </form>

        {status === 'searching' && (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="text-red-600 text-xl">⚠️</div>
              <div>
                <h3 className="text-lg font-bold text-red-900">Tracking Error</h3>
                <p className="text-red-700 mt-1">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {status === 'found' && parcelData && (
           <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-6 animate-fade-in-up shadow-sm">
              <div className="flex items-start gap-4">
                 <div className="bg-slate-900 p-3 rounded-md">
                    <TruckIcon className="text-white w-6 h-6" />
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <h3 className="text-lg font-bold text-slate-900 uppercase">{getStatusDisplay(parcelData.status)}</h3>
                          <p className="text-slate-600">Tracking: {parcelData.trackingNumber}</p>
                          {parcelData.estimatedDelivery && (
                            <p className="text-sm text-slate-500 mt-1">
                              Expected: {formatDate(parcelData.estimatedDelivery)}
                            </p>
                          )}
                       </div>
                       {parcelData.updatedAt && (
                         <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                           Updated: {formatDate(parcelData.updatedAt)}
                         </span>
                       )}
                    </div>

                    <div className="mb-4 p-4 bg-white rounded-lg border border-slate-200">
                      <h4 className="font-semibold text-slate-900 mb-2">Shipment Details</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-slate-500">Current Location:</span>
                          <p className="font-medium text-slate-900">{parcelData.currentLocation}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Weight:</span>
                          <p className="font-medium text-slate-900">{parcelData.weight} kg</p>
                        </div>
                        {parcelData.receiver && (
                          <div className="col-span-2">
                            <span className="text-slate-500">Receiver:</span>
                            <p className="font-medium text-slate-900">{parcelData.receiver.name}</p>
                            <p className="text-xs text-slate-600">{parcelData.receiver.address}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      <h4 className="font-semibold text-slate-900 mb-2">Tracking History</h4>
                      {parcelData.trackingHistory.slice().reverse().map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${index === 0 ? 'bg-red-600' : 'bg-slate-300'}`}></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <span className="text-sm font-medium text-slate-900">
                                {getStatusDisplay(item.status)} - {item.location}
                              </span>
                              <span className="text-xs text-slate-500">{formatDate(item.timestamp)}</span>
                            </div>
                            {item.notes && (
                              <p className="text-xs text-slate-600 mt-1">{item.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
           </div>
        )}

      </div>
    </section>
  );
};