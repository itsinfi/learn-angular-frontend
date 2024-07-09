import { Injectable } from '@angular/core';
import { readFileSync } from 'fs';
import { Car } from '../car-list/car';
import * as mysql from 'mysql2/promise';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  // get all cars
  readCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/cars`);
  }

  // get single car
  readCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
  }

}
