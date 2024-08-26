import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../models/car';
import { DataBaseService } from '../../services/db/data-base.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {

  // subscription to car & flag observable
  carSubscription!: Subscription
  flagSubscription!: Subscription

  // car object
  car!: Car;

  // flag
  flag!: string;

  // error string
  error!: string;

  // Constructor
  constructor(private dataBaseService: DataBaseService, private route: ActivatedRoute) {}

  // On construct
  ngOnInit(): void {

    // read id from route (default to 0)
    const id = this.route.snapshot.paramMap.get('id') ?? '0';

    // get car observable with id via http request
    const _car = this.dataBaseService.readCar(id)

    // add subscription to observable and save it
    this.carSubscription = _car.subscribe({

      // handle successful read
      next: car => {
        this.car = car

        // read flag with origin of car
        const _flag = this.dataBaseService.readFlag(car.origin);
        this.flagSubscription = _flag.subscribe({
          next: flag => {
            this.flag = flag.data;
          },

          error: err => {
            this.flag = '';
          }

        })
      },

      //handle unsuccessful read
      error: err => {
        this.error = "No car found :C"
      },
    })
  }

  // On Deconstruction
  ngOnDestroy() {
    if (this.carSubscription) {
      this.carSubscription.unsubscribe()
    }
  }
}
