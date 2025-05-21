import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar.component';

@Component({
  selector: 'app-layout',
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  styles: [`
    main {
      padding: 20px;
      background-color: var(--bg-color);
      min-height: 100vh;
    }
  `]
})
export class LayoutComponent {}
