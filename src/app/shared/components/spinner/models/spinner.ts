import {SpinnerType} from './spinner-type';
import {StatusProgress} from './status-progress';
import {ThemePalette} from '@angular/material/core/common-behaviors/color';

interface Spinner<T = SpinnerType> {
  loadingInside: boolean;
  themePalette: ThemePalette;
  bgColor?: string;
  type: T;
}

interface SpinnerBase extends Spinner<SpinnerType.BASE> {}

interface SpinnerWithProgress extends Spinner<SpinnerType.PROGRESS_LOADING> {
  statusCheck: StatusProgress;
  fontSize: string;
}

export type OptionSpinnerType = SpinnerBase | SpinnerWithProgress;

/**
 * Option show spinner
 * @param {boolean} loadingInside - Show loading inside
 * @param {ThemePalette} themePalette - Material-Theme color palette for the component.
 * @param {string} bgColor - color
 * @param {SpinnerType} type - Simple or Optional
 * @param {StatusProgress} statusCheck - Optional
 * @param {string} fontSize - size
 */
export class OptionSpinner {
  public loadingInside = true;
  public themePalette: ThemePalette = 'accent';
  public bgColor = 'rgb(0 0 0 / 50%)';
  public type: SpinnerType = SpinnerType.BASE;
  public statusCheck: StatusProgress | undefined;
  public fontSize: string | undefined;

  constructor(init?: OptionSpinnerType) {
    if (init) {
      Object.assign(this, init);
    }
  }

}
