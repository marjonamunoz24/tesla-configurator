import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car } from '../interfaces/car.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public car = new BehaviorSubject<Car>({});

  /**
   * Update car when a property change
   * @param valor
   */
  updateCar(valor: Car): void {
    this.car.next(valor);
  }

  /**
   * Get car state
   * @returns BehaviorSubject<Car>
   */
  getCar(): BehaviorSubject<Car> {
    return this.car;
  }
}
