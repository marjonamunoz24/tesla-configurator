import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Car } from './interfaces/car.interface';
import { DataService } from './services/data.service';
import { TeslaService } from './services/tesla.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TeslaService],
  templateUrl: 'app.component.html',
})
export class AppComponent {
  name = 'Angular';

  carSubscription!: Subscription;
  car: Car = {};

  // Services
  private router = inject(Router);
  private dataService = inject(DataService);

  ngOnInit(): void {
    this.router.navigate(['/step1']);
    this.subscribeForEvent();
  }

  ngOnDestroy(): void {
    this.carSubscription.unsubscribe();
  }

  /**
   * On click navigation button, navigate to this page
   * @param path
   */
  navigation(path: string): void {
    this.router.navigate([`${path}`]);
  }

  /**
   * Subscribe for event for Car changes
   */
  private subscribeForEvent(): void {
    this.carSubscription = this.dataService.getCar().subscribe((data) => {
      this.car = data;
    });
  }
}
