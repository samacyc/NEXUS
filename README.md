# LogisticTrack - Professional Logistics Tracking System

A modern, professional full-stack web application for managing and tracking parcels. Built with React, Node.js, Express, and MongoDB. Features a sleek design inspired by industry-leading logistics platforms.

## Features

### Customer Features
- **Modern Landing Page**: Professional hero section with compelling call-to-action
- **Modal-Based Tracking**: Clean, user-friendly tracking interface accessible from anywhere
- **Real-Time Updates**: Track parcels with live status updates and location information
- **Complete Timeline**: Visual timeline showing complete tracking history
- **Detailed Information**: View sender and receiver information with estimated delivery
- **Statistics Dashboard**: View key metrics like parcels delivered, countries covered, and on-time delivery rates
- **Service Showcase**: Learn about Express Shipping, E-Commerce Logistics, International Freight, and Warehousing

### Admin Features
- Create new parcels with automatic tracking number generation
- View all parcels in a dashboard
- Update parcel status and location
- Delete parcels
- Add notes to tracking history

## Tech Stack

**Frontend:**
- React 19
- TypeScript
- Vite as build tool
- Recharts for data visualization
- Google GenAI integration

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- CORS enabled for cross-origin requests

## Project Structure

```
Tracking/
├── backend/
│   ├── models/
│   │   └── Parcel.js           # MongoDB schema for parcels
│   ├── routes/
│   │   └── parcelRoutes.js     # API routes
│   ├── services/
│   │   └── autoUpdateService.js # Auto-update service
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server
│   └── package.json
│
├── LOGISTIC/                    # Frontend application
│   ├── components/              # React components
│   │   ├── Hero.tsx            # Hero section
│   │   ├── TrackingSection.tsx # Tracking interface
│   │   ├── Analytics.tsx       # Analytics dashboard
│   │   └── ...
│   ├── services/
│   │   └── apiService.ts       # API service layer
│   ├── hooks/                  # Custom React hooks
│   ├── App.tsx                 # Main app component
│   ├── vite.config.ts          # Vite configuration
│   ├── .env                    # Environment variables
│   └── package.json
│
├── ecosystem.config.js          # PM2 configuration
├── docker-compose.yml           # Docker Compose configuration
└── README.md
```

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm or yarn

## Installation & Setup

### 1. Install MongoDB

