import { Component } from '@angular/core';
import { Car } from './car';
import { DataBaseService } from '../db/data-base.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})

export class CarListComponent {
  // ongoing subscription to car list observable
  carListSubscription!: Subscription

  // car lists (filtered and all)
  carList: Car[] = []
  filteredCarList: Car[] = []

  // error string
  error: string = "No cars found."

  // Constructor
  constructor(private dataBaseService: DataBaseService) {}

  // On Construction
  ngOnInit() {

    // get observable for all cars via http request
    const carListObservable = this.dataBaseService.readCars(1, 1)

    // subscribe to observable and save it
    this.carListSubscription = carListObservable.subscribe({
      next: cars => {
        this.carList = cars
        this.filteredCarList = cars
      },
      error: err => {
        this.error = err.message
      },
    })


  }

  // On Destruction
  ngOnDestroy() {
    this.carListSubscription.unsubscribe()
  }

  // search for lego cars by title
  searchLegoCars(query: string) {
    if (!query) {
      this.filteredCarList = this.carList
      return
    }
    this.filteredCarList = this.carList.filter(c => this.searchCallback(c, query))
  }

  // search callback to filter cars
  searchCallback(c: Car, query: string) {
    const fullCarName = c.brand.toLowerCase() + ' ' + c.name.toLowerCase()
    return fullCarName.includes(query.toLowerCase())
  }
}
