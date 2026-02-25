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

// Update parcel status (with optional custom timestamp)
router.put('/:trackingNumber/status', async (req, res) => {
  try {
    const { status, location, notes, timestamp } = req.body;

    const parcel = await Parcel.findOne({
      trackingNumber: req.params.trackingNumber.toUpperCase()
    });

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: 'Parcel not found'
      });
    }

    // Validate timestamp if provided
    let customTimestamp = null;
    if (timestamp) {
      customTimestamp = new Date(timestamp);
      if (isNaN(customTimestamp.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid timestamp format. Use ISO 8601 format (e.g., 2024-01-01T10:30:00Z)'
        });
      }
    }

    // Update current status and location
    parcel.status = status;
    if (location) parcel.currentLocation = location;

    // Add to tracking history with custom timestamp if provided
    const historyEntry = {
      status,
      location: location || parcel.currentLocation,
      notes: notes || `Status updated to ${status}`
    };

    // If custom timestamp provided, use it; otherwise, let schema default (Date.now) handle it
    if (customTimestamp) {
      historyEntry.timestamp = customTimestamp;
    }

    parcel.trackingHistory.push(historyEntry);

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

// Delete a tracking history entry
router.delete('/:trackingNumber/history/:historyId', async (req, res) => {
  try {
    const parcel = await Parcel.findOne({
      trackingNumber: req.params.trackingNumber.toUpperCase()
    });

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: 'Parcel not found'
      });
    }

    // Find the tracking history entry
    const historyEntry = parcel.trackingHistory.id(req.params.historyId);

    if (!historyEntry) {
      return res.status(404).json({
        success: false,
        message: 'Tracking history entry not found'
      });
    }

    // Don't allow deleting if it's the only history entry
    if (parcel.trackingHistory.length === 1) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete the only tracking history entry'
      });
    }

    // Remove the entry
    historyEntry.deleteOne();
    await parcel.save();

    res.json({
      success: true,
      message: 'Tracking history entry deleted successfully',
      data: parcel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting tracking history entry',
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
