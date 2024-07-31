import { Injectable } from '@angular/core';
import { Car } from '../../models/car';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarsResponse } from '../../models/http/cars-response';
import { CarBrandsResponse } from '../../models/http/car-brands-response';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  // TODO: read from config
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * get paginated list of all cars
   *
   * @param limit limit per page
   * @param page page to load
   * @param search search filter to add
   * @param brand brand filter to add
   * @returns list of cars
   */
  readCars(limit: number, page: number, search: string, brand: string): Observable<CarsResponse> {

    return this.http.get<CarsResponse>(`${this.apiUrl}/cars`, {

      // headers to add to request
      headers: new HttpHeaders({
        limit,
        page,
        search,
        brand
      }),

    })
  }

  /**
   * get a single car
   *
   * @param id id of the car
   * @returns car object
   */
  readCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/details/${id}`);
  }

  /**
   * get all car brands
   *
   * @returns list of car brands
   */
  readCarBrands(): Observable<CarBrandsResponse> {
    return this.http.get<CarBrandsResponse>(`${this.apiUrl}/cars/brands`);
  }

}
