# LOGISTIC Frontend - Backend Integration Setup

## Overview
The LOGISTIC frontend is now connected to the backend API for real-time parcel tracking.

## Configuration

### Backend API
- **Base URL**: `http://localhost:5000`
- **API Endpoints**:
  - `GET /api/health` - Health check
  - `GET /api/parcels` - Get all parcels
  - `GET /api/parcels/track/:trackingNumber` - Track a parcel
  - `POST /api/parcels` - Create new parcel
  - `PUT /api/parcels/:trackingNumber/status` - Update parcel status
  - `DELETE /api/parcels/:trackingNumber` - Delete parcel

### Frontend Configuration
- **Port**: 3000
- **Proxy**: Configured to forward `/api/*` requests to backend
- **Environment Variables**: See `.env` file

## Getting Started

### 1. Start the Backend
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

### 2. Start the Frontend
```bash
cd LOGISTIC
npm run dev
# Frontend will run on http://localhost:3000
```

### 3. Ensure MongoDB is Running
The backend requires MongoDB. If not installed:
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Or use MongoDB Atlas (cloud)
```

## Testing the Connection

### Create a Test Parcel
You can use the backend test script:
```bash
cd backend
node test-api.js
```

Or use curl:
```bash
curl -X POST http://localhost:5000/api/parcels \
  -H "Content-Type: application/json" \
  -d '{
    "receiver": {
      "name": "John Doe",
      "address": "123 Main St, New York, NY 10001",
      "phone": "+1234567890"
    },
    "weight": 5.5,
    "dimensions": {
      "length": 30,
      "width": 20,
      "height": 15
    }
  }'
```

This will return a tracking number (e.g., `LT123456781234`) that you can use to test tracking.

### Track a Parcel
1. Open the frontend at `http://localhost:3000`
2. Scroll to the "Track Your Shipment" section
3. Enter a tracking number
4. Click "Track"

## Features Integrated

### Current Features
- ✅ Real-time parcel tracking
- ✅ Display tracking history
- ✅ Show shipment details (weight, location, receiver)
- ✅ Error handling for invalid tracking numbers
- ✅ Loading states

### Available for Future Integration
- Create new parcels from frontend
- Update parcel status
- View all parcels (admin panel)
- Auto-update trigger

## API Service Usage

The API service is available throughout the frontend:

```typescript
import { apiService } from '../services/apiService';

// Track a parcel
const response = await apiService.trackParcel('LT123456781234');

// Get all parcels
const parcels = await apiService.getAllParcels();

// Create a parcel
const newParcel = await apiService.createParcel({
  receiver: { name: "...", address: "...", phone: "..." },
  weight: 5.5
});

// Update parcel status
await apiService.updateParcelStatus('LT123456781234', {
  status: 'in_transit',
  location: 'Memphis Hub',
  notes: 'Package scanned at facility'
});
```

## Environment Variables

### `.env` File
```
VITE_API_URL=http://localhost:5000
GEMINI_API_KEY=your_gemini_api_key_here
```

## Troubleshooting

### Backend not connecting
1. Ensure backend is running: `cd backend && npm run dev`
2. Check backend port is 5000
3. Verify MongoDB is running

### CORS errors
- The backend already has CORS enabled
- The frontend uses a proxy in development mode

### Tracking not working
1. Ensure you have created parcels in the database
2. Check browser console for errors
3. Verify the tracking number is correct (case-insensitive)

## Backoffice / Admin Dashboard

A complete admin dashboard has been added to manage parcels with authentication protection.

### Accessing the Backoffice

**URL**: http://localhost:3000/admin.html

> 🔐 **Authentication Required**: You must log in to access the backoffice.

**Default Credentials:**
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Security Note**: Change these credentials in production!

### Features

1. **Parcel Management**
   - View all parcels in a sortable table
   - Search by tracking number, receiver name, or address
   - Filter by status (pending, in transit, delivered, etc.)
   - Real-time data from MongoDB

2. **Create New Parcels**
   - Add sender information (optional)
   - Add receiver information (required)
   - Specify package details (weight, dimensions)
   - Set estimated delivery date
   - Auto-generates unique tracking numbers

3. **Update Parcel Status**
   - Change status (pending → picked up → in transit → delivered)
   - Update current location
   - Add tracking notes
   - View tracking history

4. **Additional Actions**
   - Delete parcels
   - Trigger automatic status updates
   - Refresh parcel list

### Backoffice Components

```
LOGISTIC/components/admin/
├── AdminDashboard.tsx      # Main dashboard layout
├── ParcelList.tsx          # Table view of all parcels
├── CreateParcelForm.tsx    # Form to create new parcels
└── UpdateStatusModal.tsx   # Modal for updating parcel status
```

### Quick Actions

**View all parcels:**
```bash
curl http://localhost:3001/api/parcels
```

**Create a parcel via API:**
```bash
curl -X POST http://localhost:3001/api/parcels \
  -H "Content-Type: application/json" \
  -d '{
    "receiver": {
      "name": "John Doe",
      "address": "123 Main St, New York, NY 10001",
      "phone": "+1234567890"
    },
    "weight": 5.5
  }'
```

**Update parcel status:**
```bash
curl -X PUT http://localhost:3001/api/parcels/LT123456789/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_transit",
    "location": "Memphis Hub",
    "notes": "Package scanned at facility"
  }'
```

## Next Steps

Consider adding:
1. ✅ Admin dashboard to create/manage parcels (COMPLETED)
2. Authentication for the backoffice
3. Real-time updates with WebSockets
4. Email notifications for tracking updates
5. Export tracking history to PDF
6. Analytics dashboard with charts
7. Bulk parcel import (CSV/Excel)
