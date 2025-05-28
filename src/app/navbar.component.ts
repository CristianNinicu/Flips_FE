// src/app/navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from './theme.service';
import { FontFamilyService, FontFamily } from './font-family.service';
import { ControlCounterService } from './control-counter.service';
import { Theme } from './theme.enum';

@Component({
  selector: 'app-navbar',
  template: `
    <nav [style.background]="'var(--blue-dark)'">
      <div class="container">
        <div class="theme-switcher">
          <h1 class="logo">flips</h1>
          <div class="nav-links">
            <a routerLink="/home" (click)="onControlClick('Home')">Home</a>
            <a routerLink="/about" (click)="onControlClick('About')">About</a>

            <!-- Theme Buttons -->
            <div class="control-group">
              <span class="control-label">Theme:</span>
              <button (click)="setTheme(Theme.Default); onControlClick('Default colorscheme')"
                      [class.active]="currentTheme === Theme.Default">
                Default
              </button>
              <button (click)="setTheme(Theme.Colorblind); onControlClick('Colorblind colorscheme')"
                      [class.active]="currentTheme === Theme.Colorblind">
                Colorblind
              </button>
            </div>

            <!-- Font Family Buttons -->
            <div class="control-group">
              <span class="control-label">Font:</span>
              <button (click)="setFont(FontFamily.Default); onControlClick('Default font')"
                      [class.active]="currentFont === FontFamily.Default"
                      aria-label="Default Font">
                Default
              </button>
              <button (click)="setFont(FontFamily.Dyslexic); onControlClick('Dyslexic font')"
                      [class.active]="currentFont === FontFamily.Dyslexic"
                      aria-label="Dyslexic-friendly Font">
                Dyslexic
              </button>
              <button (click)="setFont(FontFamily.Serif); onControlClick('Serif font')"
                      [class.active]="currentFont === FontFamily.Serif"
                      aria-label="Serif Font">
                Serif
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  standalone: true,
  providers: [
    ThemeService,
    FontFamilyService,
    ControlCounterService
  ],
  imports: [
    RouterLink,
  ],
  styles: [`
    nav {
      width: 100vw;
      padding: 1rem 2rem;
      height: 70px;
      display: flex;
      font-family: var(--primary-font);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      background-color: var(--blue-dark);
      color: var(--text-color);
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--yellow-accent);
      cursor: pointer;
      align-self: flex-start;
    }

    .nav-links {
      width: 90vw;
      display: flex;
      justify-content: flex-end;
      gap: 1.5rem;
      margin-left: auto;
      margin-right: 2rem;
      align-items: center;

      a {
        text-decoration: none;
        color: var(--text-color);
        font-weight: 500;
        transition: color 0.3s ease;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        align-content: center;

        &:hover {
          color: var(--yellow-hover);
          background-color: var(--blue-medium);
        }
      }
    }

    .theme-switcher {
      display: flex;
      gap: 0.5rem;
      justify-content: space-between;
      width: 100%;
    }

    .control-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .control-label {
      color: var(--text-color);
      font-size: 0.9rem;
    }

    button {
      padding: 0.1rem 1rem;
      background: var(--blue-medium);
      color: var(--text-color);
      border: 2px solid var(--yellow-accent);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;

      &.active {
        background: var(--yellow-accent);
        color: var(--blue-dark);
        border-color: var(--yellow-accent);
      }

      &:hover {
        background: var(--yellow-hover);
        border-color: var(--yellow-hover);
        color: var(--blue-dark);
      }
    }
  `]
})
export class NavbarComponent {
  Theme = Theme;
  FontFamily = FontFamily;
  currentTheme = Theme.Default;
  currentFont = FontFamily.Default;

  constructor(
    private themeService: ThemeService,
    private fontFamilyService: FontFamilyService,
    private counterService: ControlCounterService
  ) {
    this.currentTheme = this.themeService.getCurrentTheme() as Theme;
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme as Theme;
    });

    this.currentFont = this.fontFamilyService.getCurrentFont() as FontFamily;
    this.fontFamilyService.currentFont$.subscribe(font => {
      this.currentFont = font as FontFamily;
    });
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  setFont(font: FontFamily) {
    this.fontFamilyService.setFont(font);
  }

  onControlClick(controlId: string) {
    this.counterService.increment(controlId);
    console.log(`Accesări ${controlId}:`, this.counterService.getCount(controlId));
  }
}
