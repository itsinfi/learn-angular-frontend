import { Component } from '@angular/core';
import { Car } from './car-list/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angulartest';

  public static getCarList() {
    return this.carList
  }

  private static carList: Car[] = [{
    id: 0,
    name: "F40",
    brand: "Ferrari",
    horsepower: 478,
    isItalian: true,
    photo: "https://www.noppenstein.io/cdn/p/59632753a7d26bc058736d54c0dbe5c0.jpg",
    price: "499.00$"
  },
  {
    id: 1,
    name: "Sport Quattro S1",
    brand: "Audi",
    horsepower: 470,
    isItalian: false,
    photo: "https://cdn03.plentymarkets.com/3jhnoljv5wfx/item/images/76897/full/76897-LEGO-1985-Audi-Sport-Quattro-S1_4.jpg",
    price: "27.00$"
  },
  {
    id: 2,
    name: "Countach",
    brand: "Lamborghini",
    horsepower: 446,
    isItalian: true,
    photo: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/f1112b77-a87b-43ea-a926-2abe5a3ab1bd.__CR0,0,970,600_PT0_SX970_V1___.jpg",
    price: "1,000,000.00$",
  },
  {
    id: 3,
    name: "F40",
    brand: "Ferrari",
    horsepower: 478,
    isItalian: true,
    photo: "https://www.noppenstein.io/cdn/p/59632753a7d26bc058736d54c0dbe5c0.jpg",
    price: "499.00$"
  },
  {
    id: 4,
    name: "Sport Quattro S1",
    brand: "Audi",
    horsepower: 470,
    isItalian: false,
    photo: "https://cdn03.plentymarkets.com/3jhnoljv5wfx/item/images/76897/full/76897-LEGO-1985-Audi-Sport-Quattro-S1_4.jpg",
    price: "27.00$"
  },
  {
    id: 5,
    name: "Countach",
    brand: "Lamborghini",
    horsepower: 446,
    isItalian: true,
    photo: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/f1112b77-a87b-43ea-a926-2abe5a3ab1bd.__CR0,0,970,600_PT0_SX970_V1___.jpg",
    price: "1,000,000.00$",
  },
  {
    id: 6,
    name: "F40",
    brand: "Ferrari",
    horsepower: 478,
    isItalian: true,
    photo: "https://www.noppenstein.io/cdn/p/59632753a7d26bc058736d54c0dbe5c0.jpg",
    price: "499.00$"
  },
  {
    id: 7,
    name: "Sport Quattro S1",
    brand: "Audi",
    horsepower: 470,
    isItalian: false,
    photo: "https://cdn03.plentymarkets.com/3jhnoljv5wfx/item/images/76897/full/76897-LEGO-1985-Audi-Sport-Quattro-S1_4.jpg",
    price: "27.00$"
  },
  {
    id: 8,
    name: "Countach",
    brand: "Lamborghini",
    horsepower: 446,
    isItalian: true,
    photo: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/f1112b77-a87b-43ea-a926-2abe5a3ab1bd.__CR0,0,970,600_PT0_SX970_V1___.jpg",
    price: "1,000,000.00$",
  },
  {
    id: 9,
    name: "F40",
    brand: "Ferrari",
    horsepower: 478,
    isItalian: true,
    photo: "https://www.noppenstein.io/cdn/p/59632753a7d26bc058736d54c0dbe5c0.jpg",
    price: "499.00$"
  },
  {
    id: 10,
    name: "Sport Quattro S1",
    brand: "Audi",
    horsepower: 470,
    isItalian: false,
    photo: "https://cdn03.plentymarkets.com/3jhnoljv5wfx/item/images/76897/full/76897-LEGO-1985-Audi-Sport-Quattro-S1_4.jpg",
    price: "27.00$"
  },
  {
    id: 11,
    name: "Countach",
    brand: "Lamborghini",
    horsepower: 446,
    isItalian: true,
    photo: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/f1112b77-a87b-43ea-a926-2abe5a3ab1bd.__CR0,0,970,600_PT0_SX970_V1___.jpg",
    price: "1,000,000.00$",
  }]
}
