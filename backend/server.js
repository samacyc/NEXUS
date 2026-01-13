const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { startAutoUpdateScheduler } = require('./services/autoUpdateService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/logistics-tracking';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    // Start automatic status update scheduler (runs every 5 minutes)
    startAutoUpdateScheduler(5);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('\n⚠️  SERVER RUNNING WITHOUT DATABASE');
    console.log('📋 To fix this:');
    console.log('   1. Install MongoDB: brew install mongodb-community');
    console.log('   2. Start MongoDB: brew services start mongodb-community');
    console.log('   OR use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas\n');
  });

// Handle mongoose connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err.message);
});

// Routes
const parcelRoutes = require('./routes/parcelRoutes');
app.use('/api/parcels', parcelRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Logistics Tracking API is running' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
