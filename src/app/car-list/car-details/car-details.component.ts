import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../car';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {

  car!: Car;

  @Input()
  carList: Car[] = AppComponent.getCarList()

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id') ?? '0';

    var _car = this.carList.at(parseInt(id))

    if (_car === undefined) {
      throw("Invalid id")
    } else {
      this.car = _car
    }
  }
}
