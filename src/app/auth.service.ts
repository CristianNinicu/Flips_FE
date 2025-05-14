import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user123' }
  ];

  constructor() {}

  public async login(email: string, password: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = this.mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    localStorage.setItem('token', 'mock-jwt-token');
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
