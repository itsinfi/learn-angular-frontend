import { Component, signal, WritableSignal } from '@angular/core';
import { Car } from '../../models/car';
import { DataBaseService } from '../../services/db/data-base.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CarsResponse } from '../../models/http/cars-response';
import { SearchComponent } from '../../components/search/search.component';
import { CarBrandsResponse } from '../../models/http/car-brands-response';

@Component({
  selector: 'app-car-list',
  standalone: true,
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
  imports: [
    CommonModule,
    CarCardComponent,
    PaginationComponent,
    SearchComponent
  ],

})

export class CarListComponent {
  // ongoing subscription to car list observable
  carListSubscription!: Subscription;

  // ongoing subscription to car brand observable
  carBrandSubscription!: Subscription;

  // car lists (filtered and all)
  carList: Car[] = [];
  filteredCarList: Car[] = [];

  // search & filter
  search: string = '';
  brand: string = '';

  // error string
  error: string = "No cars found.";

  // attributes needed due to pagination
  limit: number = 10;
  page: number = 1;
  total: WritableSignal<number> = signal(0);

  // car brands list
  brands: string[] = [];

  // search for lego cars by title
  onSearch: Function = (search: string, brand: string) => {
    this.removeCarSubscription();

    this.search = search;
    this.brand = brand;

    this.readCars();
  }


  // callback function to call once the page is updated
  onChangePage: Function = (newPage: number, limit: number) => {
    this.removeCarSubscription();

    this.page = newPage;
    this.limit = limit;

    this.readCars();
  }

  // Constructor
  constructor(private dataBaseService: DataBaseService) {}

  // On Construction
  ngOnInit() {
    this.readCars()
    this.readBrands()
  }

  // read cars via http request
  readCars() {

    // get observable for all cars via http request
    const carListObservable = this.dataBaseService.readCars(this.limit, this.page, this.search, this.brand)

    // subscribe to observable and save it
    this.carListSubscription = carListObservable.subscribe({
      next: (response: CarsResponse) => {

        try {

          // read response
          const { data, limit, total, page } = response ?? {};


          // write list to carList and filteredCarList to initialize
          this.carList = data;
          this.filteredCarList = data;

          // read pagination realted headers and store them
          this.limit = limit ?? 10;
          this.page = page ?? 1;
          this.total.set(total ?? 0);

        } catch (err) {
          this.error = 'Something went wrong when trying to read the available cars.'
        }
      },
      error: err => {
        this.error = err.message
      },
    })
  }


  readBrands() {

    // get car brand http observable
    const carBrandObservable = this.dataBaseService.readCarBrands();

    this.carBrandSubscription = carBrandObservable.subscribe({
      next: (carBrandsResponse: CarBrandsResponse) => {
        try {

          // read response
          const { data } = carBrandsResponse;

          this.brands = data;

        } catch (err) {
          this.error = 'Something went wrong when trying to read the available car brands.';
        }
      },
      error: err => {
        this.error = err.message;
      },
    })
  }


  // On Destruction
  ngOnDestroy() {
    this.removeCarSubscription();
    if (this.carBrandSubscription) {
      this.carBrandSubscription.unsubscribe();
      this.carBrandSubscription.remove(() => { });
    }
  }


  // make sure subscription to car observant is removed properly during runtime
  removeCarSubscription() {
    if (this.carListSubscription) {
      this.carListSubscription.unsubscribe();
      this.carListSubscription.remove(() => { });
    }
  }
}
