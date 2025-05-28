// src/app/services/font-family.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum FontFamily {
  Default = 'default',
  Dyslexic = 'dyslexic',
  Serif = 'serif',
  Monospace = 'monospace'
}

@Injectable({ providedIn: 'root' })
export class FontFamilyService {
  private renderer: Renderer2;
  private currentFont = new BehaviorSubject<string>(FontFamily.Default);
  currentFont$ = this.currentFont.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadInitialFont();
  }

  private loadInitialFont() {
    const savedFont = localStorage.getItem('appFont') || FontFamily.Default;
    this.setFont(savedFont as FontFamily);
  }

  setFont(font: FontFamily) {
    const previousFont = this.currentFont.value;

    if (previousFont !== font) {
      this.renderer.removeClass(document.body, `font-family-${previousFont}`);
    }

    this.renderer.addClass(document.body, `font-family-${font}`);
    this.currentFont.next(font);
    localStorage.setItem('appFont', font);
  }

  getCurrentFont(): string {
    return this.currentFont.value;
  }
}
