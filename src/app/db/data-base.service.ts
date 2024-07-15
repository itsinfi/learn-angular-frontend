import { Injectable } from '@angular/core';
import { Car } from '../car-list/car';
import * as mysql from 'mysql2/promise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  // get all cars
  readCars(limit: number, page: number): Observable<Car[]> {

    const headers = new HttpHeaders({
      'limit': limit,
      'page': page
    })

    return this.http.get<Car[]>(`${this.apiUrl}/cars`, { headers: headers });
  }

  // get single car
  readCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
  }

}
