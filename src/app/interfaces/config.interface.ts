export interface Config {
  configs: ConfigElement[];
  towHitch: boolean;
  yoke: boolean;
}

export interface ConfigElement {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
}
