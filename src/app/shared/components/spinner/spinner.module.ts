import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from '@app-shared/components/spinner/spinner.component';
import {MatSharedModule} from '@app-shared/mat-shared.module';


@NgModule({
  declarations: [SpinnerComponent],
  exports: [SpinnerComponent],
  imports: [
    CommonModule,
    MatSharedModule.forRoot()
  ]
})
/**
 * @description
 * global spinner for the project.
 *
 * @dependency
 * @see ["Material"](https://material.angular.io/).
 *
 *
 * @usageNotes
 * @example How to used :
 *
 * template: ` <app-spinner *ngIf="isDataLoading" [optionSpinner]="optionSpinner" ></app-spinner> `,
 *
 * ```typescript
 * public isDataLoading = false;
 * public optionSpinner = new OptionSpinner({
 *    fillParent: true,
 *    themePalette: 'accent',
 *    bgColor: 'rgba(0, 0, 0, 0.8)',
 *    type: SpinnerType.PROGRESS_LOADING,
 *    fontSize: '20px',
 *    statusCheck: {
 *      isFinished: false,
 *      progress: 60,
 *      statusCode: 200,
 *      statusType: 'pending',
 *      lastLogMessageHistory: '',
 *      logMessageHistory: [],
 *    }
 *  };
 * ```
 */
export class SpinnerModule {}
