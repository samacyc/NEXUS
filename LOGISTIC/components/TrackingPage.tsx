import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import type { Parcel } from '../types';
import { TruckIcon } from './Icons';

export const TrackingPage: React.FC = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [parcelData, setParcelData] = useState<Parcel | null>(null);

  useEffect(() => {
    if (trackingNumber) {
      fetchTrackingInfo();
    }
  }, [trackingNumber]);

  const fetchTrackingInfo = async () => {
    if (!trackingNumber) return;

    setLoading(true);
    setError('');

    try {
      const response = await apiService.trackParcel(trackingNumber);
      if (response.success && response.data) {
        setParcelData(response.data);
      } else {
        setError(response.message || 'Parcel not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to track parcel. Please try again.');
    } finally {
      setLoading(false);
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

  const groupByDate = (history: any[]) => {
    const groups: Record<string, any[]> = {};
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-slate-900 hover:text-red-600 transition-colors"
            >
              Nexus Logistics
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-slate-600 hover:text-slate-900 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Track Your Shipment</h1>
          <p className="text-slate-600">Tracking Number: <span className="font-mono font-semibold">{trackingNumber}</span></p>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center animate-fade-in-up">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-red-900 mb-2">Tracking Error</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Go to Home Page
            </button>
          </div>
        )}

        {parcelData && !loading && !error && (
          <div className="bg-white border border-slate-200 rounded-lg animate-fade-in-up shadow-sm overflow-hidden">
            {/* Header with tracking number and status */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{getStatusDisplay(parcelData.status)}</h3>
                  <p className="text-sm text-slate-600 mt-1">Tracking Number: {parcelData.trackingNumber}</p>
                </div>
                {parcelData.estimatedDelivery && (
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Expected Delivery</p>
                    <p className="text-sm font-semibold text-slate-900">{formatDate(parcelData.estimatedDelivery)}</p>
                  </div>
                )}
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
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600 text-sm">
          <p>&copy; 2026 Nexus Logistics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
