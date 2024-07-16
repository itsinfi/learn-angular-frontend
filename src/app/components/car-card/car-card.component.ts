import { Component, Input } from '@angular/core';
import { Car } from '../../models/car';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
  imports: [
    RouterLink
  ]
})


export class CarCardComponent {

  @Input() car: Car;

}
