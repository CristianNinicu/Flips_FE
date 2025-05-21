import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme = new BehaviorSubject<string>('default');
  currentTheme$ = this.currentTheme.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadInitialTheme();
  }

  private loadInitialTheme() {
    const savedTheme = localStorage.getItem('appTheme') || 'default';
    this.setTheme(savedTheme);
  }

  setTheme(theme: string) {
    const previousTheme = this.currentTheme.value;

    if (previousTheme !== theme) {
      this.renderer.removeClass(document.body, `${previousTheme}-theme`);
    }

    this.renderer.addClass(document.body, `${theme}-theme`);
    this.currentTheme.next(theme);
    localStorage.setItem('appTheme', theme);
  }

  getCurrentTheme() {
    return this.currentTheme.value;
  }
}
