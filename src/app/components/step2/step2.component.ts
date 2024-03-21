import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Car } from '../../interfaces/car.interface';
import { ConfigElement } from '../../interfaces/config.interface';
import { DataService } from '../../services/data.service';
import { TeslaService } from '../../services/tesla.service';

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component {
  @ViewChild('configSelect')
  configSelect!: ElementRef<HTMLSelectElement>;

  carSubscription!: Subscription;
  car: Car = {};

  listConfigs: string[] = [];
  configSelected: ConfigElement | undefined;
  towHitch: boolean = false;
  yoke: boolean = false;

  // Services
  teslaService = inject(TeslaService);
  dataService = inject(DataService);

  ngOnInit(): void {
    this.subscribeForEvents();
    this.getConfigs();

    if (this.car.towHitch) {
      this.towHitch = this.car.towHitch;
    }

    if (this.car.yoke) {
      this.yoke = this.car.yoke;
    }
  }

  ngOnDestroy(): void {
    this.carSubscription.unsubscribe();
  }

  /**
   * Get config from api by car model
   */
  getConfigs(): void {
    if (this.car.model) {
      this.teslaService
        .getConfigsAndOptions(this.car.model.code)
        .subscribe((data) => {
          this.car.config = data;
          this.dataService.updateCar(this.car);
        });
    }
  }

  /**
   * Update car when select config change
   */
  getConfigValue(): void {
    this.configSelected = this.car.config?.configs.find(
      (config) => config.description === this.configSelect.nativeElement.value
    );
    this.car.configSelected = this.configSelected;
    this.dataService.updateCar(this.car);
  }

  /**
   * Update car when checkbox towhitch change
   */
  getTowHitchValue(): void {
    this.towHitch = !this.towHitch;
    this.car.towHitch = this.towHitch;
    this.dataService.updateCar(this.car);
  }

  /**
   * Update car when checkbox yoke change
   */
  getYokeValue(): void {
    this.yoke = !this.yoke;
    this.car.yoke = this.yoke;
    this.dataService.updateCar(this.car);
  }

  /**
   * Subscribe for event for Car changes
   */
  private subscribeForEvents(): void {
    this.carSubscription = this.dataService.getCar().subscribe((data) => {
      this.car = data;
    });
  }
}
