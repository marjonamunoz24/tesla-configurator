import { Config, ConfigElement } from './config.interface';
import { Color, Model } from './model.interface';

export interface Car {
  model?: Model;
  colorSelected?: Color;
  config?: Config;
  configSelected?: ConfigElement;
  towHitch?: boolean;
  yoke?: boolean;
}
