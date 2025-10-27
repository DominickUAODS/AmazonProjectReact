declare module "bootstrap-slider" {
    export interface SliderOptions {
      min?: number;
      max?: number;
      step?: number;
      value?: number | [number, number];
      tooltip?: "show" | "hide" | "always";
      range?: boolean;
    }
  
    export default class Slider {
      constructor(element: HTMLElement | string, options?: SliderOptions);
      on(event: "slide", callback: (value: number | [number, number]) => void): void;
      destroy(): void;
    }
}
  