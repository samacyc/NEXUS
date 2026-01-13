const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    unique: true,
    uppercase: true
  },
  sender: {
    name: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    }
  },
  receiver: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  weight: {
    type: Number,
    required: true
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  status: {
    type: String,
    enum: ['pending', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'failed'],
    default: 'pending'
  },
  currentLocation: {
    type: String,
    default: 'Warehouse'
  },
  estimatedDelivery: {
    type: Date
  },
  trackingHistory: [{
    status: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    notes: String
  }]
}, {
  timestamps: true
});

// Generate tracking number automatically before saving
parcelSchema.pre('save', async function() {
  if (!this.trackingNumber) {
    // Generate tracking number format: LT + timestamp + random
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.trackingNumber = `LT${timestamp}${random}`;
  }
});

module.exports = mongoose.model('Parcel', parcelSchema);
