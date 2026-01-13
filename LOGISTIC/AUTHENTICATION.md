# Authentication System Documentation

## Overview

The admin backoffice is now protected with an authentication system. Users must log in with valid credentials before accessing the parcel management dashboard.

## Features

### 🔐 Login System
- Clean, modern login page with gradient background
- Form validation
- Error handling with user-friendly messages
- Loading states during authentication
- Demo credentials displayed for easy access

### 🛡️ Protected Routes
- Admin dashboard only accessible after authentication
- Automatic redirect to login if not authenticated
- Session persistence using localStorage

### 👤 User Session
- Displays logged-in username in header
- Logout button in dashboard
- Session maintained across page refreshes

## Access Credentials

### Default Admin Account

**Username:** `admin`
**Password:** `admin123`

> ⚠️ **Security Note**: In production, change these credentials and implement a proper backend authentication system with encrypted passwords!

## How to Access

1. Navigate to the admin page: http://localhost:3000/admin.html
2. You'll see the login page (if not already logged in)
3. Enter the credentials above
4. Click "Sign In"
5. You'll be redirected to the admin dashboard

## Authentication Flow

```
User visits /admin.html
    ↓
Is user authenticated?
    ↓ No
Login Page displayed
    ↓
User enters credentials
    ↓
Credentials validated
    ↓ Valid
Session stored in localStorage
    ↓
Admin Dashboard displayed
```

## Session Management

### Login
```typescript
// When user logs in successfully
authService.login(username, password);
// Returns: true (success) or false (failure)
```

### Logout
```typescript
// When user clicks logout
authService.logout();
// Clears session and redirects to login
```

### Check Authentication
```typescript
// Check if user is currently authenticated
authService.isAuthenticated();
// Returns: true or false
```

### Get Current User
```typescript
// Get currently logged-in user info
authService.getCurrentUser();
// Returns: { username: string, role: 'admin' } or null
```

## Security Features

### Current Implementation (Development)
- ✅ Login required for admin access
- ✅ Session management with localStorage
- ✅ Logout functionality
- ✅ Protected dashboard routes
- ✅ User info display

### Recommended for Production
- 🔒 Backend authentication API
- 🔒 JWT tokens or session cookies
- 🔒 Password hashing (bcrypt)
- 🔒 HTTPS only
- 🔒 Rate limiting on login attempts
- 🔒 Password complexity requirements
- 🔒 Multi-factor authentication (MFA)
- 🔒 Session timeout
- 🔒 Secure password reset flow
- 🔒 Audit logging

## Files Structure

```
LOGISTIC/
├── services/
│   └── authService.ts              # Authentication service
├── components/admin/
│   ├── LoginPage.tsx               # Login page UI
│   └── AdminDashboard.tsx          # Protected dashboard (updated)
└── admin.tsx                       # Admin app entry point
```

## Authentication Service API

### `authService.login(username, password)`
Validates credentials and creates a session.

**Parameters:**
- `username` (string): User's username
- `password` (string): User's password

**Returns:**
- `boolean`: true if login successful, false otherwise

**Example:**
```typescript
const success = authService.login('admin', 'admin123');
if (success) {
  console.log('Logged in successfully');
}
```

### `authService.logout()`
Clears the current session.

**Example:**
```typescript
authService.logout();
// User is now logged out
```

### `authService.isAuthenticated()`
Checks if user has a valid session.

**Returns:**
- `boolean`: true if authenticated, false otherwise

**Example:**
```typescript
if (authService.isAuthenticated()) {
  // Show admin content
} else {
  // Show login page
}
```

### `authService.getCurrentUser()`
Gets the current logged-in user's information.

**Returns:**
- `User | null`: User object or null if not authenticated

**Example:**
```typescript
const user = authService.getCurrentUser();
if (user) {
  console.log(`Welcome, ${user.username}!`);
}
```

## Login Page Design

### Visual Features
- **Gradient Background**: Dark slate with red accents
- **Animated Decorations**: Subtle glowing orbs
- **Logo**: Package icon in red circle
- **Responsive**: Works on mobile and desktop
- **Smooth Animations**: Fade-in effects for errors
- **Loading States**: Spinner during authentication

### Form Features
- **Validation**: Required fields
- **Error Display**: Clear error messages
- **Autocomplete**: Browser autofill support
- **Demo Info**: Credentials displayed for testing
- **Back Link**: Easy navigation to main website

## Customization

### Change Default Credentials

Edit `services/authService.ts`:

```typescript
private readonly DEFAULT_CREDENTIALS = {
  username: 'your_username',
  password: 'your_secure_password',
};
```

### Add Multiple Users

Update the `login` method in `authService.ts`:

```typescript
private readonly USERS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'manager', password: 'manager123', role: 'manager' },
];

login(username: string, password: string): boolean {
  const user = this.USERS.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return true;
  }

  return false;
}
```

### Implement Backend Authentication

For production, integrate with your backend API:

```typescript
async login(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      // Store JWT token
      localStorage.setItem('auth_token', data.token);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}
```

## Troubleshooting

### Can't Access Admin Dashboard
1. Clear localStorage: Open browser console and run `localStorage.clear()`
2. Try logging in again
3. Check browser console for errors

### Login Not Working
1. Verify you're using correct credentials:
   - Username: `admin`
   - Password: `admin123`
2. Check for typos (case-sensitive)
3. Clear browser cache and reload

### Session Expired
- Click "Logout" and log in again
- Session is stored in localStorage and persists until manually cleared

### Forgot Password
Currently, there's no password reset flow. Use the default credentials above.

## Best Practices

### For Development
- Use the demo credentials provided
- Test logout functionality regularly
- Clear sessions when testing different users

### For Production
1. **Never** store passwords in plain text
2. Implement proper backend authentication
3. Use HTTPS exclusively
4. Enable CORS properly
5. Add rate limiting
6. Implement password policies
7. Add audit logging
8. Consider MFA
9. Regular security audits
10. Keep dependencies updated

## Future Enhancements

Planned features:
- 🔄 Backend authentication API integration
- 🔑 Password reset functionality
- 👥 User management (create/edit/delete users)
- 🎭 Role-based access control (admin, manager, viewer)
- 📊 Audit log (who did what, when)
- ⏰ Session timeout (auto-logout after inactivity)
- 🔐 Two-factor authentication (2FA)
- 📧 Email verification
- 🚫 Account lockout after failed attempts
- 📱 Remember me functionality
- 🌐 OAuth integration (Google, GitHub, etc.)

## Support

For issues related to authentication:
- Check this documentation first
- Clear browser localStorage and cookies
- Check browser console for error messages
- Ensure both frontend and backend servers are running
