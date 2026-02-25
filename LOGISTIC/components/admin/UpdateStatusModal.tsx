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
                      <span className="text-slate-500">- {event.location}</span>
                      {event._id && parcel.trackingHistory.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteHistory(event._id!)}
                          disabled={deletingHistoryId === event._id}
                          className="ml-auto text-red-600 hover:text-red-800 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
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
                    {event.notes && (
                      <div className="ml-4 text-slate-600">{event.notes}</div>
                    )}
                    <div className="ml-4 text-slate-400 text-[10px]">
                      {new Date(event.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
            </div>
            {parcel.trackingHistory.length > 1 && (
              <p className="text-xs text-slate-500 mt-2">
                Hover over entries to see delete option
              </p>
            )}
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
