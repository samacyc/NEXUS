// Simple authentication service using localStorage
// In production, this should use JWT tokens and a real backend authentication system

interface User {
  username: string;
  role: 'admin';
}

class AuthService {
  private readonly STORAGE_KEY = 'logistic_admin_auth';

  // Default credentials (in production, this should be in backend)
  private readonly DEFAULT_CREDENTIALS = {
    username: 'admin',
    password: 'admin123', // Change this to a secure password
  };

  login(username: string, password: string): boolean {
    // In production, this should make an API call to backend
    if (
      username === this.DEFAULT_CREDENTIALS.username &&
      password === this.DEFAULT_CREDENTIALS.password
    ) {
      const user: User = {
        username,
        role: 'admin',
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    const userStr = localStorage.getItem(this.STORAGE_KEY);
    if (!userStr) return false;

    try {
      const user = JSON.parse(userStr);
      return !!user && user.role === 'admin';
    } catch {
      return false;
    }
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.STORAGE_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();
export default authService;
