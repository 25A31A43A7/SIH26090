import { User, UserRole } from '../types';
import { SEED_USERS } from '../data/seedData';
import { storageService } from './storageService';

type AuthListener = (user: User | null) => void;

class AuthService {
  private currentUser: User | null = null;
  private listeners: Set<AuthListener> = new Set();

  constructor() {
    const savedUser = storageService.getItem<User | null>('current_user', null);
    this.currentUser = savedUser;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  getUserRole(): UserRole | null {
    return this.currentUser ? this.currentUser.role : null;
  }

  loginAsPersona(role: UserRole, customPhone?: string): User {
    const user = SEED_USERS[role];
    if (!user) {
      throw new Error(`Invalid persona role: ${role}`);
    }
    this.currentUser = {
      ...user,
      phone: customPhone || user.phone
    };
    storageService.setItem('current_user', this.currentUser);
    this.notify();
    return this.currentUser;
  }

  customLogin(email: string, role: UserRole, name: string, phone: string = '+91 98765 43210'): User {
    const user: User = {
      userId: `usr_custom_${Date.now()}`,
      name: name || 'User',
      email: email,
      phone: phone || '+91 98765 43210',
      role: role,
      generalLocation: 'Hyderabad, Telangana'
    };
    this.currentUser = user;
    storageService.setItem('current_user', this.currentUser);
    this.notify();
    return user;
  }

  updatePhone(phone: string): void {
    if (this.currentUser) {
      this.currentUser.phone = phone;
      storageService.setItem('current_user', this.currentUser);
      this.notify();
    }
  }

  logout(): void {
    this.currentUser = null;
    storageService.removeItem('current_user');
    this.notify();
  }

  subscribe(listener: AuthListener): () => void {
    this.listeners.add(listener);
    listener(this.currentUser);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.currentUser));
  }
}

export const authService = new AuthService();
