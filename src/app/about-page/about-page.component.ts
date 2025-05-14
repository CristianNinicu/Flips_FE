import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ControlCounterService} from '../control-counter.service';

@Component({
  selector: 'app-about-page',
  imports: [
    RouterLink
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {
  constructor(private counterService: ControlCounterService) {}

  onControlClick(controlId: string) {
    this.counterService.increment(controlId);
    console.log(`Accesări ${controlId}:`, this.counterService.getCount(controlId));
  }
}