If you don't have MongoDB installed:

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Windows:**
Download and install from [MongoDB official website](https://www.mongodb.com/try/download/community)

### 2. Clone and Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done)
npm install

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:4000`

### 3. Setup Frontend

Open a new terminal window:

```bash
# Navigate to LOGISTIC directory
cd LOGISTIC

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:4001`

## Running with PM2 (Production)

PM2 is a production process manager for Node.js applications that keeps your apps running 24/7.

### 1. Install PM2 Globally

```bash
npm install -g pm2
```

### 2. Build the Frontend

Before running with PM2, build the frontend for production:

```bash
cd LOGISTIC
npm run build
cd ..
```

### 3. Start Applications with PM2

From the project root directory:

```bash
# Start both backend and frontend
pm2 start ecosystem.config.js

# Or start individually
pm2 start ecosystem.config.js --only logistics-backend
pm2 start ecosystem.config.js --only logistics-frontend
```

### 4. PM2 Commands

```bash
# View all running processes
pm2 list

# View logs
pm2 logs
pm2 logs logistics-backend
pm2 logs logistics-frontend

# Monitor CPU and memory
pm2 monit

# Restart applications
pm2 restart ecosystem.config.js
pm2 restart logistics-backend
pm2 restart logistics-frontend

# Stop applications
pm2 stop ecosystem.config.js
pm2 stop logistics-backend
pm2 stop logistics-frontend

# Delete from PM2 process list
pm2 delete ecosystem.config.js
pm2 delete logistics-backend
pm2 delete logistics-frontend

# Save PM2 process list (auto-restart on reboot)
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

### 5. PM2 Log Files

Logs are stored in the `logs/` directory:
- `backend-error.log` - Backend error logs
- `backend-out.log` - Backend output logs
- `backend-combined.log` - Backend combined logs
- `frontend-error.log` - Frontend error logs
- `frontend-out.log` - Frontend output logs
- `frontend-combined.log` - Frontend combined logs

### 6. Access the Application

After starting with PM2:
- **Frontend**: http://localhost:4001
- **Backend API**: http://localhost:4000

### 7. Update and Restart

When you make code changes:

```bash
# For backend changes
cd backend
pm2 restart logistics-backend

# For frontend changes
cd LOGISTIC
npm run build
cd ..
pm2 restart logistics-frontend
```

## Docker Deployment

For Docker deployment, see [DOCKER.md](./DOCKER.md) for detailed instructions.

Quick start with Docker:

```bash
# Start all services (MongoDB, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access points with Docker:
- **Frontend**: http://localhost:4001
- **Backend API**: http://localhost:4000
- **MongoDB**: localhost:27017

## Usage

### For Customers (Track Parcel)

1. Open your browser and navigate to `http://localhost:4001`
2. You'll see the professional landing page with:
   - Hero section highlighting the company's global leadership
   - Statistics showcasing delivery performance
   - Services section displaying logistics solutions
   - Features highlighting six pillars of excellence
3. Click "Track Your Parcel" button in the hero section or navigation bar
4. A modal will appear - enter your tracking number (e.g., LT123456780001)
5. Click "Track Parcel" to view:
   - Current status and location
   - Complete tracking history timeline
   - Sender and receiver information
   - Estimated delivery date

### For Admins (Manage Parcels)

1. Navigate to `http://localhost:4001/admin`
2. View all parcels in the dashboard
3. **Create New Parcel:**
   - Click "Create New Parcel"
   - Fill in sender and receiver information
   - Enter parcel weight and estimated delivery
   - Click "Create Parcel"
   - A tracking number will be automatically generated
4. **Update Parcel Status:**
   - Click "Update Status" on any parcel card
   - Select new status from dropdown
   - Enter current location
   - Add optional notes
   - Click "Update Status"
5. **Delete Parcel:**
   - Click "Delete" on any parcel card
   - Confirm deletion

## API Endpoints

### Parcels

- `POST /api/parcels` - Create a new parcel
- `GET /api/parcels` - Get all parcels
- `GET /api/parcels/track/:trackingNumber` - Track a specific parcel
- `PUT /api/parcels/:trackingNumber/status` - Update parcel status
- `DELETE /api/parcels/:trackingNumber` - Delete a parcel

### Health Check

- `GET /api/health` - Check API status

## Tracking Number Format

Tracking numbers are automatically generated in the format: `LT` + 8-digit timestamp + 4-digit random number

Example: `LT123456780001`

## Parcel Status Types

- `pending` - Parcel received at warehouse
- `picked_up` - Picked up from sender
- `in_transit` - In transit to destination
- `out_for_delivery` - Out for delivery
- `delivered` - Successfully delivered
- `failed` - Delivery failed

## Environment Variables

Backend `.env` file:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/logistics-tracking
```

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongodb` (Linux)
- Check if MongoDB is accessible on port 27017

**Port Already in Use:**
- Backend: Change PORT in `.env` file
- Frontend: Change port in `vite.config.js`

**CORS Errors:**
- Make sure both frontend and backend are running
- Check that the API_URL in `frontend/src/services/api.js` matches your backend URL

## Design Highlights

The frontend has been designed with a professional, modern aesthetic inspired by industry-leading logistics platforms:

### Professional Navigation
- Clean, sticky navigation bar with white background
- Logo and navigation links with smooth hover effects
- Prominent "Track Parcel" button in brand color (#e74c3c)
- Fully responsive with mobile menu support

### Hero Section
- Bold, eye-catching gradient background (dark gray to navy)
- Large, compelling headline about global leadership
- Clear call-to-action buttons
- Professional typography and spacing

### Statistics Section
- Grid layout showcasing key metrics
- Large numbers with labels
- Clean, minimalist design on light background

### Services & Features
- Card-based layouts with icons
- Smooth hover animations (lift effect)
- Organized grid system that adapts to screen size
- Clear section headings and descriptions

### Modal-Based Tracking
- Overlay with semi-transparent dark background (rgba(0,0,0,0.7))
- Clean white modal with smooth animations
- Color-coded status badges for quick identification
- Visual timeline with markers and connecting lines
- Responsive design for all screen sizes

### Comprehensive Footer
- Dark background (#1a1a1a) with white text
- Four-column layout with company info, links, services, and support
- Contact information with icons
- Legal links and copyright information
- Fully responsive grid system

### Color Scheme
- **Primary Background**: White (#ffffff)
- **Text**: Dark Navy (#2c3e50)
- **Accent/CTA**: Red (#e74c3c)
- **Light Background**: Off-white (#f8f9fa)
- **Dark Sections**: Charcoal (#1a1a1a)
- **Status Colors**: Orange (pending), Blue (picked up), Purple (in transit), Teal (out for delivery), Green (delivered), Red (failed)

## Future Enhancements

- User authentication and authorization
- Email notifications for status updates
- SMS notifications
- Real-time tracking with WebSockets
- Multiple warehouse support
- Route optimization
- Barcode generation and scanning
- Customer feedback system
- Analytics dashboard
- Mobile app development

## License

MIT License
