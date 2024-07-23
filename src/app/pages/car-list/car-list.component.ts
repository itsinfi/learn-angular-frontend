import { Component } from '@angular/core';
import { Car } from '../../models/car';
import { DataBaseService } from '../../services/db/data-base.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CarsResponse } from '../../models/http/cars-response';

@Component({
  selector: 'app-car-list',
  standalone: true,
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
  imports: [
    CommonModule,
    CarCardComponent,
    PaginationComponent,
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

  // attributes needed due to pagination
  limit: number = 10
  page: number = 1
  total: number = 0

  // callback function to call once the page is executed
  onChangePage: Function = (newPage: number, limit: number) => {
    console.log('execute onChangePage()')
    if (this.carListSubscription) {
      this.carListSubscription.unsubscribe()
      this.carListSubscription.remove(() => {})
    }

    this.page = newPage
    this.limit = limit

    this.readCars()
  }

  // Constructor
  constructor(private dataBaseService: DataBaseService) {}

  // On Construction
  ngOnInit() {
    this.readCars()
  }

  // read cars via http request
  readCars() {

    // get observable for all cars via http request
    const carListObservable = this.dataBaseService.readCars(this.limit, this.page)

    // subscribe to observable and save it
    this.carListSubscription = carListObservable.subscribe({
      next: (response: CarsResponse) => {

        try {

          const { data, limit, total, page } = response ?? {};


          // write list to carList and filteredCarList to initialize
          this.carList = data;
          this.filteredCarList = data;

          // read pagination realted headers and store them
          this.limit = limit ?? 10;
          this.page = page ?? 1;
          this.total = total ?? 0;

        } catch (err) {
          this.error = 'Something went wrong when trying to read the available cars.'
        }
      },
      error: err => {
        this.error = err.message
      },
    })
  }


  // On Destruction
  ngOnDestroy() {
    if (this.carListSubscription) {
      this.carListSubscription.unsubscribe()
    }
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
