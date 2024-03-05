import { Injectable } from '@angular/core';
import * as mysql from 'mysql2/promise'
import { readFileSync } from 'fs';
import { Car } from '../car-list/car';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor() { }

  static connection: mysql.Connection

  static async init() {
    try {
      const dbConfigJSONString = readFileSync('database.config.json', 'utf-8')
      const dbConfig = JSON.parse(dbConfigJSONString)
      console.log(dbConfig)

      DataBaseService.connection = await mysql.createConnection(dbConfig)

      this.connection.connect()
    } catch (e) {
      console.error(e)
    }
  }

  static async readCars(): Promise<Car[]> {
    try {
      const rows = await this.connection.query<mysql.RowDataPacket[]>('SELECT * FROM car;')
      console.log(rows)
      const carsList: Car[] = rows[0].map((row) => {
        return {
          id: row['id'],
          name: row['name'],
          brand: row['brand'],
          horsepower: row['horsepower'],
          isItalian: row['isItalian'],
          photo: row['photo'],
          price: row['price'],
          description: row['description']
        }
      })
      console.log(carsList)
      return carsList
    } catch (e) {
      console.error(e)
      if (e instanceof TypeError) {
        setTimeout(() => {
          location.reload()
        }, 1000);
      }
      return []
    }
  }

  static async readCar(id: string): Promise<Car> {
    try {
      const rows = await this.connection.query<mysql.RowDataPacket[]>(`SELECT * FROM car WHERE id = ${id} LIMIT 1;`)
      console.log(rows)
      const carsList: Car[] = rows[0].map((row) => {
        return {
          id: row['id'],
          name: row['name'],
          brand: row['brand'],
          horsepower: row['horsepower'],
          isItalian: row['isItalian'],
          photo: row['photo'],
          price: row['price'],
          description: row['description']
        }
      })
      console.log(carsList)
      return carsList[0]
    } catch (e) {
      console.error(e)
      if (e instanceof TypeError) {
        setTimeout(() => {
          location.reload()
        }, 1000);
      }
      throw e
    }
  }
}
