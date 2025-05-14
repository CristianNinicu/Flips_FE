import { Component } from '@angular/core';
import {ControlCounterService} from '../control-counter.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  constructor(private counterService: ControlCounterService) {}

  onControlClick(controlId: string) {
    this.counterService.increment(controlId);
    console.log(`Accesări ${controlId}:`, this.counterService.getCount(controlId));
  }
}
