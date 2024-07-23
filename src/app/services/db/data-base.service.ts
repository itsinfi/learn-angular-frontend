import { Injectable } from '@angular/core';
import { Car } from '../../models/car';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CarsResponse } from '../../models/http/cars-response';





@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  // TODO: read from config
  private apiUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  // get all cars
  readCars(limit: number, page: number, search: string): Observable<CarsResponse> {

    return this.http.get<CarsResponse>(`${this.apiUrl}/cars`, {

      // headers to add to request
      headers: new HttpHeaders({
        limit,
        page,
        search
      }),

    })
  }

  // get single car
  readCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/${id}`);
  }

}
