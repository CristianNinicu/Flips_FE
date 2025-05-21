import { Component } from '@angular/core';
import {ControlCounterService} from '../control-counter.service';
import {RouterLink} from '@angular/router';
import {ThemeService} from '../theme.service';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  constructor(private counterService: ControlCounterService,
              private themeService: ThemeService,) {}

  onControlClick(controlId: string) {
    this.counterService.increment(controlId);
    console.log(`Accesări ${controlId}:`, this.counterService.getCount(controlId));
  }
  onThemeChange(theme: string) {
    this.themeService.setTheme(theme);
  }
}
