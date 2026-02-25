import React, { useState } from 'react';
import { SearchIcon, TruckIcon } from './Icons';
import { apiService } from '../services/apiService';
import type { Parcel } from '../types';

export const TrackingSection: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState<null | 'idle' | 'searching' | 'found' | 'error'>('idle');
  const [parcelData, setParcelData] = useState<Parcel | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDateOnly = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    });
  };

  const groupByDate = (history: typeof parcelData.trackingHistory) => {
    const groups: Record<string, typeof history> = {};
    history.forEach(item => {
      const dateKey = new Date(item.timestamp).toLocaleDateString('en-US');
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
    });
    return groups;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'picked_up':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="3" />
          </svg>
        );
    }
  };

  const getNextStepMessage = (status: string) => {
    const nextSteps: Record<string, string> = {
      pending: 'Next: Package will be picked up from sender',
      picked_up: 'Next: Package will be in transit to destination',
      in_transit: 'Next: Package will be out for delivery',
      out_for_delivery: 'Next: Package will be delivered',
      failed: 'Next: Delivery will be reattempted',
      delivered: 'Package has been delivered'
    };
    return nextSteps[status] || 'Tracking your package...';
  };

  const copyTrackingLink = () => {
    if (!parcelData) return;
    const trackingUrl = `${window.location.origin}/track/${parcelData.trackingNumber}`;
    navigator.clipboard.writeText(trackingUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
           <div className="mt-8 bg-white border border-slate-200 rounded-lg animate-fade-in-up shadow-sm overflow-hidden">
              {/* Header with tracking number and status */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{getStatusDisplay(parcelData.status)}</h3>
                    <p className="text-sm text-slate-600 mt-1">Tracking Number: {parcelData.trackingNumber}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {parcelData.estimatedDelivery && (
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Expected Delivery</p>
                        <p className="text-sm font-semibold text-slate-900">{formatDate(parcelData.estimatedDelivery)}</p>
                      </div>
                    )}
                    <button
                      onClick={copyTrackingLink}
                      className="px-4 py-2 bg-slate-900 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      title="Copy shareable tracking link"
                    >
                      {copied ? (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Share
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Next Step Recommendation */}
              {parcelData.status !== 'delivered' && (
                <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <p className="text-sm font-medium text-blue-900">{getNextStepMessage(parcelData.status)}</p>
                  </div>
                </div>
              )}

              {/* Tracking Timeline */}
              <div className="px-6 py-6">
                {Object.entries(groupByDate(parcelData.trackingHistory.slice().reverse())).map(([dateKey, items], groupIndex) => (
                  <div key={groupIndex} className={groupIndex > 0 ? 'mt-6' : ''}>
                    {/* Date Header */}
                    <div className="text-sm font-semibold text-slate-700 mb-3">
                      {formatDateOnly(items[0].timestamp)}
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-0">
                      {items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start py-2 border-b border-slate-100 last:border-0">
                          {/* Time */}
                          <div className="w-20 flex-shrink-0 text-sm text-slate-600">
                            {formatTime(item.timestamp)}
                          </div>

                          {/* Icon */}
                          <div className="flex-shrink-0 mx-4">
                            <div className="text-slate-600">
                              {getStatusIcon(item.status)}
                            </div>
                          </div>

                          {/* Status Message */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">
                              {getStatusDisplay(item.status)}
                            </p>
                            {item.notes && (
                              <p className="text-xs text-slate-600 mt-0.5">{item.notes}</p>
                            )}
                          </div>

                          {/* Location */}
                          <div className="w-32 flex-shrink-0 text-right text-sm text-slate-600 uppercase">
                            {item.location || <span className="text-slate-400 italic normal-case">(No location)</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipment Details Footer */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Weight:</span>
                    <p className="font-medium text-slate-900">{parcelData.weight} lb</p>
                  </div>
                  {parcelData.receiver && (
                    <>
                      <div>
                        <span className="text-slate-500">Receiver:</span>
                        <p className="font-medium text-slate-900">{parcelData.receiver.name}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Destination:</span>
                        <p className="font-medium text-slate-900">{parcelData.receiver.address}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
           </div>
        )}

      </div>
    </section>
  );
};