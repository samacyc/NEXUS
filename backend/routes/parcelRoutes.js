const express = require('express');
const router = express.Router();
const Parcel = require('../models/Parcel');
const { autoUpdateParcelStatuses } = require('../services/autoUpdateService');

// Create a new parcel
router.post('/', async (req, res) => {
  try {
    const parcel = new Parcel(req.body);

    // Add initial tracking history
    parcel.trackingHistory.push({
      status: 'pending',
      location: 'Processing Center',
      notes: 'Parcel received and processing'
    });

    await parcel.save();
    res.status(201).json({
      success: true,
      message: 'Parcel created successfully',
      data: parcel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating parcel',
      error: error.message
    });
  }
});

// Get all parcels (Admin)
router.get('/', async (req, res) => {
  try {
    const parcels = await Parcel.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: parcels.length,
      data: parcels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching parcels',
      error: error.message
    });
  }
});

// Track a parcel by tracking number
router.get('/track/:trackingNumber', async (req, res) => {
  try {
    const parcel = await Parcel.findOne({
      trackingNumber: req.params.trackingNumber.toUpperCase()
    });

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: 'Parcel not found. Please check your tracking number.'
      });
    }

    res.json({
      success: true,
      data: parcel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error tracking parcel',
      error: error.message
    });
  }
});

// Update parcel status
router.put('/:trackingNumber/status', async (req, res) => {
  try {
    const { status, location, notes } = req.body;

    const parcel = await Parcel.findOne({
      trackingNumber: req.params.trackingNumber.toUpperCase()
    });

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: 'Parcel not found'
      });
    }

    // Update current status and location
    parcel.status = status;
    if (location) parcel.currentLocation = location;

    // Add to tracking history
    parcel.trackingHistory.push({
      status,
      location: location || parcel.currentLocation,
      notes: notes || `Status updated to ${status}`
    });

    await parcel.save();

    res.json({
      success: true,
      message: 'Parcel status updated successfully',
      data: parcel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating parcel status',
      error: error.message
    });
  }
});

// Delete a parcel
router.delete('/:trackingNumber', async (req, res) => {
  try {
    const parcel = await Parcel.findOneAndDelete({
      trackingNumber: req.params.trackingNumber.toUpperCase()
    });

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: 'Parcel not found'
      });
    }

    res.json({
      success: true,
      message: 'Parcel deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting parcel',
      error: error.message
    });
  }
});

// Trigger automatic status updates (Admin)
router.post('/auto-update/trigger', async (req, res) => {
  try {
    const result = await autoUpdateParcelStatuses();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error running auto-update',
      error: error.message
    });
  }
});

module.exports = router;
