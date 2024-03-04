import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Car } from './car';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})

export class CarListComponent {
  // @Input() fullCarList: Car[] = []

  filteredCarList: Car[] = []

  ngOnInit() {
    this.filteredCarList = AppComponent.getCarList()
  }

  searchLegoCars(query: string) {
    if (!query) {
      this.filteredCarList = AppComponent.getCarList()
      return
    }
    this.filteredCarList = AppComponent.getCarList().filter(c => this.searchCallback(c, query))
  }

  searchCallback(c: Car, query: string) {
    const fullCarName = c.brand.toLowerCase() + ' ' + c.name.toLowerCase()
    return fullCarName.includes(query.toLowerCase())
  }
}
