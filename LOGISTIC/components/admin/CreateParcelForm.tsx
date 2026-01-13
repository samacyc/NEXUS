import React, { useState } from 'react';
import { apiService } from '../../services/apiService';
import type { CreateParcelRequest } from '../../types';

interface CreateParcelFormProps {
  onSuccess: () => void;
}

export const CreateParcelForm: React.FC<CreateParcelFormProps> = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState<CreateParcelRequest>({
    sender: {
      name: '',
      address: '',
      phone: '',
    },
    receiver: {
      name: '',
      address: '',
      phone: '',
    },
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
  });

  const handleInputChange = (
    section: 'sender' | 'receiver' | 'dimensions' | 'root',
    field: string,
    value: string | number
  ) => {
    if (section === 'root') {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await apiService.createParcel(formData);
      if (response.success && response.data) {
        setSuccessMessage(
          `Parcel created successfully! Tracking Number: ${response.data.trackingNumber}`
        );

        // Reset form
        setFormData({
          sender: { name: '', address: '', phone: '' },
          receiver: { name: '', address: '', phone: '' },
          weight: 0,
          dimensions: { length: 0, width: 0, height: 0 },
        });

        // Notify parent component
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create parcel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Sender Information (Optional) */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Sender Information <span className="text-slate-400 text-sm font-normal">(Optional)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sender Name
              </label>
              <input
                type="text"
                value={formData.sender?.name || ''}
                onChange={(e) => handleInputChange('sender', 'name', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sender Phone
              </label>
              <input
                type="tel"
                value={formData.sender?.phone || ''}
                onChange={(e) => handleInputChange('sender', 'phone', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="+1234567890"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sender Address
              </label>
              <input
                type="text"
                value={formData.sender?.address || ''}
                onChange={(e) => handleInputChange('sender', 'address', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="123 Main St, New York, NY 10001"
              />
            </div>
          </div>
        </div>

        {/* Receiver Information (Required) */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Receiver Information <span className="text-red-600">*</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Receiver Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.receiver.name}
                onChange={(e) => handleInputChange('receiver', 'name', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Receiver Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.receiver.phone}
                onChange={(e) => handleInputChange('receiver', 'phone', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="+0987654321"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Receiver Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.receiver.address}
                onChange={(e) => handleInputChange('receiver', 'address', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="456 Test Ave, Los Angeles, CA 90001"
              />
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Package Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Weight (kg) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                required
                value={formData.weight}
                onChange={(e) =>
                  handleInputChange('root', 'weight', parseFloat(e.target.value) || 0)
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="5.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Length (cm)
              </label>
              <input
                type="number"
                min="0"
                value={formData.dimensions?.length || ''}
                onChange={(e) =>
                  handleInputChange('dimensions', 'length', parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Width (cm)
              </label>
              <input
                type="number"
                min="0"
                value={formData.dimensions?.width || ''}
                onChange={(e) =>
                  handleInputChange('dimensions', 'width', parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                min="0"
                value={formData.dimensions?.height || ''}
                onChange={(e) =>
                  handleInputChange('dimensions', 'height', parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                placeholder="15"
              />
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Estimated Delivery Date (Optional)
          </label>
          <input
            type="datetime-local"
            value={formData.estimatedDelivery || ''}
            onChange={(e) => handleInputChange('root', 'estimatedDelivery', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Parcel...' : 'Create Parcel'}
          </button>
        </div>
      </form>
    </div>
  );
};
