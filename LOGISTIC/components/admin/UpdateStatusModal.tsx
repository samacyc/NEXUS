import React, { useState } from 'react';
import { apiService } from '../../services/apiService';
import type { Parcel, ParcelStatus } from '../../types';

interface UpdateStatusModalProps {
  parcel: Parcel;
  onClose: () => void;
  onSuccess: () => void;
}

export const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({
  parcel,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deletingHistoryId, setDeletingHistoryId] = useState<string | null>(null);
  const [removingLocationId, setRemovingLocationId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    status: parcel.status,
    location: parcel.currentLocation,
    notes: '',
    timestamp: '',
  });

  const statusOptions: { value: ParcelStatus; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'picked_up', label: 'Picked Up' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'failed', label: 'Failed' },
  ];

  // Get next step recommendation based on current status
  const getNextStepRecommendation = () => {
    const statusFlow: Record<ParcelStatus, { next: ParcelStatus; location: string; notes: string }> = {
      pending: {
        next: 'picked_up',
        location: 'Pickup Facility',
        notes: 'Package picked up from sender'
      },
      picked_up: {
        next: 'in_transit',
        location: 'Distribution Center',
        notes: 'In transit to destination'
      },
      in_transit: {
        next: 'out_for_delivery',
        location: 'Local Delivery Hub',
        notes: 'Out for delivery'
      },
      out_for_delivery: {
        next: 'delivered',
        location: parcel.receiver.address,
        notes: 'Package delivered successfully'
      },
      delivered: {
        next: 'delivered',
        location: parcel.receiver.address,
        notes: 'Already delivered'
      },
      failed: {
        next: 'out_for_delivery',
        location: 'Local Delivery Hub',
        notes: 'Retry delivery attempt'
      }
    };
    return statusFlow[parcel.status];
  };

  const applyRecommendation = () => {
    const recommendation = getNextStepRecommendation();
    setFormData({
      status: recommendation.next,
      location: recommendation.location,
      notes: recommendation.notes,
      timestamp: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiService.updateParcelStatus(parcel.trackingNumber, {
        status: formData.status as ParcelStatus,
        location: formData.location,
        notes: formData.notes || undefined,
        timestamp: formData.timestamp || undefined,
      });

      if (response.success) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update parcel status');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLocation = async (historyId: string) => {
    if (!historyId) return;

    const confirmed = window.confirm('Are you sure you want to remove the location from this tracking update?');
    if (!confirmed) return;

    setRemovingLocationId(historyId);
    setError('');

    try {
      const response = await apiService.updateTrackingHistory(
        parcel.trackingNumber,
        historyId,
        { location: '' }
      );
      if (response.success) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to remove location');
    } finally {
      setRemovingLocationId(null);
    }
  };

  const handleDeleteHistory = async (historyId: string) => {
    if (!historyId) return;

    if (parcel.trackingHistory.length <= 1) {
      setError('Cannot delete the only tracking history entry');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this tracking update?');
    if (!confirmed) return;

    setDeletingHistoryId(historyId);
    setError('');

    try {
      const response = await apiService.deleteTrackingHistory(parcel.trackingNumber, historyId);
      if (response.success) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete tracking history');
    } finally {
      setDeletingHistoryId(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Update Parcel Status</h2>
            <p className="text-sm text-slate-600 mt-1 font-mono">
              {parcel.trackingNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Current Info */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">Current Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Status:</span>
              <span className="ml-2 font-medium text-slate-900">
                {parcel.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Location:</span>
              <span className="ml-2 font-medium text-slate-900">
                {parcel.currentLocation}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500">Receiver:</span>
              <span className="ml-2 font-medium text-slate-900">
                {parcel.receiver.name} - {parcel.receiver.address}
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Next Step Recommendation */}
          {parcel.status !== 'delivered' && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-sm font-semibold text-blue-900">Recommended Next Step</h4>
                  </div>
                  <p className="text-sm text-blue-800">
                    <span className="font-medium">Status:</span> {statusOptions.find(s => s.value === getNextStepRecommendation().next)?.label}
                    <br />
                    <span className="font-medium">Location:</span> {getNextStepRecommendation().location}
                    <br />
                    <span className="font-medium">Notes:</span> {getNextStepRecommendation().notes}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={applyRecommendation}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                New Status <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as ParcelStatus })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="e.g., Memphis Distribution Center"
              />
              <p className="mt-1 text-xs text-slate-500">
                Leave empty to keep current location
              </p>
            </div>

            {/* Timestamp */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Update Date & Time
              </label>
              <input
                type="datetime-local"
                value={formData.timestamp}
                onChange={(e) => setFormData({ ...formData, timestamp: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
              />
              <p className="mt-1 text-xs text-slate-500">
                Leave empty to use current date & time
              </p>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none resize-none"
                placeholder="Add any additional notes about this status update..."
              />
            </div>
          </div>

          {/* Tracking History Preview */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              Recent History ({parcel.trackingHistory.length} events)
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {parcel.trackingHistory
                .slice()
                .reverse()
                .map((event, index) => (
                  <div key={event._id || index} className="text-xs group">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                      <span className="font-medium text-slate-900">
                        {event.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-slate-500">- {event.location || '(No location)'}</span>
                      <div className="ml-auto flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {event._id && event.location && (
                          <button
                            type="button"
                            onClick={() => handleRemoveLocation(event._id!)}
                            disabled={removingLocationId === event._id}
                            className="text-orange-600 hover:text-orange-800 disabled:opacity-50"
                            title="Remove location from this update"
                          >
                            {removingLocationId === event._id ? (
                              <span className="text-xs">Removing...</span>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                <line x1="4" y1="4" x2="20" y2="20" strokeLinecap="round" strokeWidth={2} />
                              </svg>
                            )}
                          </button>
                        )}
                        {event._id && parcel.trackingHistory.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteHistory(event._id!)}
                            disabled={deletingHistoryId === event._id}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50"
                            title="Delete this update"
                          >
                            {deletingHistoryId === event._id ? (
                              <span className="text-xs">Deleting...</span>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    {event.notes && (
                      <div className="ml-4 text-slate-600">{event.notes}</div>
                    )}
                    <div className="ml-4 text-slate-400 text-[10px]">
                      {new Date(event.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Hover over entries to remove location or delete
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
