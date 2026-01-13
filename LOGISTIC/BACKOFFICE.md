# Logistics Backoffice Documentation

## Overview

The backoffice is a comprehensive admin dashboard for managing logistics parcels. It provides a clean, modern interface for creating, tracking, updating, and managing all parcel shipments.

## Access

**URL**: http://localhost:3000/admin.html

> 🔐 **Authentication Required**

The backoffice is now protected with authentication. You must log in before accessing any admin features.

### Login Credentials

**Username**: `admin`
**Password**: `admin123`

⚠️ **Important**: These are demo credentials for development only. Change them in production!

**See Also**: [AUTHENTICATION.md](./AUTHENTICATION.md) for complete authentication documentation.

## Login Page

When you first access the backoffice, you'll see a beautiful login page with:

### Design Features
- **Modern UI**: Dark gradient background with subtle animations
- **Responsive**: Works perfectly on desktop and mobile
- **User-Friendly**: Clear form with helpful error messages
- **Demo Info**: Login credentials displayed on the page

### Login Process
1. Enter your username
2. Enter your password
3. Click "Sign In"
4. You'll be authenticated and redirected to the dashboard

### Security Features
- Session persistence (stays logged in after page refresh)
- Logout button in dashboard header
- Secure session management with localStorage

## Dashboard Sections

### 1. All Parcels (Main View)

The main dashboard displays all parcels in a responsive table with the following features:

#### Search & Filter
- **Search Bar**: Find parcels by tracking number, receiver name, or address
- **Status Filter**: Filter by status (All, Pending, Picked Up, In Transit, Out for Delivery, Delivered, Failed)
- **Results Counter**: Shows "X of Y parcels" matching your criteria

#### Parcel Table Columns
- **Tracking Number**: Unique identifier (format: LT + timestamp + random)
- **Receiver**: Name and address
- **Status**: Color-coded badge showing current status
- **Location**: Current location of the parcel
- **Weight**: Package weight in kilograms
- **Created**: Date and time the parcel was created
- **Actions**: Update status or delete parcel

#### Status Color Coding
- 🟡 **Yellow**: Pending
- 🔵 **Blue**: Picked Up
- 🟣 **Purple**: In Transit
- 🔷 **Indigo**: Out for Delivery
- 🟢 **Green**: Delivered
- 🔴 **Red**: Failed

#### Actions
- **Update**: Opens modal to change parcel status
- **Delete**: Removes parcel (with confirmation)
- **Refresh**: Reload parcel list from database
- **Trigger Auto-Update**: Manually trigger automatic status progression

### 2. Create Parcel

Form to create new parcels with the following sections:

#### Sender Information (Optional)
- Name
- Phone number
- Full address

#### Receiver Information (Required)
- Name *
- Phone number *
- Full address *

#### Package Details
- **Weight** (kg) * - Required
- **Length** (cm) - Optional
- **Width** (cm) - Optional
- **Height** (cm) - Optional

#### Additional Info
- **Estimated Delivery Date** - Optional

#### Features
- Auto-generates unique tracking number (format: LT[timestamp][random])
- Adds initial tracking history entry
- Shows success message with tracking number
- Auto-redirects to parcel list after creation

## Update Status Modal

When clicking "Update" on a parcel, a modal appears with:

### Current Information Display
- Current status
- Current location
- Receiver details

### Update Form
- **New Status** dropdown (all 6 status options)
- **Location** input (optional, keeps current if empty)
- **Notes** textarea for additional information

### Recent History Preview
Shows last 3 tracking events with:
- Status
- Location
- Timestamp
- Notes (if available)

### Actions
- **Cancel**: Close modal without changes
- **Update Status**: Save changes and add to tracking history

## Status Workflow

The typical parcel lifecycle:

1. **Pending** → Initial state when parcel is created
2. **Picked Up** → Parcel collected from sender
3. **In Transit** → Moving through the logistics network
4. **Out for Delivery** → En route to final destination
5. **Delivered** → Successfully delivered to receiver
6. **Failed** → Delivery attempt failed

## Technical Details

### Components Structure

