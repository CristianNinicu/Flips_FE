// navbar.component.ts
import { Component } from '@angular/core';
import { ThemeService } from './theme.service';
import { Theme } from './theme.enum';
import {RouterLink} from '@angular/router';
import {ControlCounterService} from './control-counter.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav [style.background]="'var(--blue-dark)'">
      <div class="container">
        <!-- Your navbar content -->
        <div class="theme-switcher">
          <h1 class="logo">flips</h1>
          <div class="nav-links">
            <a routerLink="/home" (click)="onControlClick('Home')">Home</a>
            <a routerLink="/about" (click)="onControlClick('About')">About</a>
            <button (click)="setTheme(Theme.Default); onControlClick('Default colorscheme')" [class.active]="currentTheme === Theme.Default">
              Default
            </button>
            <button (click)="setTheme(Theme.Colorblind); onControlClick('Colorblind colorscheme')" [class.active]="currentTheme === Theme.Colorblind">
              Colorblind
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  imports: [
    RouterLink
  ],
  styles: [`
    nav {
      width: 100vw ;
      padding: 1rem 2rem;
      height: 70px;
      display: flex;
      font-family: 'Segoe UI', sans-serif;

      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      background-color: var(--blue-dark);
      color: var(--text-color);
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--yellow-accent);
      cursor: pointer;
      align-self: flex-start ;
    }

    .nav-links {
      width: 90vw;
      display: flex;
      justify-content: flex-end;
      gap: 1.5rem;
      margin-left: auto;
    margin-right: 2rem;

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
    }
  `]
})
export class NavbarComponent {
  Theme = Theme;
  currentTheme = Theme.Default;

  constructor(private themeService: ThemeService,
              private counterService: ControlCounterService) {
    this.currentTheme = this.themeService.getCurrentTheme() as Theme;
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme as Theme;
    });
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  onControlClick(controlId: string) {
    this.counterService.increment(controlId);
    console.log(`Accesări ${controlId}:`, this.counterService.getCount(controlId));
  }
}
