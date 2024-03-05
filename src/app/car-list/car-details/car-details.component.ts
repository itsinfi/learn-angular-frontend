import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../car';
import { AppComponent } from '../../app.component';
import { DataBaseService } from '../../db/data-base.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {

  car!: Car;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.readCar()
  }

  private async readCar() {
    var id = this.route.snapshot.paramMap.get('id') ?? '0';

    var _car = await DataBaseService.readCar(id)

    if (_car === undefined) {
      throw("Invalid id")
    } else {
      this.car = _car
    }
  }
}
