import { Component } from '@angular/core';
import {ControlCounterService} from '../control-counter.service';

@Component({
  selector: 'app-about-page',
  imports: [

  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {
  constructor(private counterService: ControlCounterService) {}
}
