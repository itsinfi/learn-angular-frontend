import { Car } from "../car";

export interface CarsResponse {
  data: Car[],
  total: number,
  limit: number,
  page: number,
}
