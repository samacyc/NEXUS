import React, { useState, useEffect } from 'react';
import { ParcelList } from './ParcelList';
import { CreateParcelForm } from './CreateParcelForm';
import { UpdateStatusModal } from './UpdateStatusModal';
import { LoginPage } from './LoginPage';
import { apiService } from '../../services/apiService';
import { authService } from '../../services/authService';
import type { Parcel } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  const [activeTab, setActiveTab] = useState<'parcels' | 'create'>('parcels');
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    if (activeTab === 'parcels') {
      loadParcels();
    }
  }, [activeTab]);

  const loadParcels = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.getAllParcels();
      if (response.success && response.data) {
        setParcels(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load parcels');
    } finally {
      setLoading(false);
    }
  };

  const handleParcelCreated = () => {
    setActiveTab('parcels');
    loadParcels();
  };

  const handleUpdateStatus = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setShowUpdateModal(true);
  };

  const handleStatusUpdated = () => {
    setShowUpdateModal(false);
    setSelectedParcel(null);
    loadParcels();
  };

  const handleDeleteParcel = async (trackingNumber: string) => {
    if (!confirm('Are you sure you want to delete this parcel?')) return;

    try {
      await apiService.deleteParcel(trackingNumber);
      loadParcels();
    } catch (err: any) {
      alert(err.message || 'Failed to delete parcel');
    }
  };

  const handleTriggerAutoUpdate = async () => {
    setLoading(true);
    try {
      const response = await apiService.triggerAutoUpdate();
      alert(response.message || 'Auto-update triggered successfully');
      loadParcels();
    } catch (err: any) {
      alert(err.message || 'Failed to trigger auto-update');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Logistics Backoffice</h1>
              <p className="text-slate-400 mt-1">
                Manage parcels and tracking
                {authService.getCurrentUser() && (
                  <span className="ml-2">
                    • Logged in as <span className="text-white">{authService.getCurrentUser()?.username}</span>
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm font-medium"
              >
                Logout
              </button>
              <a
                href="/"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm font-medium"
              >
                Back to Website
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('parcels')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'parcels'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              All Parcels
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'create'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Create Parcel
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {activeTab === 'parcels' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">
                Parcel Management ({parcels.length})
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={loadParcels}
                  disabled={loading}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </button>
                <button
                  onClick={handleTriggerAutoUpdate}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                  Trigger Auto-Update
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <ParcelList
                parcels={parcels}
                onUpdateStatus={handleUpdateStatus}
                onDelete={handleDeleteParcel}
              />
            )}
          </div>
        )}

        {activeTab === 'create' && (
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Create New Parcel
            </h2>
            <CreateParcelForm onSuccess={handleParcelCreated} />
          </div>
        )}
      </main>

      {/* Update Status Modal */}
      {showUpdateModal && selectedParcel && (
        <UpdateStatusModal
          parcel={selectedParcel}
          onClose={() => setShowUpdateModal(false)}
          onSuccess={handleStatusUpdated}
        />
      )}
    </div>
  );
};
