import { Component } from '@angular/core';
import { Car } from './car-list/car';
import { DataBaseService } from './db/data-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angulartest';

  private static carList: Car[] = []
}
