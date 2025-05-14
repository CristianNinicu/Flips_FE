import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControlCounterService {
  private storageKey = 'controlAccessCounts';

  constructor() {}

  private getCounts(): { [key: string]: number } {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : {};
  }

  private saveCounts(counts: { [key: string]: number }): void {
    localStorage.setItem(this.storageKey, JSON.stringify(counts));
  }

  increment(controlId: string): void {
    const counts = this.getCounts();
    counts[controlId] = (counts[controlId] || 0) + 1;
    this.saveCounts(counts);
  }

  getCount(controlId: string): number {
    return this.getCounts()[controlId] || 0;
  }

  getAllCounts(): { [key: string]: number } {
    return this.getCounts();
  }

  reset(): void {
    localStorage.removeItem(this.storageKey);
  }
}
