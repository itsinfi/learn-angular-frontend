import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../car';
import { DataBaseService } from '../../db/data-base.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {

  // subscription to car observable
  carSubscription!: Subscription

  // car object
  car!: Car;

  // error string
  error!: string;

  // Constructor
  constructor(private dataBaseService: DataBaseService, private route: ActivatedRoute) {}

  // On construct
  ngOnInit(): void {
    console.log('INIT')

    // read id from route (default to 0)
    const id = this.route.snapshot.paramMap.get('id') ?? '0';

    // get car observable with id via http request
    const _car = this.dataBaseService.readCar(id)

    // add subscription to observable and save it
    this.carSubscription = _car.subscribe({

      // handle successful read
      next: car => {
        this.car = car
      },

      //handle unsuccessful read
      error: err => {
        this.error = "No car found :C"
      },
    })
  }

  // On Deconstruction
  ngOnDestroy() {
    console.log('DESTroy')
    this.carSubscription.unsubscribe()
  }
}
