const Parcel = require('../models/Parcel');

/**
 * Automatically update parcel statuses based on expected delivery date
 * Status progression timeline:
 * - pending: Initial status
 * - picked_up: 10% of time to delivery
 * - in_transit: 30% of time to delivery
 * - out_for_delivery: 90% of time to delivery
 * - delivered: At or past delivery date
 */
async function autoUpdateParcelStatuses() {
  try {
    const now = new Date();

    // Find all parcels that are not yet delivered or failed
    const activeParcels = await Parcel.find({
      status: { $nin: ['delivered', 'failed'] },
      estimatedDelivery: { $exists: true, $ne: null }
    });

    let updatedCount = 0;

    for (const parcel of activeParcels) {
      const createdAt = new Date(parcel.createdAt);
      const deliveryDate = new Date(parcel.estimatedDelivery);
      const totalDuration = deliveryDate - createdAt;
      const elapsed = now - createdAt;
      const progressPercentage = (elapsed / totalDuration) * 100;

      let newStatus = null;
      let newLocation = parcel.currentLocation;
      let notes = '';

      // Determine new status based on progress
      if (now >= deliveryDate && parcel.status !== 'delivered') {
        newStatus = 'delivered';
        newLocation = 'Delivered';
        notes = 'Parcel delivered successfully';
      } else if (progressPercentage >= 90 && parcel.status !== 'out_for_delivery') {
        newStatus = 'out_for_delivery';
        newLocation = 'Local Delivery Hub';
        notes = 'Out for delivery - arriving today';
      } else if (progressPercentage >= 30 && parcel.status !== 'in_transit' && parcel.status !== 'out_for_delivery') {
        newStatus = 'in_transit';
        newLocation = 'Regional Distribution Center';
        notes = 'Package in transit';
      } else if (progressPercentage >= 10 && parcel.status === 'pending') {
        newStatus = 'picked_up';
        newLocation = 'Origin Facility';
        notes = 'Package picked up and processed';
      }

      // Update the parcel if status changed
      if (newStatus && newStatus !== parcel.status) {
        parcel.status = newStatus;
        parcel.currentLocation = newLocation;

        parcel.trackingHistory.push({
          status: newStatus,
          location: newLocation,
          timestamp: now,
          notes: notes
        });

        await parcel.save();
        updatedCount++;

        console.log(`✅ Auto-updated parcel ${parcel.trackingNumber}: ${parcel.status}`);
      }
    }

    if (updatedCount > 0) {
      console.log(`🔄 Auto-update complete: ${updatedCount} parcel(s) updated`);
    }

    return {
      success: true,
      updatedCount,
      message: `Updated ${updatedCount} parcel(s)`
    };
  } catch (error) {
    console.error('❌ Auto-update error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Start automatic updates with interval (in minutes)
 */
function startAutoUpdateScheduler(intervalMinutes = 5) {
  console.log(`🚀 Starting auto-update scheduler (runs every ${intervalMinutes} minutes)`);

  // Run immediately on start
  autoUpdateParcelStatuses();

  // Then run at intervals
  const intervalMs = intervalMinutes * 60 * 1000;
  setInterval(autoUpdateParcelStatuses, intervalMs);
}

module.exports = {
  autoUpdateParcelStatuses,
  startAutoUpdateScheduler
};