```
components/admin/
├── AdminDashboard.tsx       # Main container, manages state and API calls
├── ParcelList.tsx          # Table view with search/filter
├── CreateParcelForm.tsx    # Form for creating new parcels
└── UpdateStatusModal.tsx   # Modal for updating parcel status
```

### API Integration

All components use `apiService` for backend communication:

```typescript
// View all parcels
await apiService.getAllParcels();

// Create parcel
await apiService.createParcel(parcelData);

// Update status
await apiService.updateParcelStatus(trackingNumber, statusData);

// Delete parcel
await apiService.deleteParcel(trackingNumber);

// Trigger auto-update
await apiService.triggerAutoUpdate();
```

### Real-time Updates

- All data fetched from MongoDB via backend API
- Manual refresh available via "Refresh" button
- Auto-update feature progresses parcels through statuses automatically
- Updates immediately reflect in the table

## Design Features

### Styling
- **Framework**: Tailwind CSS
- **Color Scheme**:
  - Primary: Slate (grays)
  - Accent: Red (#DC2626)
  - Status badges: Color-coded per status
- **Typography**: Inter font family
- **Layout**: Responsive (desktop & mobile)

### User Experience
- **Loading States**: Spinners and disabled buttons during API calls
- **Error Handling**: Red alert boxes for errors
- **Success Messages**: Green alert boxes for successful operations
- **Confirmation Dialogs**: Confirm before destructive actions (delete)
- **Empty States**: Friendly messages when no parcels exist
- **Hover Effects**: Interactive elements respond to hover
- **Transitions**: Smooth color and scale transitions

### Responsive Design
- **Desktop**: Full table with all columns
- **Mobile**: Table scrolls horizontally
- **Touch-Friendly**: Large tap targets for mobile devices

## Usage Examples

### Creating a New Parcel

1. Click "Create Parcel" tab
2. Fill in receiver information (required)
3. Optionally add sender information
4. Enter package weight
5. Optionally add dimensions and delivery date
6. Click "Create Parcel"
7. Note the tracking number shown in success message

### Updating Parcel Status

1. Find the parcel in the table (use search if needed)
2. Click "Update" button
3. Select new status from dropdown
4. Update location if needed
5. Add notes describing the update
6. Click "Update Status"

### Searching for Parcels

- Type in search bar to filter by:
  - Tracking number (e.g., "LT230281231016")
  - Receiver name (e.g., "John Doe")
  - Receiver address (e.g., "New York")
- Use status dropdown to filter by parcel status
- Combine search and filter for precise results

### Deleting a Parcel

1. Locate the parcel in the table
2. Click "Delete" button
3. Confirm the deletion in the popup
4. Parcel is removed from database

## Best Practices

### When Creating Parcels
- Always fill in complete receiver information
- Include accurate weight for shipping calculations
- Set realistic estimated delivery dates
- Add sender info for return-to-sender capability

### When Updating Status
- Always add notes explaining the update
- Update location when status changes
- Progress through statuses in order (don't skip steps)
- Use "Failed" status sparingly and add detailed notes

### Managing Parcels
- Regularly check pending parcels
- Use auto-update feature for bulk status progression
- Delete only test parcels, never real shipments
- Keep tracking history clean and informative

## Keyboard Shortcuts

- **Search**: Click search bar or start typing
- **Tab**: Navigate through form fields
- **Enter**: Submit forms
- **Escape**: Close modals (when implemented)

## Performance Tips

- Use search/filter to narrow down large lists
- Refresh periodically to see updates from other users
- Delete old test parcels to keep database clean
- Use auto-update during off-peak hours

## Future Enhancements

Planned features:
- 🔐 Authentication and user roles
- 📊 Analytics dashboard with charts
- 📧 Email notifications
- 📄 PDF export of tracking history
- 📦 Bulk import from CSV/Excel
- 🔍 Advanced search and filters
- 📱 Mobile app version
- 🔔 Real-time WebSocket updates
- 📈 Performance metrics
- 🎨 Customizable themes

## Support

For issues or questions:
- Check `SETUP.md` for configuration help
- Review backend logs for API errors
- Ensure MongoDB is running
- Verify network connectivity to backend
