import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from '../../interfaces/car.interface';
import { DataService } from '../../services/data.service';
import { TeslaService } from '../../services/tesla.service';

@Component({
  selector: 'app-step3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  carSubscription!: Subscription;
  car: Car = {};
  totalCost: number = 0;

  // Services
  teslaService = inject(TeslaService);
  dataService = inject(DataService);

  ngOnInit(): void {
    this.subscribeForEvents();
    this.getTotalCost();
  }

  ngOnDestroy(): void {
    this.carSubscription.unsubscribe();
  }

  /**
   * Update total cost of the Car
   */
  getTotalCost(): void {
    if (this.car.configSelected && this.car.colorSelected) {
      this.totalCost =
        this.car.configSelected.price + this.car.colorSelected.price;
    }

    if (this.car.towHitch) {
      this.totalCost = this.totalCost + 1000;
    }
    if (this.car.yoke) {
      this.totalCost = this.totalCost + 1000;
    }
  }

  private subscribeForEvents(): void {
    this.carSubscription = this.dataService.getCar().subscribe((data) => {
      this.car = data;
    });
  }
}
