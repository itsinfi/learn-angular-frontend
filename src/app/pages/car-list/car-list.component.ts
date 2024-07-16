import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { DataBaseService } from '../../services/db/data-base.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from '../../components/car-card/car-card.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
  imports: [
    CommonModule,
    CarCardComponent,
  ],

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
    const carListObservable = this.dataBaseService.readCars(10, 1)

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
