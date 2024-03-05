import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Car } from './car';
import { AppComponent } from '../app.component';
import { DataBaseService } from '../db/data-base.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})

export class CarListComponent {
  filteredCarList: Car[] = []
  carList: Car[] = []

  ngOnInit() {
    this.readCars()
  }

  private async readCars() {
    this.carList = await DataBaseService.readCars()
    this.filteredCarList = this.carList
  }

  searchLegoCars(query: string) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
    if (!query) {
      this.filteredCarList = this.carList
      return
    }
    this.filteredCarList = this.carList.filter(c => this.searchCallback(c, query))
  }

  searchCallback(c: Car, query: string) {
    const fullCarName = c.brand.toLowerCase() + ' ' + c.name.toLowerCase()
    return fullCarName.includes(query.toLowerCase())
  }
}
