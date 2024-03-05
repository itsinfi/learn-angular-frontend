import { Injectable } from '@angular/core';
import { createPool, PoolConnection } from 'mysql2';
import { readFileSync } from 'fs'
import { Car } from '../car-list/car';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor() { }

  static pool = createPool(DataBaseService.getConfig())

  private static getConfig() {
    const dbConfigJSONString = readFileSync('database.config.json', 'utf-8')
    const dbConfig = JSON.parse(dbConfigJSONString)
    console.log(dbConfig)
    return dbConfig
  }

  // static connection: PoolConnection

  public static async init() {
    try {
      // DataBaseService.connection = await DataBaseService.pool.getConnection(function (e, connection) {
      //   console.error(e)
      //   // console.log('connection info:', connection)
      // })
      // DataBaseService.connection = await DataBaseService.pool.getConnection()

    } catch (e) {
      console.error(e)
    } finally {
      // DataBaseService.pool.end()
    }

  }

  public static async readCars(): Promise<Car[]> {
    try {
        const [rows, fields] = await DataBaseService.pool.query('SELECT * FROM car')
        console.log(rows)
      } catch (e) {
        console.error(e)
      }

    return []
  }
}
