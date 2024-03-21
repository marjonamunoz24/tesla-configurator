import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Car } from '../../interfaces/car.interface';
import { Color, Model } from '../../interfaces/model.interface';
import { DataService } from '../../services/data.service';
import { TeslaService } from '../../services/tesla.service';

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component {
  carSubscription!: Subscription;
  car: Car = {};

  models: Model[] = [];
  modelColors: Color[] = [];

  form: FormGroup = new FormGroup({});

  colorSelected: Color | undefined;
  modelSelected: Model | undefined;

  private teslaService = inject(TeslaService);
  private dataService = inject(DataService);
  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.getModels();
    this.subscribeForEvent();

    this.form = this.formBuilder.group({
      modelSelect: [
        this.car.model?.description ? this.car.model.description : '',
        Validators.required,
      ],
      colorSelect: [
        this.car.colorSelected?.description
          ? this.car.colorSelected?.description
          : this.car.model?.colors[0].description,
        Validators.required,
      ],
    });

    this.subscribeToFormChanges();
  }

  ngOnDestroy(): void {
    this.carSubscription.unsubscribe();
  }

  /**
   * Get api models
   */
  getModels(): void {
    this.teslaService.getModels().subscribe((data: Model[]) => {
      this.models = data;
    });
  }

  /**
   * Get changes in form and update Car properties
   */
  subscribeToFormChanges(): void {
    this.form.controls['modelSelect'].valueChanges.subscribe(
      (modelSelect: string) => {
        this.modelSelected = this.models.find(
          (model) => model.description === modelSelect
        );

        this.car.model = this.modelSelected;

        this.loadColors();

        this.car.config = undefined;
        this.car.configSelected = undefined;
        this.car.towHitch = false;
        this.car.yoke = false;

        this.dataService.updateCar(this.car);
      }
    );

    this.form.controls['colorSelect'].valueChanges.subscribe(
      (colorSelect: string) => {
        this.colorSelected = this.car.model?.colors.find(
          (color) => color.description === colorSelect
        );

        this.car.colorSelected = this.colorSelected;
        this.dataService.updateCar(this.car);
      }
    );
  }

  /**
   * When model select change, get the colors available
   */
  private loadColors(): void {
    this.form.controls['colorSelect'].setValue(
      this.car.model?.colors[0].description
    );
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
